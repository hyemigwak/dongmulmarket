import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  memo,
  useMemo,
} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as postActions } from "../redux/modules/post";
import { GroupChat, LoginChat, ChatUsers, ChattingInput } from "./index";
import io from "socket.io-client";
import axios from "axios";
import { config } from "../shared/config";

const Chat = memo((props) => {
  //detail 페이지에서 프롭스로 채팅방ID, 아이템ID 받아옴
  const { icrId, itemId } = props;
  console.log("props:", props);
  // 채팅에 스크롤 넣어줌
  const scroll = useRef(null);
  const dispatch = useDispatch();

  const [socket, setSocket] = useState("");
  const email = useMemo(() => localStorage.getItem("email"), []);

  const [modalOpen, setModalOpen] = useState(false);

  //채팅에 이미 참여되어있는 사람인지, 신규인지 확인하는 값
  const [ShowBtn, setShowBtn] = useState(true);

  //리덕스에 저장해놓은 채팅 리스트와, 참여 유저리스트를 가져온다
  const chatList = useSelector((state) => state.chat.chat_list);
  const userList = useSelector((state) => state.chat.user_list);

  const bottomView = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  if (!socket) {
    setSocket(
      io.connect("http://15.165.76.76:3001/chatting", {
        query: `email=${email}&icrId=${icrId}`,
      })
    );
  }

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  //채팅방 버튼 보여주기 유무 불러오기
  const isBossAPI = useCallback((icrId) => {
    axios({
      method: "GET",
      url: `${config.api}/postDetail/icrId/${icrId}`,
    })
      .then((res) => {
        // false면 채팅방 버튼 없어져야 함
        if (res.data.buttonYn["groupJoinButton"] === false) {
          setShowBtn(false);
        }
      })
      .catch((err) => {
        console.log("isBossAPI에러", err);
      });
  }, []);

  //참여 버튼 눌렀을 때, 화면 분기 & 데이터 받아오기
  const ChatStart = useCallback(() => {
    setShowBtn(false);
    dispatch(chatActions.addUserList(socket, { email, icrId }));
  }, [email, icrId, dispatch, socket]);

  //렌더링될때 소켓을 연결해준다.
  useEffect(() => {
    if (socket.connected) {
      console.log("연결완료");
    }
    //언마운트될때 소켓 연결 해제
    return () => {
      socket.disconnect();
      dispatch(chatActions.clearOne());
      dispatch(postActions.clearPost());
      console.log("연결해제");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    isBossAPI(icrId);
  });

  useEffect(() => {
    dispatch(chatActions.getAllChatList(socket));
    dispatch(chatActions.addChatList(socket));
    dispatch(chatActions.addUserList(socket, { email, icrId }));
  }, [dispatch, socket, email, icrId]);

  //챗리스트 바뀔때마다 스크롤 내려주기
  useEffect(() => {
    bottomView();
  }, [chatList]);

  if (ShowBtn) {
    return (
      <>
        <BlankChatBox>
          <LoginChat />
          <ChatJoinBtn onClick={ChatStart}>채팅 참여하기</ChatJoinBtn>
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
              return <GroupChat {...data} key={idx} chatList={chatList} />;
            })}
            <div ref={scroll}></div>
          </ChatView>
          <ChattingInput icrId={icrId} socket={socket} />
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
