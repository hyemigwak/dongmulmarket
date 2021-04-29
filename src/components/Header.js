import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Header = () => {
  return (
    <React.Fragment>
      <HeaderC>
        <WelcomeWords>홍길동님 환영합니다.</WelcomeWords>
        <Button
          onClick={() => {
            history.push("/mypage");
          }}
        >
          마이페이지
        </Button>
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
  align-items:center;
`;

const WelcomeWords = styled.p`
margin-left:20px;
`;

const Button = styled.button`
margin-left:30px;
width: 100px;
height:40px;
padding: 7px 0px 7px 0px;
border-radius: 4px;
font-size: 15px;
font-weight: 600;

border: 1px solid #DBDBDB;
cursor:pointer;
outline: none;
background-color: #0095f6;
color: white;
`;

export default Header;
