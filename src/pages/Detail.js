import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";
import { OneChat, GroupChat, NoLogin, LoginChat } from "../components";
import { config } from "../shared/config";
import io from "socket.io-client";
import { EmailSharp } from "@material-ui/icons";


const socket = io("http://15.165.76.76:3001/chatting");

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const is_login = useSelector((state) => state.user.is_login);
  const detail = useSelector((state) => state.post.detail_list);
  const user_token = getCookie("user_login");
  const email = localStorage.getItem("email");
  // console.log(detail);

  //소켓에 보내줄 내 닉네임, 인풋 메세지
  const [message, setMessage] = useState("");

  //채팅방에 있는 유저정보 저장하기
  const [ChatUsers, setChatUsers] = useState([]);

  //setRoom에서 user정보와 이전 msg를 딕셔너리형태로 전부 받아온다.
  const [firstConfig, setFirstConfig] = useState([]);
  console.log(firstConfig);

  //현재 채팅방에 join한 사람의 nickname을 보여준다.
  const [joinNickname, setJoinNickname] = useState("");

  //모달 설정 부분
  const [chatView, setChatView] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //서버로 메세지 보낼때
  const submitMessage = (msgContents) => {
    if (!msgContents) {
      window.alert("메세지를 입력해주세요!");
      return;
    } else {
      socket.emit(
        "authenticate",
        {
          token: user_token,
        },
        (data) => {
          if (data["msg"] === "success") {
            console.log("msg가 성공이라면 if문");
            let send_data = {
              email: email,
              icrId: detail.icrId,
              chatMsg: msgContents,
            };
            console.log("send_data", send_data);
            socket.emit("sendMsg", send_data);
            socket.on("getMsg", (getData) => {
              console.log("겟데이터", getData);
            });
            setMessage("");
          }
        }
      );
    }
  };

  //참여 버튼 눌렀을 때, 데이터 보내고 받아오기
  const ChatStart = () => {
    setChatView(true);
    console.log("챗스타트");
    console.log("토큰", user_token);
    let data = {
      email: email,
      icrId: detail.icrId,
    };
    console.log("인증할때 보내는 데이터", data);
    socket.connect();
    socket.emit(
      "authenticate",
      {
        token: user_token,
      },
      (data) => {
        if (data["msg"] === "success") {
          console.log("msg가 성공이라면 if문");
          const first_data = {
            email: email,
            icrId: detail.icrId,
            // dicrId: detail.dicrId,
          };
          console.log("퍼스트데이터", first_data);
          socket.emit("joinRoom", first_data);
          socket.on("setRoom", (setRoomData) => {
            console.log("셋룸데이터", setRoomData);
            setFirstConfig((oldData) => [...oldData, ...setRoomData]);
          });

          //버튼 누를때 나옴, 채팅방에 닉네임님이 입장하셨습니다 뿌려주기
          socket.on("returnJoinMsg", (joiner_data) => {
            console.log("조인한 사람들을 보여주기", joiner_data);
            // console.log(joiner_data.nickname);
            // setJoinNickname(joiner_data.nickname);
          });
          //사용자 목록에 추가
          socket.on("addUser", (addData) => {
            console.log("addUser데이터", addData);
          });
        }
      }
    );
  };

  socket.on("returnUserList", function (msg) {
    if (msg["group"]) {
      //단체 채팅방 유저 표시
    } else {
      //개인 채팅방 유저 표시
    }
  });

  //렌더링 될때, 디테일 데이터 받아오기 & 소켓 연결하기(확인)
  useEffect(() => {
    // //디테일이 없으면 서버에서 받아온다
    // if (!detail) {
    dispatch(postActions.getOnePostAPI(id));
    // }

    //소켓 연결하기
    // socket.connect();

    //언마운트될때 소켓 연결 끊기
    return () => {
      socket.disconnect();
    };
  }, []);

  //참여하기 누르면 채팅 받아와야할 것 같은데!

  return (
    <React.Fragment>
      <WrapDetail>
        <Title>물품 교환하기</Title>
        <WrapBox>
          <ProductsBox>
            <InfoTitle>상품 정보</InfoTitle>
            <Img src={detail.image} />
            <InfoBox>
              <TitleArea>
                <TitleText>품목명:</TitleText>
                <TitleText>카테고리:</TitleText>
                <TitleText>글 올린 시간:</TitleText>
                <TitleText>교환 종료 시간:</TitleText>
                <TitleText>참여 인원:</TitleText>
                <TitleText>코멘트:</TitleText>
              </TitleArea>
              <DetailArea>
                <DetailText>{detail.title}</DetailText>
                <DetailText>{detail.category}</DetailText>
                <DetailText>{detail.createdDt}</DetailText>
                <DetailText>{detail.createdDt}</DetailText>
                <DetailText>2명</DetailText>
                <DetailText>{detail.comment}</DetailText>
              </DetailArea>
            </InfoBox>
            {is_login ? <ChatJoinBtn onClick={ChatStart}>채팅 참여하기</ChatJoinBtn> : null}
          </ProductsBox>
          <ChatBox>
            {is_login? 
            <BtnArea>
              <button className="group" onClick={closeModal}>
                실시간채팅
              </button>
              <button className="one" onClick={openModal}>
                1:1 대화하기
              </button>
              <LiveChatBtn>실시간 대화 참여</LiveChatBtn>
            
            </BtnArea>
            :null}
            <OneChat open={modalOpen} close={closeModal} />
            {is_login ? <LoginChat /> : <NoLogin />}
            {modalOpen ? (
              <OneChat />
            ) : (
              <>
                {chatView ? (
                  <>
                    <ChatView>
                      {firstConfig.map((data, idx) => {
                        console.log(data);
                        return <GroupChat {...data} key={idx} />;
                      })}
                    </ChatView>

                    <ChatInput
                      type="text"
                      placeholder="텍스트를 입력하세요."
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
                    <ChatBtn>
                      <SendText onClick={submitMessage}>전송</SendText>
                    </ChatBtn>
                    <WrapButtons>
                      <ForceExitBtn>
                        <BtnText>강퇴</BtnText>
                      </ForceExitBtn>
                      <TradeCancelBtn>
                        <BtnText>교환취소</BtnText>
                      </TradeCancelBtn>
                      <TradeSuccessBtn>
                        <BtnText>교환성사</BtnText>
                      </TradeSuccessBtn>
                    </WrapButtons>
                  </>
                ) : null}
              </>
            )}
          </ChatBox>
          {is_login? 
          <LiveChatBox>
            <LiveUser>user1</LiveUser>
            <LiveTalkBtn>대화하기</LiveTalkBtn>
          </LiveChatBox>
          :null}
          {/* <UserView>
            <Text>
              <h3>
                <b>참여중</b>
              </h3>
            </Text>
            <UserBox>
              <UserNameBtn>
                {ChatUsers.map((user, idx) => (
                  <div key={idx}>
                    <div>{user}</div>
                    <OfferChatBtn
                      onClick={() => {
                        if (window.confirm(`${user}님과 채팅을 진행하시겠습니까?`)) {
                          openModal();
                          // 해당 유저와 1:1 채팅방을 진행하는 socket 함수
                        } else {
                          return;
                        }
                      }}
                    >
                      1:1 대화신청
                    </OfferChatBtn>
                  </div>
                ))}
              </UserNameBtn>
            </UserBox>
          </UserView> */}
        </WrapBox>
      </WrapDetail>
    </React.Fragment>
  );
};

