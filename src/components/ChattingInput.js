import React, { useState, useCallback, memo } from "react";
import styled from "styled-components";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { getCookie } from "../shared/Cookie";

//프롭스가 안바뀌면 렌더링이 안됨(프롭스 메모)
const ChattingInput = memo(({ icrId, socket, email }) => {
  //토큰과 이메일은 각 쿠키, 로컬스토리지에서 가져옴
  const token = getCookie("user_login");

  //채팅에 입력한 내 메세지를 state로 저장
  const [message, setMessage] = useState("");
  //채팅 input에 걸어놓은 onChange 함수
  const onChangeMessage = useCallback((e) => setMessage(e.target.value), []);

  //서버로 메세지 보낼때
  const submitMessage = useCallback(
    (message) => {
      if (!message) {
        window.alert("메세지를 입력해주세요!");
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
    </div>
  );
});

const SendInput = styled.input`
  width: 565px;
  height: 65px;
  flex-grow: 0;

  border: solid 2px #6fcea1;
  background-color: #ffffff;
  ::placeholder {
    padding: 0px 20px;
    font-size: 18px;
  }

  position: relative;
`;

export default ChattingInput;
