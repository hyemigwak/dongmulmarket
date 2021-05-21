import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { GroupChat, LoginChat, ChatUsers, ChattingInput } from "./index";
import useJoinChat from "../hooks/useJoinChat";
import useSocket from "../hooks/useSocket";

const Chat = memo(({ icrId }) => {
  const scroll = useRef(null);

  const chatList = useSelector((state) => state.chat.chat_list);
  const { email } = useSelector((state) => state.user.user);

  const { chatJoinYn, handler } = useJoinChat(icrId); //참여 유무를 통해 버튼 결정
  const socket = useSocket(
    "http://15.165.76.76:3001/chatting",
    email,
    icrId,
    chatJoinYn
  );
  const [modalOpen, setModalOpen] = useState(false);

  const bottomView = useCallback(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
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
          <ChatView>
            {chatList?.map((data, idx) => {
              return (
                <GroupChat {...data} key={idx} chatList={chatList} me={email} />
              );
            })}
            <div ref={scroll}></div>
          </ChatView>
          <ChattingInput icrId={icrId} socket={socket} email={email} />
          <WrapButtons>
            <TradeCancelBtn>
              <BtnText>교환취소</BtnText>
            </TradeCancelBtn>
            <TradeSuccessBtn>
              <BtnText>교환성사</BtnText>
            </TradeSuccessBtn>
          </WrapButtons>
        </LiveChatBox>
        <ChatUsers socket={socket} />
      </ChatContainer>
    );
  }
});

const ChatContainer = styled.div`
  display: flex;
`;

const BlankChatBox = styled.div`
  margin-left: 30px;
  height: 522px;
  width: 723px;
  position: relative;
`;

const ChatJoinBtn = styled.button`
  display: inline-block;
  width: 250px;
  height: 60px;
  padding: 10px;
  border: none;
  background-color: #3fbe81;
  border-radius: 83px;
  cursor: pointer;
  margin: 80px 30px 0px 90px;
  color: #ffffff;
  font-size: 20px;

  position: absolute;
  top: 270px;
  left: 270px;
  right: auto;
  transform: translate(-50%, -50%);
`;

const LiveChatBox = styled.div`
  margin-left: 30px;
  width: 565px;
`;

const BtnArea = styled.div`
  display: flex;
  position: absolute;
  top: 217px;
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
  border-radius: 8px;
`;

const ChatView = styled.div`
  width: 565px;
  height: 522px;
  background-color: #efefef;
  margin-top: 0px;
  position: relative;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const ChatInput = styled.input`
  width: 724px;
  height: 74px;
  flex-grow: 0;

  border: solid 2px #6fcea1;
  background-color: #ffffff;
  ::placeholder {
    padding: 0px 20px;
    font-size: 18px;
  }

  position: relative;
  top: 520px;
`;

const WrapButtons = styled.div`
  display: flex;
  margin-left: 250px;
`;

const BtnText = styled.div`
  flex-grow: 0;
  font-size: 20px;
  font-weight: 500;
  color: #3fbe81;
  cursor: pointer;
`;

const TradeCancelBtn = styled.button`
  min-width: 145px;
  min-height: 49px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 20px 0 0;
  padding: 10px 30px;
  border-radius: 8px;
  border: solid 2px #3fbe81;
  background-color: #ffffff;
  font-size: 16px;
`;

const TradeSuccessBtn = styled.button`
  min-width: 145px;
  min-height: 49px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 218px 0 0;
  padding: 10px 30px;
  border-radius: 8px;
  border: solid 2px #3fbe81;
  background-color: #ffffff;
  font-size: 16px;
`;

export default Chat;
