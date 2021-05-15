import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { getCookie } from "../shared/Cookie";
import { OneChat, GroupChat, LoginChat, ChatUsers, ChattingInput } from "./index";
import io from "socket.io-client";
import axios from "axios";
import { config } from "../shared/config";

const Chat = memo((props) => {
  console.log("2");

  //detail 페이지에서 프롭스로 채팅방ID, 아이템ID 받아옴
  const { icrId, itemId } = props;

  const dispatch = useDispatch();

  //리덕스에 저장해놓은 채팅 리스트와, 참여 유저리스트를 가져온다
  const chatList = useSelector((state) => state.chat.chat_list);
  const userList = useSelector((state) => state.chat.user_list);

  console.log("챗 리스트", chatList);

  // //채팅에 입력한 내 메세지를 state로 저장
  // const [message, setMessage] = useState("");
  // //채팅 input에 걸어놓은 onChange 함수
  // const onChangeMessage = useCallback((e) => setMessage(e.target.value), []);

  const [socket, setSocket] = useState("");

  //토큰과 이메일은 각 쿠키, 로컬스토리지에서 가져옴
  const token = getCookie("user_login");
  const email = localStorage.getItem("email");

  //채팅 보여주기
  // const [chatView, setChatView] = useState(false);

  //모달 설정(실시간채팅, 1:1채팅 분기)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //버튼 활성화 유무
  const [ShowBtn, setShowBtn] = useState(true);

  //렌더링될때 소켓 연결

  //채팅방 버튼 보여주기 유무 불러오기
  const isBossAPI = (icrId) => {
    let token = getCookie("user_login");
    axios({
      method: "POST",
      url: `${config.api}/mainPage/${icrId}`,
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        console.log("버튼에서 내려오는 값", res.data);
        // false면 채팅방 버튼 없어져야 함
        if (res.data.buttonYn["groupJoinButton"] === false) {
          setShowBtn(false);
        }
      })
      .catch((err) => {
        console.log("isBossAPI에러", err);
      });
  };

  //참여 버튼 눌렀을 때, 화면 분기 & 데이터 받아오기
  const ChatStart = () => {
    //화면 분기에 필요
    // setChatView(true);
    setShowBtn(false);
    let data = {
      email: email,
      icrId: icrId,
    };
    dispatch(chatActions.addUserList(socket, data));
  };

  //렌더링될때 소켓을 연결해준다.
  // useEffect(() => {
  //   if (socket.connected) {
  //     console.log("연결완료");
  //   }
  //   //언마운트될때 소켓 연결 해제
  //   return () => {
  //     socket.disconnect();
  //     console.log("연결해제");
  //   };
  // }, []);

  console.log("icrId", icrId);
  useEffect(() => {
    isBossAPI(icrId);
  }, [icrId]);

  useEffect(() => {
    setSocket(io.connect("http://15.165.76.76:3001/chatting", { query: `email=${email}&icrId=${icrId}` }));
    console.log("소켓", socket);
    //채팅리스트 가져오기(기존 리스트 + 추가된 리스트)
    dispatch(chatActions.getAllChatList(socket));
    //채팅 받아오기
    dispatch(chatActions.addChatList(socket));
  }, [socket, icrId]);

  // 채팅에 스크롤 넣어줌
  const scroll = useRef(null);
  const bottomView = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  //챗리스트 바뀔때마다 스크롤 내려주기
  // useEffect(() => {
  //   bottomView();
  // }, [chatList]);

  if (ShowBtn) {
    return (
      <>
        <ChatBox>
          <LoginChat />
          <ChatJoinBtn onClick={ChatStart}>채팅 참여하기</ChatJoinBtn>
        </ChatBox>
      </>
    );
  } else {
    return (
      <ChatContainer>
        <ChatBox>
          <BtnArea>
            <div>
              <button className="group" onClick={closeModal}>
                실시간채팅
              </button>
              <button className="one" onClick={openModal}>
                1:1 대화하기
              </button>
            </div>
            <LiveChatBtn>실시간 대화 참여</LiveChatBtn>
          </BtnArea>
          {modalOpen ? (
            <OneChat open={modalOpen} close={closeModal} />
          ) : (
            <>
              <ChatView>
                {chatList?.map((data, idx) => {
                  return <GroupChat {...data} key={idx} chatList={chatList} />;
                })}
                <div ref={scroll}></div>
              </ChatView>
              <ChattingInput icrId={icrId} socket={socket} />
              {/* <ChatInput
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
              /> */}
              <WrapButtons>
                <TradeCancelBtn>
                  <BtnText>교환취소</BtnText>
                </TradeCancelBtn>
                <TradeSuccessBtn>
                  <BtnText>교환성사</BtnText>
                </TradeSuccessBtn>
              </WrapButtons>
            </>
          )}
        </ChatBox>
        <ChatUsers userList={userList} itemId={itemId} icrId={icrId} />
      </ChatContainer>
    );
  }
});

const ChatContainer = styled.div`
  display: flex;
`;

const ChatBox = styled.div`
  margin-left: 30px;
  width: 723px;
`;

const BtnArea = styled.div`
  display: flex;
  width: 723px;

  .group {
    background-color: #3fbe81;
    color: #ffffff;
    cursor: pointer;
    border: solid 1px #3fbe81;
    font-size: 16px;
    line-height: 1.33;
    padding: 10px 36px;
    width: 156px;
    height: 44px;
    border-radius: 8px 0 0 0;
  }
  .one {
    background-color: #ffffff;
    color: #7d7d7d;
    cursor: pointer;
    border: solid 1px #7d7d7d;
    font-size: 16px;
    line-height: 1.33;
    padding: 10px 29px;
    width: 156px;
    height: 44px;
    border-radius: 0 8px 0 0;
  }
`;

const LiveChatBtn = styled.div`
  width: 158px;
  height: 24px;
  flex-grow: 0;
  margin: 11px 0px 9px 240px;
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #7d7d7d;
  cursor: pointer;
`;

const ChatView = styled.div`
  width: 723px;
  height: 522px;
  background-color: #efefef;
  position: absolute;
  top: 290px;
  margin-top: 0px;
  bottom: 0px;

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
  margin-top: 600px;
`;

const BtnText = styled.div`
  flex-grow: 0;
  font-family: NotoSans;
  font-size: 20px;
  font-weight: 500;
  color: #3fbe81;
  cursor: pointer;
`;

const TradeCancelBtn = styled.button`
  min-width: 159px;
  min-height: 53px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 20px 0 0;
  padding: 10px 30px;
  border-radius: 8px;
  border: solid 2px #3fbe81;
  background-color: #ffffff;
`;

const TradeSuccessBtn = styled.button`
  min-width: 159px;
  min-height: 53px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 218px 0 0;
  padding: 10px 30px;
  border-radius: 8px;
  border: solid 2px #3fbe81;
  background-color: #ffffff;
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

  position: relative;
  right: 80px;
  top: 20px;
`;

export default Chat;
