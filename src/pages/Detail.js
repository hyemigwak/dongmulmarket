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
        <WrapBox>
          <ProductsBox>
            <Img src={detail.image} />
            <InfoBox>
              <Text>
                <span>품목명:</span>
                {detail.title}
              </Text>
              <Text>
                <span>카테고리: </span>
                {detail.category}
              </Text>
              <Text>
                <span>글 올린 시간: </span>
                {detail.createdDt}
              </Text>
              <Text>
                <span>교환 종료 시간: </span>
                {detail.deadLine}
              </Text>
              <Text>
                <span>경매 참여 인원:</span>채팅이 구현되면 하자
              </Text>
              <Text>
                <span>코멘트:</span>
                {detail.comment}
              </Text>
              <ChatJoinBtn>채팅 참여하기</ChatJoinBtn>
            </InfoBox>
          </ProductsBox>
          <ChatBox>
            <BtnArea>
              <button className="group" onClick={closeModal}>
                실시간채팅
              </button>
              <button className="one" onClick={openModal}>
                교환진행중
              </button>
            </BtnArea>
            <OneChat open={modalOpen} close={closeModal} />
            {modalOpen ? (
              <OneChat />
            ) : (
              <>
                <ChatView />
                <ChatInputC>
                  <ChatInput
                    type="text"
                    placeholder="내용을 입력하세요."
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
                  <ChatBtn onClick={submitMessage}>전송</ChatBtn>
                </ChatInputC>
              </>
            )}
          </ChatBox>
          <UserView>
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
          </UserView>
        </WrapBox>
      </WrapDetail>
    </React.Fragment>
  );
};

const WrapDetail = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 130px;
  display: flex;

  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const WrapBox = styled.div`
  display: flex;
  width: 1024px;
  margin: auto;
  justify-content: space-evenly;
  align-items: center;
`;

const ProductsBox = styled.div`
  height: 100vh;
  width: 600px;
`;

const Text = styled.div`
  span {
    font-weight: 600;
  }
`;

const Img = styled.img`
  margin-left: 100px;
  margin-top: 40px;
  width: 400px;
  height: 300px;
`;

const InfoBox = styled.div`
  margin-left: 100px;
  margin-top: 40px;
`;

const ChatJoinBtn = styled.div`
  margin: 30px auto;
  width: 130px;
  height: 40px;
  border-radius: 10px;
  background-color: #6fcea1;
  border: none;
  cursor: pointer;
  color: #ffffff;
  padding: 10px 24px;
`;

const ChatBox = styled.div`
  margin-top: 10px;
  height: 100vh;
  width: 600px;
  text-align: center;
  margin-left: 30px;
`;

const ChatView = styled.div`
  background: #f5f5f5;
  height: 500px;
  width: 500px;

  border: 1px solid #eee;
  text-align: center;
`;

const ChatInputC = styled.div`
  justify-content: center;
`;

const ChatInput = styled.input`
  height: 88px;
  width: 500px;
  border: 1px solid #6fcea1;
  background: #ffffff;
  ::placeholder {
    padding: 0px 20px;
    font-size: 18px;
  }
`;

const ChatBtn = styled.button`
  width: 80px;
  height: 34px;
  padding: 5px 0px;
  border-radius: 80px;
  font-size: 15px;
  display: inline-block;
  position: relative;
  bottom: 60px;
  left: 180px;

  cursor: pointer;
  border: none;
  background-color: #c0c0c0;
  color: #ffffff;
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
  align-items: center;
  justify-content: center;
  .group {
    border: none;
    width: 250px;
    height: 40px;
    background-color: #3fbe81;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
  }
  .one {
    border: none;
    width: 250px;
    height: 40px;
    background-color: #d6d6d6;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
  }
`;

export default Detail;
