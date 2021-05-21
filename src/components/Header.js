import React, { memo } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";
import { Container } from "../element";
import logo1 from "../image/logo1.png";

const Header = memo((props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const cookie = getCookie("user_login") ? true : false;

  const siteLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      //dispatch(userActions.logOut());
      dispatch(userActions.LogOutMiddleware());
      history.replace("/");
    }
  };

  if (cookie && is_login) {
    return (
      <React.Fragment>
        <Container>
          <HeaderC>
            <LogoBox>
              <Logo
                src={logo1}
                onClick={() => {
                  history.push("/");
                }}
              ></Logo>
              <Beta>베타서비스 1.0v</Beta>
            </LogoBox>
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
              <LogoutBtn onClick={siteLogout}>로그아웃</LogoutBtn>
            </BtnArea>
          </HeaderC>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Container>
          <HeaderC>
            <LogoBox>
              <Logo
                src={logo1}
                onClick={() => {
                  history.push("/");
                }}
              ></Logo>
            </LogoBox>
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
        </Container>
      </React.Fragment>
    );
  }
});

const HeaderC = styled.div`
  position: fixed;
  background-color: #ffffff;
  left: 0;
  top: 0;
  height: 118px;
  border: none;
  width: 100%;
  /* max-width: 1200px; */
  margin: 0 auto;
  border-bottom: 1px solid #dbdbdb;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.04);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 389px 0px 20px;

  cursor: pointer;
  span {
    font-weight: 600;
    font-size: 18px;
    margin-left: 10px;
  }
`;

const Logo = styled.img``;

const Beta = styled.div`
  font-size: 14px;
  color: #d2d2d2;
  margin-left: 10px;
  margin-top: 10px;
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
  margin: 0px 40px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
`;

const MypageBox = styled.div`
  width: 90px;
  margin: 0px 40px 0px 40px;
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
  text-align: left;
  color: #ffffff;
  cursor: pointer;

  :hover {
    background-color: #269f65;
  }
`;

const BtnArea = styled.div`
  display: flex;
  align-items: center;
  margin-right: 28px;
`;

const BtnArea2 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  text-align: center;
`;

export default Header;
