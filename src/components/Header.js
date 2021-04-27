import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Header = () => {
  return (
    <React.Fragment>
      <HeaderContainer>
        <WelcomeWords>홍길동님 환영합니다.</WelcomeWords>
        <Button
          onClick={() => {
            history.push("/mypage");
          }}
        >
          마이페이지
        </Button>
      </HeaderContainer>
    </React.Fragment>
  );
};

const HeaderContainer = styled.div`
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
`;

const WelcomeWords = styled.p``;

const Button = styled.button``;

export default Header;
