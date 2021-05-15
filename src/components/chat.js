import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { getCookie } from "../shared/Cookie";
import { OneChat, GroupChat, LoginChat, ChatUsers } from ".";
import io from "socket.io-client";
import axios from "axios";
import { config } from "../shared/config";


const Chat = (props) => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chat_list);
  const userList = useSelector((state) => state.chat.user_list);
  const Chat = chatList?.length;
  console.log("챗리스트", chatList);
  const token = getCookie("user_login");

  const { icrId, itemId } = props;

  const email = localStorage.getItem("email");
  const socket = io.connect("http://15.165.76.76:3001/chatting", { query: `email=${email}&icrId=${icrId}` });

  //채팅 보여주기
  const [chatView, setChatView] = useState(false);

  //모달 설정 부분
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //소켓에 보내줄 내 채팅 메세지
  const [message, setMessage] = useState("");

  const onChangeMessage = useCallback((e) => setMessage(e.target.value), []);

  //버튼 활성화 유무
  const [ShowBtn, setShowBtn] = useState(true);

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

  //서버로 메세지 보낼때
  const submitMessage = (message) => {
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
            console.log("msg가 성공이라면 if문");
            let send_data = {
              email: email,
              icrId: icrId,
              chatMsg: message,
            };
            console.log("센드데이터", send_data);
            socket.emit("sendMsg", send_data);
            setMessage("");
          }
        }
      );
    }
  };

  //참여 버튼 눌렀을 때, 화면 분기 & 데이터 받아오기
  const ChatStart = () => {
    //화면 분기에 필요
    setChatView(true);
    setShowBtn(false);
    let data = {
      email: email,
      icrId: icrId,
    };
    dispatch(chatActions.addUserList(socket, data));

    // console.log("인증할때 보내는 데이터", data);
    // socket.emit(
    //   "authenticate",
    //   {
    //     token: token,
    //   },
    //   (data) => {
    //     if (data["msg"] === "success") {
    //       console.log("msg가 성공이라면 if문");
    //       const joinRoom_data = {
    //         email: email,
    //         icrId: icrId,
    //       };
    //       //버튼 누르면 누가 참여했는지 서버에 보내준다
    //       socket.emit("joinRoom", joinRoom_data);
    //       //서버에서 내려준 참여자 목록을 저장해서 화면에 보여준다
    //       socket.on("addUser", (addUser_data) => {
    //         console.log("추가된 사용자는 누구?", addUser_data);
    //         dispatch(chatActions.addUserList(addUser_data));
    //       });
    //     }
    //   }
    // );
  };

  useEffect(() => {
    isBossAPI(icrId);
  }, [icrId]);

  //렌더링될때 소켓을 연결해준다.
  useEffect(() => {
    if (socket.connected) {
      console.log("연결완료");
    }
    // socket.connect();
    // console.log("연결완료");
    // return () => {
    //   chatActions.socket.disconnect();
    //   console.log("연결해제");
    // };

    return () => {
      socket.disconnect();
      console.log("연결해제");
    };
  }, []);

  //렌더링 될 때마다, 데이터 가져오고 추가
  useEffect(() => {
    console.log("렌더링되는지 확인");
    dispatch(chatActions.getAllChatList(socket));
    dispatch(chatActions.addChatList(socket));
    console.log("getall, addchat");
  }, [icrId]);

  //최초에 이전 채팅 히스토리 받아온다
  // useEffect(() => {
  //   // socket.connect();
  //   //메세지 받기(1개씩)
  //   socket.emit(
  //     //인증 필요함
  //     "authenticate",
  //     {
  //       token: token,
  //     },
  //     (data) => {
  //       if (data["msg"] === "success") {
  //         console.log("msg가 성공이라면 if문");
  //         //보낼데이터
  //         socket.on("getMsg", (getData) => {
  //           console.log("겟데이터", getData);
  //           console.log("겟데이터의데이터", getData.data);
  //           dispatch(chatActions.addChatList(getData.data));
  //         });
  //       }
  //     }
  //   );
  //   //언마운트될때 소켓 연결 끊기
  //   return () => {
  //     socket.disconnect();
  //   };
  //   //빈배열의 경우 새로고침할때 리덕스가 날아가면서 icrId를 가져오지 못해 채팅을 못불러옴.
  // }, [icrId]);

  //스크롤넣어줄것임
  const scroll = useRef(null);
  const bottomView = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  //챗리스트 바뀔때마다 스크롤 내려주기
  useEffect(() => {
    bottomView();
  }, [chatList]);

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
          {/* ShowBtn이 false면 채팅방이 보여지고, LoginChat이 사라져야한다 */}

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
              <ChatInput
                type="text"
                placeholder="텍스트를 입력하세요."
                value={message}
                onChange={onChangeMessage}
                onKeyPress={(e) => {
                  console.log("이키", e.key);
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitMessage(message);
                  }
                }}
              />
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
};

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

const EntranceMsg = styled.div`
  width: 270px;
  height: 24px;
  flex-grow: 0;
  margin: 14px auto;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #7d7d7d;
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

const SendText = styled.div`
  flex-grow: 0;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
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

const UserView = styled.div`
  margin-bottom: 300px;
  margin-left: 30px;

  text-align: center;
`;

const UserBox = styled.div`
  background: #d6d6d6;
  height: 550px;
  width: 150px;
  border-radius: 20px;
`;

const UserNameBtn = styled.div`
  display: flex;
  flex-direction: row;
  div {
    margin: 14epx auto;
    border: 1px solid #dbdbdb;
    cursor: pointer;
    outline: none;
    background-color: #ffe0a2;
    color: black;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    padding: 10px;
    width: 100px;
    height: 40px;
  }
`;

const OfferChatBtn = styled.button`
  width: 80px;
  height: 24px;
  border-radius: 10px;
  background-color: #91be89;
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
