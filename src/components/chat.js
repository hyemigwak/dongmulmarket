import React, { useState, useEffect } from "react";
import { getCookie } from "../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import io from "socket.io-client";
import { actionCreators as chatActions } from "../redux/modules/chat";

const Chat = (props) => {
  const dispatch = useDispatch();
  const ChatList = useSelector((state) => state.chat.chat_list);
  console.log(ChatList);
  const username = getCookie("nickname");
  const [message, setMessage] = useState("");

  const socket = io("");

  useEffect(() => {
    //연결 되었는지 확인
    socket.onopen = () => {
      console.log("connected");
    };
  }, []);

  //서버에서 받을때 on을 쓴다
  socket.on("chatToClient", function (msg) {
    console.log(msg);
    const chatmsg = msg["message"];
    setMessage(chatmsg);
    dispatch(chatActions.addChatList());
    window.scrollTo(0, document.body.scrollHeight);
  });

  //서버랑 연결 종료할때???
  socket.onclose = (e) => {
    if (e.wasClean) {
      console.log("커넥션 종료");
    } else {
      console.log("커넥션 에러");
    }
  };

  //메세지 보낼때 함수, emit에 왜 빨간줄?

  const submitMessage = (msgContents) => {
    if (!msgContents) {
      window.alert("메세지를 입력해주세요!");
      return;
    } else {
      let data = {
        sender: username,
        // room: activeRoom,
        message: msgContents,
      };
      socket.emit("chatToServer", data);
      setMessage("");
    }
  };

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
              submitMessage(e.target.value);
            }
          }}
        />
        <button onClick={submitMessage}>보내기</button>
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
