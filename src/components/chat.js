import React, { useState, useEffect } from "react";
import { getCookie } from "../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import io from "socket.io-client";
import { actionCreators as chatActions } from "../redux/modules/chat";
import Talk from "./Talk";
import { SettingsInputComponent } from "@material-ui/icons";


const Chat = (props) => {
  const dispatch = useDispatch();
  const ChatList = useSelector((state) => state.chat.chat_list);
  console.log(ChatList);
  const _nickname = getCookie("nickname");
  const [message, setMessage] = useState("");
  

  const socket = io.connect('http://15.165.76.76:3001/chatting',{ transports: ["websocket"] });
  
  console.log(socket);

  useEffect(() => {
    //연결 되었는지 확인
    socket.onopen = () => {
      console.log("connected");
    };

    // var data = { email: 'test@naver.com', icrId: 'test' }; socket.emit('showUserList', data);
    // socket.emit("showUserList",data);
  }, []);


  //서버에서 받을때 on을 쓴다
  socket.on("chatToClient", function (msg) {
    dispatch(chatActions.addChatList());
    window.scrollTo(0, document.body.scrollHeight);
    // 새로운 채팅 추가시 자동으로 스크롤 다운. // scrollTop = 현재 스크롤값  scrollHeight = 변한 값
    // chatLog.scrollTop = chatLog.scrollHeight;
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
        sender: _nickname,
        // room: activeRoom,
        message: msgContents,
      };
      socket.emit("chatToServer", data);
      setMessage("");
    }
  };

  const msgTestPush = () => {
    ChatList.push({ username: nic, chat: message });
    console.log(ChatList);
    setMessage("");
  };

  return (
    <>
      <Container>
        {ChatList?.map((c, idx) => (
          <Talk key={idx} nickname={c.username} msg={c.chat} />
        ))}
      </Container>
      <InputArea>
        <NicInput
          type="text"
          value={nic}
          onChange={(e) => {
            setNic(e.target.value);
          }}
        />
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
        {/* <button onClick={submitMessage}>보내기</button> */}
        <button onClick={msgTestPush}>전송</button>
      </InputArea>
    </>
  );
};

const Container = styled.div`
  width: 600px;
  height: 600px;
  margin: 200px auto;
  background: #eee;
  border: 1px solid #212121;
`;

const Input = styled.input`
  width: 400px;
  height: 2.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  border-radius: 7px;
  margin: 0.6rem;
`;

const NicInput = styled(Input)`
  width: 80px;
  padding: 10px 18px;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  width: 620px;
  margin: -140px auto 100px;
  button {
    width: 60px;
    height: 35px;
    border: none;
    border-radius: 16px;
  }
`;

export default Chat;
