import React, { useCallback, memo } from "react";
import styled from "styled-components";
import { getCookie } from "../shared/Cookie";
import useInput from "../hooks/useInput";
import Swal from "sweetalert2";

//프롭스가 안바뀌면 렌더링이 안됨(프롭스 메모)
const ChattingInput = memo(({ icrId, socket, email }) => {
  //토큰 쿠키에서 가져옴
  const token = getCookie("user_login");

  //채팅에 입력한 내 메세지를 state로 저장
  const [message, onChangeMessage, setMessage] = useInput("");

  //서버로 메세지 보낼때
  const submitMessage = useCallback(
    (message) => {
      if (!message) {
        Swal.fire({
          title: "메세지를 입력해주세요!",
          confirmButtonColor: "#d6d6d6",
          confirmButtonText: "확인",
        });
        return;
      } else {
        socket.emit(
          "authenticate",
          {
            token: token,
          },
          (data) => {
            if (data["msg"] === "success") {
              let send_data = {
                email: email,
                icrId: icrId,
                chatMsg: message,
              };
              socket.emit("sendMsg", send_data);
              setMessage("");
            }
          }
        );
      }
    },
    [message]
  );

  return (
    <div>
      <SendInput
        type="text"
        placeholder="텍스트를 입력하세요."
        value={message}
        onChange={onChangeMessage}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submitMessage(message);
          }
        }}
      ></SendInput>
      <SendBtn>전송</SendBtn>
    </div>
  );
});

const SendInput = styled.input`
  width: 565px;
  height: 65px;
  flex-grow: 0;
  border-radius: 10px;
  border: solid 5px #3fbe81;
  border-top: solid 1px #3fbe81;
  border-radius: 0px 0px 30px 30px; 
  background-color: #ffffff;
  ::placeholder {
    padding: 0px 20px;
    font-size: 18px;
  }

  position: relative;

  @media (max-width: 767px) {
    position: absolute;

    width: 280px;
    top: 470px;
    left: -15px;

    ::placeholder {
      padding: 0px 20px;
      font-size: 16px;
    }
  }
`;

const SendBtn=styled.button`
width: 100px;
height: 38px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 21px;
margin: 0 0 0 128px;
padding: 7px 14px 6px;
border-radius: 4px;
border: solid 1px #c4c4c4;
background-color: #c4c4c4;
color: #ffffff;
font-size: 16px;
font-weight: 500;
cursor:pointer;

position:relative;
bottom: 53px;
left:318px;

:hover{
  background:#6fcea1;
}

@media (max-width: 767px) {
  position:relative;
  top: 488px;
  left:45px;
  width: 70px;
  height: 28px;

  font-size: 14px;

}
`;

export default ChattingInput;
