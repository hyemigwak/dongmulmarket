import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as postActions } from "../redux/modules/post";
import { GroupChat, LoginChat, ChatUsers, ChattingInput } from "./index";
import useJoinChat from "../hooks/useJoinChat";
import useSocket from "../hooks/useSocket";
import Swal from "sweetalert2";
import { config } from "../shared/config";

const Chatting = memo(({ icrId, history }) => {
  // 채팅에 스크롤 넣어줌
  const scroll = useRef(null);
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.chat.chat_list);
  const { email } = useSelector((state) => state.user.user);

  const { chatJoinYn, handler } = useJoinChat(icrId); //참여 유무를 통해 버튼 결정

  const [socket, disconnectSocket] = useSocket(`${config.api}:3001/chatting`, email, icrId);

  useEffect(() => {
    return () => {
      // console.info("disconnect socket", icrId);
      dispatch(chatActions.clearOne());
      dispatch(postActions.clearPost());
      disconnectSocket();
    };
  }, [disconnectSocket, icrId]);

  useEffect(() => {
    dispatch(chatActions.getAllChatList(socket));
  }, [socket]);

  useEffect(() => {
    if (!chatJoinYn) {
      dispatch(chatActions.addChatList(socket));
      dispatch(chatActions.addUserList(socket, { email, icrId }));
    }
  }, [chatJoinYn]);

  useEffect(() => {
    socket.on("kickUser", (data) => {
      dispatch(chatActions.removeUser(data.email));
      dispatch(chatActions.addChat(data));
      //socket.off("kickUser");
      if (data.email === email) {
        history.push("/");
        Swal.fire({
          title: "강퇴 당하셨습니다!",
          confirmButtonColor: "#3fbe81",
          confirmButtonText: "확인",
        });
      }
    });
  }, []);

  useEffect(() => {
    socket.on("exchange", (data) => {
      if (data["msg"] === "success") {
        Swal.fire({
          title: "교환이 성립되어 거래가 종료되었습니다!",
          confirmButtonColor: "#3fbe81",
          confirmButtonText: "확인",
        });
        history.push("/");
      }
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const bottomView = useCallback(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  //챗리스트 바뀔때마다 스크롤 내려주기
  useEffect(() => {
    bottomView();
  }, [bottomView, chatList]);

  if (chatJoinYn) {
    return (
      <>
        <BlankChatBox>
          <LoginChat />
          <ChatJoinBtn onClick={handler}>채팅 참여하기</ChatJoinBtn>
        </BlankChatBox>
      </>
    );
  } else {
    return (
      <ChatContainer>
        <LiveChatBox>
          <BtnArea>
            <ChatLabel onClick={closeModal}>실시간채팅</ChatLabel>
          </BtnArea>
          <ChatView className="scrollBar">
            {chatList?.map((data, idx) => {
              return <GroupChat {...data} key={idx} chatList={chatList} me={email} />;
            })}
            <div className="scrollbar" ref={scroll}></div>
          </ChatView>
          <ChattingInput icrId={icrId} socket={socket} email={email} />
        </LiveChatBox>
        <ChatUsers socket={socket} />
      </ChatContainer>
    );
  }
});

const ChatContainer = styled.div`
  display: flex;

  @media (max-width: 767px) {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1190px) {
  }
`;

const BlankChatBox = styled.div`
  margin-left: 30px;
  height: 522px;
  width: 723px;
  position: relative;

  @media (min-width: 768px) and (max-width: 1190px) {
    position: absolute;
    left: -17px;
    right: 50px;
    top: 650px;
  }
`;

const ChatJoinBtn = styled.button`
  display: inline-block;
  width: 180px;
  height: 50px;
  padding: 10px;
  border: none;
  background-color: #3fbe81;
  border-radius: 83px;
  cursor: pointer;
  margin: 80px 30px 0px 90px;
  color: #ffffff;
  font-size: 20px;

  position: absolute;
  top: 330px;
  left: 275px;
  right: auto;
  transform: translate(-50%, -50%);

  :hover {
    background-color: #269f65;
  }

  @media (max-width: 767px) {
    position: absolute;
    top: 1070px;
    left: -20px;
    transform: translate(-50%, -50%);
    z-index: 2000;
    width: 150px;
    height: 40px;
    font-size: 15px;
  }
`;

const LiveChatBox = styled.div`
  margin-left: 30px;
  width: 565px;

  @media (max-width: 767px) {
    margin-left: 0px;
  }

  @media (min-width: 768px) and (max-width: 1190px) {
  }
`;

const BtnArea = styled.div`
  display: flex;
`;

const ChatLabel = styled.button`
  background-color: #3fbe81;
  color: #ffffff;
  cursor: pointer;
  border: solid 1px #3fbe81;
  font-size: 16px;
  line-height: 1.33;
  padding: 10px 36px;
  width: 156px;
  height: 44px;
  border-radius: 5px 5px 0px 0px;
`;

const ChatView = styled.div`
  width: 565px;
  height: 522px;
  background-color: #ffffff;

  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  border: 5px solid #3fbe81;

  ::-webkit-scrollbar {
    background-color: #ffffff;
    width: 14px;
    padding: 0 10px;
  }

  ::-webkit-scrollbar-thumb {
    width: 14px;
    height: 110px;
    background-color: #c4c4c4;
    border-radius: 20px;
    background-clip: padding-box;
    border: 3.5px solid transparent;
  }

  @media (max-width: 767px) {
    width: 300px;
  }
`;

export default Chatting;