const WrapDetail = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  width: 1200px;
  margin: 200px auto;

  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const Title = styled.div`
  height: 40px;
  margin: 63px 167px 6px 0px;
  font-family: NotoSans;
  font-size: 36px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.11;
  letter-spacing: normal;
  text-align: left;
  color: #1c1c1c;
`;

const WrapBox = styled.div`
  display: flex;
  /* width: 100%;
  margin: 0 auto; */
`;

const ProductsBox = styled.div`
  /* margin-left: 51px; */
`;


const InfoTitle = styled.div`
  height: 24px;
  flex-grow: 0;
  margin: 0 281px 10px 1px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #1c1c1c;
  position: relative;
  top: 26px;
`;

const InfoBox = styled.div`
  display: flex;
  width: 353.1px;
  height: 240px;
  flex-grow: 0;
  margin: 30px 0 0;
  justify-content : space-between; 
`;

const TitleArea = styled.div`
  margin: 0 10px 12px 0;
  width:150px;
  flex-grow:1;
`;

const DetailArea = styled.div`

  
 
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
  bottom: 460px;
  left: 570px;


  
`;

const TitleText = styled.div`
  flex-grow: 0;
  margin-bottom: 12px;
  font-family: NotoSans;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
  color: #7d7d7d;
`;

const DetailText = styled.div`
  flex-grow: 0;
  margin-bottom: 12px;
  font-family: NotoSans;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
  color: #1c1c1c;
`;

const Img = styled.img`
  width: 347px;
  height: 310px;
  margin: 10px 6px 34px 0.1px;
  border-radius: 8px;
  border: solid 2px #6fcea1;
  position: relative;
  top: 10px;
`;

const ChatBox = styled.div`

  margin-left: 30px;
  width: 730px;
`;

const BtnArea = styled.div`
  display: flex;

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
  margin: 11px 0px 9px 250px;
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #7d7d7d;
  cursor: pointer;
`;

const ChatView = styled.div`
  width: 565px;
  height: 522px;
  flex-grow: 0;

  /* padding: 26px 21px 21px 32px; */
  background-color: #efefef;
`;

const EntranceMsg = styled.div`
  width: 270px;
  height: 24px;
  flex-grow: 0;
  margin: 0 auto 8px auto;
  font-family: NotoSans;
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
`;

const ChatBtn = styled.button`
  position: absolute;
  bottom: 95px;
  left: 745px;
  width: 102px;
  height: 38px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 21px;
  margin: 0 0 0 305px;
  padding: 7px 14px 6px;
  border-radius: 4px;
  background-color: #c4c4c4;
  border: solid 1px #c4c4c4;
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
  margin-top: 40px;
`;

const BtnText = styled.div`
  flex-grow: 0;
  font-family: NotoSans;
  font-size: 20px;
  font-weight: 500;
  color: #3fbe81;
`;

const ForceExitBtn = styled.button`
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

const LiveChatBox = styled.div`
  width: 170px;
  height: 522px;
  flex-grow: 0;
  margin-top: 44px;
  background-color: #d9d9d9;
  display: flex;
`;

const LiveUser = styled.div`
  flex-grow: 0;
  margin: 0 23px 11.5px 14px;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: left;
  color: #373737;
`;

const LiveTalkBtn = styled.button`
  width: 80px;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0.5px 3px 11px;
  padding: 4px 10px;
  border-radius: 83px;
  background-color: #a8a8a8;
  color: #ffffff;
  cursor: point;
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

export default Detail;
