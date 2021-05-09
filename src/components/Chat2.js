import React, { useState, useEffect } from "react";
import { getCookie } from "../shared/Cookie";
import styled from "styled-components";
// import io from "socket.io-client";
import { useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";

const Chat = (props) => {
  const { history } = props;
  //쿠키에 저장된 토큰 조회
  const cookie = getCookie("is_login") ? true : false;
  // 토큰이 없을 경우 사용을 못하게 로그인 화면으로 이동시키기
  if (!cookie) {
    window.alert("로그인 먼저 해주세요!");
    // 로그인창으로 이동
    history.replace("/login");
  }

  const username = getCookie("nickname");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   // 웹소켓 연결
  //   chatActions.socket.connect();
  //   return () => {
  //     // 채팅 페이지 나가면 웹소켓 연결 해제
  //     chatActions.socket.disconnect();
  //   };

  // }, []);

  //////////////////////////////////////////////////////////
  // const socket = new Websocket("소켓api");
  // // const socket = io("http:localhost/3000/chat");

  // useEffect(() => {
  //   //연결 되었는지 확인
  //   socket.onopen = () => {
  //     console.log("connected");
  //   };
  // }, []);

  // //서버로 보낼때 send를 쓴다
  // const sendMessage = () => {
  //   socket.send(
  //     JSON.stringify({
  //       message: "서버한테 보낼 메세지",
  //     })
  //   );
  // };

  // //서버에서 받을때 onmessage를 쓴다
  // socket.onmessage = (message) => {
  //   let data = JSON.parse(message.data);
  //   console.log(data);
  // };

  // //서버랑 연결 종료할때
  // socket.onclose = (e) => {
  //   if (e.wasClean) {
  //     console.log("커넥션 종료");
  //   } else {
  //     console.log("커넥션 에러");
  //   }
  // };

  // //메세지 보낼때 함수, emit에 왜 빨간줄 why..
  // const submitMessage = (msgContents) => {
  //   if (!msgContents) {
  //     window.alert("메세지를 입력해주세요!");
  //     return;
  //   } else {
  //     let data = {
  //       sender: username,
  //       // room: activeRoom,
  //       message: msgContents,
  //     };
  //     socket.send("chatToServer", data);
  //     setMessage("");
  //   }
  // };

  return (
    <>
      <Container></Container>
      <InputArea>
        <Input
          type="text"
          placeholder="대화입력"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // submitMessage(e.target.value);
            }
          }}
        />
        <button>보내기</button>
        {/* <button onClick={sendMessage}>보내기</button> */}
      </InputArea>
    </>
  );
};

const Container = styled.div`
  width: 600px;
  height: 600px;
  margin: 10% auto;
  background: #eee;
  border: 1px solid #212121;
`;

const Input = styled.input`
  width: 500px;
  height: 2.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  border-radius: 7px;
  margin: 0.6rem;
`;

const InputArea = styled.div`
  width: 600px;
  margin: -110px auto;
`;

export default Chat;
