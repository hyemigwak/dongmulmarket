import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

//분기가 필요함

const Header = () => {
  return (
    <React.Fragment>
      <HeaderC>
        <WelcomeWords>
          <Button
            onClick={() => {
              history.push("/");
            }}
          >
            로고영역
          </Button>
          <span>username</span>님 환영합니다.
        </WelcomeWords>
        <BtnArea>
          <Button
            onClick={() => {
              history.push("/addproduct");
            }}
          >
            판매하기
          </Button>
          <Button
            onClick={() => {
              history.push("/mypage");
            }}
          >
            마이페이지
          </Button>
          <Button
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>
          <Button
            onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Button>
          <Button
            onClick={() => {
              history.push("/mylocation");
            }}
          >
            위치
          </Button>
        </BtnArea>
      </HeaderC>
    </React.Fragment>
  );
};

const HeaderC = styled.div`
  position: fixed;
  background-color: #eee;
  left: 0;
  top: 0;
  width: 100vw;
  height: 60px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WelcomeWords = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  span {
    font-weight: 600;
    font-size: 18px;
    margin-left: 10px;
  }
`;

const Button = styled.button`
  margin-left: 10px;
  height: 40px;
  padding: 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;

  border: 1px solid #dbdbdb;
  cursor: pointer;
  outline: none;
  background-color: #ffc149;
  color: black;
  border-radius: 20px;
`;

const BtnArea = styled.div`
  margin-right: 30px;
`;

export default Header;
