import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

//디테일 페이지로 가게하는 것 연결 필요함
//user1에 대한 정보를 디테일 페이지나 채팅 api에서 가져와서 뿌려줘야함

export const ContactChat = (props) => {
  const tradeSuccess = () => {
    if (window.confirm("닉네임님과의 물물교환에 성공하셨나요?")) {
      window.alert("물물교환이 성사되었습니다!");
      //교환 확정 디스패치해주기
      history.replace("/");
    }
  };
  const tradeFail = () => {
    if (window.confirm("닉네임님과의 거래를 취소하시겠습니까?")) {
      window.alert("거래가 취소되었습니다");
      //교환 취소 디스패치해주기
      history.push("/detail");
    }
  };

  return (
    <div>
      <Title> 1:1 채팅하기</Title>
      <ContactContainer>
        <Content>
          <div>
            <span>구매자:</span> username
          </div>
          <div>
            <span>구매자 주소:</span> user location
          </div>
          <div>
            <span>전화번호:</span> user phoneNumber
          </div>
        </Content>
        <ChatArea>
          <ChatTitle>Chating😎</ChatTitle>
          <MyChat>안녕하세요</MyChat>
          <YourChat>네~ 안녕하세요!</YourChat>
        </ChatArea>
        <BtnArea>
          <MyBtn onClick={tradeSuccess}>교환완료</MyBtn>
          <MyBtn onClick={tradeFail}>거래취소</MyBtn>
        </BtnArea>
      </ContactContainer>
    </div>
  );
};

const Title = styled.div`
  padding-top: 120px;
  width: 100%;
  margin: 10px;
  font-size: 34px;
  font-weight: 600;
  text-align: center;
`;
const ContactContainer = styled.div`
  width: 30rem;
  height: 34rem;
  background: #ffffff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  margin: 2rem auto;
`;

const Content = styled.div`
  text-align: center;
  margin-top: 4rem;

  div {
    font-size: 18px;
    text-align: left;
    margin-bottom: 0.5rem;
  }
  span {
    font-weight: 600;
    margin: 0rem 0.4rem 0rem 2.2rem;
  }
`;

const ChatArea = styled.div`
  margin: 1.5rem auto;
  width: 25rem;
  height: 20rem;
  background-color: #fae0ae;
  border-radius: 10px;
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const MyBtn = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 16px;
  background: #ffc149;
  border: none;
  color: #212121;
  font-weight: 600;
  margin: 1rem 1rem 0rem 0rem;
  cursor: pointer;
`;

const ChatTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding-top: 0.6rem;
  margin: 1rem 0rem 0.4rem 1rem;
  text-align: center;
`;
const MyChat = styled.div`
  background-color: #ffffff;
  width: 180px;
  height: 40px;
  padding-left: 1rem;
  border-radius: 16px;
  margin-left: 0.5rem;
  text-align: left;
  line-height: 40px;
`;
const YourChat = styled.div`
  float: right;
  margin-right: 0.5rem;
  background-color: #ffffff;
  padding-right: 1rem;
  width: 180px;
  height: 40px;
  border-radius: 16px;
  margin-left: 0.5rem;
  text-align: right;
  line-height: 40px;
`;

export default ContactChat;
