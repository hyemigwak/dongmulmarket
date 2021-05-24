import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { GroupChat, LoginChat, ChatUsers, ChattingInput } from "./index";
import useJoinChat from "../hooks/useJoinChat";
import useSocket from "../hooks/useSocket";
import Swal from "sweetalert2";

const Chatting = memo(({ icrId, history }) => {
  // 채팅에 스크롤 넣어줌
  const scroll = useRef(null);
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.chat.chat_list);
  const { email } = useSelector((state) => state.user.user);

  const { chatJoinYn, handler } = useJoinChat(icrId); //참여 유무를 통해 버튼 결정

  const [socket, disconnectSocket] = useSocket("http://15.165.76.76:3001/chatting", email, icrId);

  useEffect(() => {
    return () => {
      console.info("disconnect socket", icrId);
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
      console.log(data);
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
          <ChatView>
            {chatList?.map((data, idx) => {
              return <GroupChat {...data} key={idx} chatList={chatList} me={email} />;
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

  @media (max-width: 767px) {
    position: relative;
  }

  @media (min-width: 768px) and (max-width: 1190px) {
    position: relative;
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
    z-index: 2000;

    transform: translate(-50%, -50%);

    width: 150px;
    height: 40px;
    font-size: 15px;
  }
`;

const LiveChatBox = styled.div`
  margin-left: 30px;
  width: 565px;

  @media (max-width: 767px) {
    position: absolute;
    left: 0px;
    top: 680px;
    left: -50px;
  }

  @media (min-width: 768px) and (max-width: 1190px) {
    position: absolute;
    left: 0px;
    top: 370px;
    left: -50px;
    
  }
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
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 0px;
  position: relative;
  overflow-y: scroll;
  box-sizing: border-box;
  border: 5px solid #3fbe81;

  @media (max-width: 767px) {
    position: absolute;
    top: -100px;
    width: 280px;
    height: 570px;
    left: -15px;
  }
`;

const WrapButtons = styled.div`
  display: flex;
  margin-left: 250px;
  
  @media (max-width: 767px) {
    position: relative;
    right: 340px;
    top: 420px;
  }
`;

const BtnText = styled.div`
  flex-grow: 0;
  font-size: 20px;
  font-weight: 500;
  color: #3fbe81;
  cursor: pointer;
  
  :hover {

    color:#ffffff;
  }
  @media (max-width: 767px) {
    font-size: 15px;
  }
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
  margin: 30px 20px 0 0;
  padding: 10px 30px;
  border-radius: 8px;
  border: solid 2px #3fbe81;
  background-color: #ffffff;
  font-size: 16px;

  :hover {
    background-color: #6fcea1;
    
  }

  @media (max-width: 767px) {
    position: relative;
    left: 100px;
    top: 100px;

    min-width: 100px;
    min-height: 39px;
    padding: 0px 0px;
  }
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
  margin: 30px 218px 0 0;
  padding: 10px 30px;
  border-radius: 8px;
  border: solid 2px #3fbe81;
  background-color: #ffffff;
  font-size: 16px;

  :hover {
    background-color: #6fcea1;
    
  }

  @media (max-width: 767px) {
    position: relative;
    left: 100px;
    top: 100px;

    min-width: 100px;
    min-height: 39px;
    padding: 0px 0px;
  }
`;

export default Chatting;
