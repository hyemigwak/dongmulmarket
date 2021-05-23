import React, { useState, useRef, useEffect, memo } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";
import { Container } from "../element";
import logo1 from "../image/logo1.png";
import Swal from "sweetalert2";
import { NavBar } from "./index";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@material-ui/icons/Menu";
import xbtn from "../image/xbtn.png";

const Header = memo((props) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const cookie = getCookie("user_login") ? true : false;

  const siteLogout = () => {
    if (navOpen) {
      close();
    }
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3fbe81",
      cancelButtonColor: "#d6d6d6",
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userActions.LogOutMiddleware());
        history.replace("/");
        Swal.fire({
          title: "로그아웃 되셨습니다.",
          confirmButtonColor: "#3fbe81",
          confirmButtonText: "확인",
        });
      }
    });
  };

  //모바일 헤더 열고 닫기
  const [navOpen, setnavOpen] = useState(false);
  const open = () => setnavOpen(true);
  const close = () => setnavOpen(false);

  const modal = useRef();

  const handleClickOutside = ({ target }) => {
    if (navOpen && !modal.current.contains(target)) setnavOpen(false);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (cookie && is_login) {
    return (
      <>
        {isMobile ? (
          <React.Fragment>
            <Hamburger>
              <MenuIcon style={{ width: "40px", height: "40px", marginLeft: "20px", cursor: "pointer" }} onClick={open} />
              <LogoBox>
                <Logo
                  src={logo1}
                  onClick={() => {
                    history.replace("/");
                  }}
                ></Logo>
                <Beta>베타서비스</Beta>
              </LogoBox>
            </Hamburger>
            <NavBar1 open={navOpen} close={close} ref={modal} toggle={navOpen}>
              <HamburgerModal>
                <Graybar />
                <HeaderArea>
                  <ImgArea>
                    <img src={xbtn} alt="x버튼" onClick={close} />
                  </ImgArea>
                  <TextArea>
                    <Hi>안녕하세요</Hi>
                    <Dongmul>
                      <span>동물마켓</span>입니다 :)
                    </Dongmul>
                  </TextArea>
                  <CateArea>
                    <MoveTo
                      onClick={() => {
                        history.push("/");
                        close();
                      }}
                    >
                      홈페이지
                    </MoveTo>
                    <MoveTo
                      onClick={() => {
                        history.push("/addproduct");
                        close();
                      }}
                    >
                      판매하기
                    </MoveTo>
                    <MoveTo
                      onClick={() => {
                        history.push("/mypage");
                        close();
                      }}
                    >
                      마이페이지
                    </MoveTo>
                    <MoveTo onClick={siteLogout}>로그아웃</MoveTo>
                  </CateArea>
                </HeaderArea>
              </HamburgerModal>
            </NavBar1>
          </React.Fragment>
        ) : (
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
                  <Beta>베타서비스</Beta>
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
        )}
      </>
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
              <Beta>베타서비스</Beta>
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
  margin: 0 auto;
  border-bottom: 1px solid #dbdbdb;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.04);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 767px) {
    height: 104px;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  position: fixed;
  background-color: #ffffff;
  left: 0;
  top: 0;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #dbdbdb;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  z-index: 2000;
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

  @media (max-width: 767px) {
    margin-right: 8px;
    margin-left: 8px;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    margin: 0px 200px 0px 20px;
  }
`;

const Logo = styled.img`
  margin-left: 20px;

  @media (max-width: 767px) {
    width: 60%;
    margin-left: 5px;
  }
`;

const Beta = styled.div`
  font-size: 13px;
  color: #d2d2d2;
  margin-left: 10px;
  margin-top: 10px;

  @media (max-width: 767px) {
    font-size: 7px;
    margin-left: 6px;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    width: 80px;
  }
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
  @media (max-width: 767px) {
    margin: 7px 10px 6px 0;
    font-size: 14px;
  }
`;

const SignupBtn = styled(HeaderCategory)`
  margin: 0px 40px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;

  @media (max-width: 767px) {
    margin: 7px 4px 6px 0;
    font-size: 12px;
  }
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
  @media (max-width: 767px) {
    margin: 7px 24px 6px 0;
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
  @media (max-width: 767px) {
    margin: 7px 15px 6px 0;
    font-size: 14px;
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

  @media (max-width: 767px) {
    font-size: 12px;
    height: 30px;
    width: 58px;
    padding: 5px 6px 5px;
  }
`;

const BtnArea = styled.div`
  display: flex;
  align-items: center;
  margin-right: 28px;

  @media (max-width: 767px) {
    margin-right: 8px;
  }
`;

const BtnArea2 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  text-align: center;

  @media (max-width: 767px) {
    margin-right: 6px;
  }
`;

const NavBar1 = styled.div`
  display: ${(props) => (props.toggle ? "flex" : "none")};
`;

const HamburgerModal = styled.div`
  width: 320px;
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
`;

const Graybar = styled.div`
  width: 53px;
  height: 740px;
  background-color: rgba(0, 0, 0, 0.65);
`;

const HeaderArea = styled.div`
  width: 267px;
  background-color: #ffffff;
`;
const TextArea = styled.div`
  margin: 40px 22px 50px 24px;
`;

const Hi = styled.div`
  font-size: 24px;
  line-height: 1.33;
  text-align: left;
  color: #4c4c4c;
`;

const Dongmul = styled.div`
  font-size: 24px;
  line-height: 1.33;
  text-align: left;
  color: #4c4c4c;

  span {
    color: #3fbe81;
    font-weight: 600;
  }
`;

const ImgArea = styled.div`
  img {
    cursor: pointer;
    position: relative;
    left: 225px;
    top: 60px;
  }
`;

const CateArea = styled.div`
  margin: 0px 115px 0 0;
`;

const MoveTo = styled.div`
  margin: 32px 16px 32px 24px;
  font-size: 18px;
  text-align: left;
  color: #7d7d7d;
  cursor: pointer;
  :hover {
    font-weight: 600;
    font-size: 19px;
  }
`;

export default Header;
