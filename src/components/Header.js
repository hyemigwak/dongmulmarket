import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";
import "./Header.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const cookie = getCookie("user_login") ? true : false;

  const siteLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      //dispatch(userActions.logOut());
      dispatch(userActions.LogOutMiddleware());
      history.replace("/");
    } else {
      console.log("로그인 유지");
    }
  };

  if (cookie && is_login) {
    return (
      <React.Fragment>
        <HeaderC>
          <WelcomeWords
            onClick={() => {
              history.push("/");
            }}
          >
            <LogoBox
              onClick={() => {
                history.push("/");
              }}
            ></LogoBox>
            <LogoText>동물마켓</LogoText>
          </WelcomeWords>
          <BtnArea>
            <HeaderCategory
              onClick={() => {
                history.push("/");
              }}
            >
              홈페이지
            </HeaderCategory>
            <HeaderCategory
              onClick={() => {
                history.push("/addproduct");
              }}
            >
              판매하기
            </HeaderCategory>
            <MypageBox
              onClick={() => {
                history.push("/mypage");
              }}
            >
              마이페이지
            </MypageBox>
            <HeaderCategory
              onClick={() => {
                history.push("/mylocation");
              }}
            >
              위치설정
            </HeaderCategory>
            <LogoutBtn onClick={siteLogout}>로그아웃</LogoutBtn>
          </BtnArea>
        </HeaderC>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <HeaderC>
          <WelcomeWords
            onClick={() => {
              history.push("/");
            }}
          >
            <LogoBox
              onClick={() => {
                history.push("/");
              }}
            ></LogoBox>
            <LogoText>동물마켓</LogoText>
          </WelcomeWords>

          <BtnArea2>
            <SignupBtn
              onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </SignupBtn>
            <LogInBtn
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </LogInBtn>
          </BtnArea2>
        </HeaderC>
      </React.Fragment>
    );
  }
};

const HeaderC = styled.div`
  position: fixed;
  background-color: #ffffff;
  left: 0;
  top: 0;
  width: 100%;
  height: 104px;
  padding: 15px 25px 10px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.04);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WelcomeWords = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  span {
    font-weight: 600;
    font-size: 18px;
    margin-left: 10px;
  }
`;

const LogoBox = styled.div`
  width: 53px;
  height: 53px;
  margin: 0 24px 1px 0;
  background-color: #c4c4c4;
`;

const LogoText = styled.div`
  width: 125px;
  height: 40px;
  margin: 8px 357px 6px 24px;
  flex-grow: 0;
  font-size: 30px;
  text-align: left;
  color: #2f2f2f;
  font-family: "Binggrae";
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const HeaderCategory = styled.div`
  width: 77px;
  margin: 0px 44px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  color: #7d7d7d;
  :hover {
    color: #373737;
  }
`;

const SignupBtn = styled(HeaderCategory)`
  margin: 0px 44px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
`;

const MypageBox = styled.div`
  width: 90px;
  margin: 0px 30px 0px 30px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  color: #7d7d7d;
  :hover {
    color: #373737;
  }
`;

const LogoutBtn = styled.div`
  width: 100px;
  padding: 5px;
  border-radius: 40px;
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 5px;
  margin-left: 20px;
  border-radius: 40px;
  background-color: #c0c0c0;
  color: #ffffff;
  font-size: 18px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: #999999;
  }
`;

const LogInBtn = styled.div`
  width: 78px;
  height: 34px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 21px;
  padding: 7px 14px 6px;
  border-radius: 56px;
  background-color: #3fbe81;

  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
  cursor: pointer;

  :hover {
    background-color: #269f65;
  }
`;

const BtnArea = styled.div`
  margin-right: 30px;
  display: flex;
  align-items: center;
`;

const BtnArea2 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  text-align: center;
`;

export default Header;
