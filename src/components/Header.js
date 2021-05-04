import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const cookie = getCookie("user_login") ? true : false;

  const siteLogout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      console.log("카카오 인증 엑세스 토큰 존재", window.Kakao.Auth.getAccessToken());
      window.Kakao.Auth.logout(() => {
        console.log("카카오 로그아웃 완료", window.Kakao.Auth.getAccessToken());
      });
    }
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      dispatch(userActions.logOut());
      history.replace("/");
    } else {
      console.log("로그인 유지");
    }
  };

  if (cookie && is_login) {
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
            <Button onClick={siteLogout}>로그아웃</Button>
            <Button1
              onClick={() => {
                history.push("/contact");
              }}
            >
              1:1채팅
            </Button1>
            <Button1
              onClick={() => {
                history.push("/detail");
              }}
            >
              디테일
            </Button1>
            <Button1
              onClick={() => {
                history.push("/chat");
              }}
            >
              채팅
            </Button1>
          </BtnArea>
        </HeaderC>
      </React.Fragment>
    );
  } else {
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
          </WelcomeWords>
          <BtnArea>
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
          </BtnArea>
        </HeaderC>
      </React.Fragment>
    );
  }
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

const Button1 = styled(Button)`
  background-color: #eee;
`;

const BtnArea = styled.div`
  margin-right: 30px;
`;

export default Header;
