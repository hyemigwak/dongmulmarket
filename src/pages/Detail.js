import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";
import { OneChat } from "../components";
import { config } from "../shared/config";
import io from "socket.io-client";
import { EmailSharp } from "@material-ui/icons";

const socket = io("http://15.165.76.76:3001/chatting");

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const cookie = getCookie("user_login") ? true : false;
  const detail = useSelector((state) => state.post.detail_list);
  const token = getCookie("user_login");
  const email = localStorage.getItem("email");
  console.log(detail);
  console.log("이메일", email);
  console.log("토큰확인", token);

  //소켓에 보내줄 내 닉네임, 인풋 메세지
  const _nickname = getCookie("nickname");
  const [message, setMessage] = useState("");
  const [ChatUsers, setChatUsers] = useState([]);
  // console.log(ChatUsers);

  //모달 설정 부분
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
      let send_data = {
        sender: _nickname,
        icrld: detail.icrId,
        message: msgContents,
      };
      socket.emit("chatToServer", send_data);
      setMessage("");
    }
  };

  // 기본적으로 채팅 참가하기 버튼은 생성되어 있어야 합니다.
  // 그래야 로그인 하지 않은 사람들도 버튼의 존재를 알 수 있습니다.
  // 단체 채팅 버튼 및 1:1 채팅 버튼도 기본적으로 비활성화 상태로 해야 합니다.
  socket.on("returnJoinAuto", (msg) => {
    if (msg["chatGroup"] === "N") {
      //채팅 참가하기 버튼 생성
      //단체 채팅 버튼 비활성화
      //1:1 채팅 버튼 비활성화
    } else {
      //채팅 참가하기 버튼 숨기기
      //단체 채팅 버튼 활성화
      if (msg["chatOne"] === "Y") {
        //1:1 채팅 버튼 활성화
      }
    }
  });

  socket.on("returnUserList", function (msg) {
    if (msg["group"]) {
      //단체 채팅방 유저 표시
    } else {
      //개인 채팅방 유저 표시
    }
  });

  //렌더링 될때, 디테일 데이터 받아오기 & 소켓 연결하기(확인)
  useEffect(() => {
    //디테일이 없으면 서버에서 받아온다
    if (!detail);
    dispatch(postActions.getOnePostAPI(id));

    // 소켓 연결
    socket.connect();

    //인증 & 보내기
    socket.emit(
      "authenticate",
      {
        token: token,
      },
      (data) => {
        if (data["msg"] === "success") {
          //테스트 emit
          const first_data = {
            email: email,
            icrId: detail.icrId,
            dicrId: detail.dicrId,
          };
          socket.emit("showUserList", first_data);
          socket.emit("joinAuto", first_data);
        }
      }
    );

    //최초 실행시 로그인한 유저가 판매자인지 보내준다.
    // const ChatJoinChkUser = () => {
    //   let data = {
    //     email: detail.email,
    //     icrld: detail.icrId,
    //   };
    //   if (cookie) {
    //     // socket.emit("joinAuto", data);
    //     // socket.emit("showUserList", data);
    //   } else {
    //     if (window.confirm("로그인해야 이용 가능합니다. 로그인하시겠습니까?")) {
    //       history.push("/login");
    //     } else {
    //       return;
    //     }
    //   }
    // };

    //방장일 경우 참여자를 받아오고, 아닐 경우 못받아옴
    const IsHostorNot = () => {
      socket.on("returnUserList", function (host_data) {
        console.log(host_data);
        if (host_data.chooseYn === "N") {
          setChatUsers([...ChatUsers, host_data.tier]);
        }
      });
    };

    //서버에서 받을때
    socket.on("showUserList", function (msg) {
      console.log(msg);
    });
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
          </ProductsBox>
          <ChatBox>
            <BtnArea>
              <StateBtn className="group" onClick={closeModal}>
                <ChatText>실시간채팅</ChatText>
              </StateBtn>
              <StateBtn className="one" onClick={openModal}>
                <ChatText>1:1 대화하기</ChatText>
              </StateBtn>
              <LiveChatBtn>실시간 대화 참여</LiveChatBtn>
            </BtnArea>
            <OneChat open={modalOpen} close={closeModal} />
            {modalOpen ? (
              <OneChat />
            ) : (
              <>
                <ChatView>
                  <EntranceMsg>username님이 입장하셨습니다.</EntranceMsg>
                  <MySpeech>
                    <MyNameTag>판매자닉넴</MyNameTag>
                    <MyBubble><ChatText>안녕하세요~반갑습니다</ChatText></MyBubble>
                  </MySpeech>
                 
                  <OtherSpeech>
                    <OtherNameTag>username</OtherNameTag>
                    <OtherBubble>
                      <ChatText>안녕하세요~~~</ChatText>
                    </OtherBubble>
                  </OtherSpeech>
                 
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
                  <ChatBtn onClick={submitMessage}>
                  <SendText>
                  전송
                  </SendText>
                    </ChatBtn>
                    <WrapButtons>       
                      <ForceExitBtn><BtnText>강퇴</BtnText></ForceExitBtn>
                      <TradeCancelBtn><BtnText>교환취소</BtnText></TradeCancelBtn>
                      <TradeSuccessBtn><BtnText>교환성사</BtnText></TradeSuccessBtn>
                    </WrapButtons>
            
              </>
            )}
          </ChatBox>
          <LiveChatBox>
            <LiveUser>user1</LiveUser>
            <LiveTalkBtn>대화하기</LiveTalkBtn>
          </LiveChatBox>
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
  padding-top: 130px;

  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const Title=styled.div`
height: 40px;
margin: 60.3px 167px 6px 50px;
font-family: NotoSans;
font-size: 36px;
font-weight: 600;
font-stretch: normal;
font-style: normal;
line-height: 1.11;
letter-spacing: normal;
text-align: left;
color:#1c1c1c;
`;

const WrapBox = styled.div`
  display: flex;

`;

const ProductsBox = styled.div`
  margin-left:51px;
 
`;

const InfoBox = styled.div`
display:flex;
width: 353.1px;
height: 240px;
flex-grow: 0;
margin: 34px 0 0;
`;

const InfoTitle=styled.div`
height: 24px;
flex-grow: 0;
margin: 0 281px 10px 1.1px;
font-family: NotoSans;
font-size: 18px;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color:#1c1c1c;
position:relative;
top:26px;

`;

const TitleArea=styled.div`
margin: 0 75.1px 12px 0;
`;

const DetailArea=styled.div`

width: 228px;
  height: 240px;
  flex-grow: 0;
  margin: 0 0 0 10px;
`;

const TitleText = styled.div`

flex-grow: 0;

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

const DetailText=styled.div`
flex-grow: 0;

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
position:relative;
top:10px;
`;

const ChatBox = styled.div`
  margin-left: 30px;
  width:730px;
`;

const StateBtn=styled.button`
width: 165px;
height: 44px;

padding: 1px 0 0 37px;
border: solid 1px #3fbe81;
background-color: #3fbe81;

`;


const ChatText=styled.div`

  margin: 9px 35px 10px 0;
  font-family: NotoSans;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
`;

const LiveChatBtn=styled.div`
width: 150px;
height: 24px;
flex-grow: 0;
margin: 11px 0px 9px 240px;
font-family: NotoSans;
font-size: 18px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color: #7d7d7d;
cursor:pointer;

  
`;


const ChatView = styled.div`
  width: 723px;
  height: 522px;
  flex-grow: 0;
  
  padding: 26px 21px 21px 32px;
  background-color: #efefef;

`;

const EntranceMsg=styled.div`

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
color:#7d7d7d;

`;

const MySpeech=styled.div`
align-items:right;
margin-left: 350px;
`;

const OtherSpeech=styled.div`

`;

const MyNameTag=styled.div`
color:#4c4c4c;
flex-grow: 0;
width:90px;
margin: 0 0px 6px 187px;
font-family: NotoSans;
font-size: 14px;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
`;

const OtherNameTag=styled.div`
color:#4c4c4c;
flex-grow: 0;
margin: 0 396px 6px 12px;
font-family: NotoSans;
font-size: 14px;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
`;

const MyBubble=styled.div`
width: 300px;
height: 49px;
flex-grow: 0;
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
gap: 10px;

padding: 12px 16px;
border-radius: 10px;
background-color: #a8a8a8;

`;

const OtherBubble=styled.div`
width: 300px;
  height: 49px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 0 0 0 12px;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: #3fbe81;
`;

const ChatInputC = styled.div`
  
  justify-contents:center;
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

  position:relative;
`;

const ChatBtn = styled.button`
position:absolute;
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
border:solid 1px #c4c4c4;
`;

const SendText=styled.div`
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

const WrapButtons=styled.div`
display:flex;
margin-top:40px;
`;

const BtnText=styled.div`
flex-grow: 0;
font-family: NotoSans;
font-size: 20px;
font-weight: 500;
color: #3fbe81;
`;

const ForceExitBtn=styled.button`
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
  background-color:#ffffff;

`;

const TradeCancelBtn=styled.button`
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
background-color:#ffffff;

`;

const TradeSuccessBtn=styled.button`
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
background-color:#ffffff;

`;

const LiveChatBox=styled.div`
width: 170px;
height: 522px;
flex-grow: 0;
margin: 0 0 0 32px;
padding: 12px 0 8px;
background-color: #d9d9d9;
display:flex;
`;

const LiveUser=styled.div`
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

const LiveTalkBtn=styled.button`
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
color:#ffffff;
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

const BtnArea = styled.div`
  display: flex;
 
  .group {
   
    background-color: #3fbe81;
    color: #ffffff;
   
    cursor: pointer;
  }
  .one {
 
    background-color: #d6d6d6;
    color: #ffffff;
   
    cursor: pointer;
  }
`;

export default Detail;
