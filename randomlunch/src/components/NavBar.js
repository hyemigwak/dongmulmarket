import React from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import xbtn from "../image/xbtn.png";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";

const NavBar = (props) => {
  const { open, close } = props;
  const dispatch = useDispatch();

  const siteLogout = () => {
    close();
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
        window.location.reload();
        Swal.fire({
          text: "로그아웃 되셨습니다.",
          confirmButtonColor: "#3fbe81",
          confirmButtonText: "확인",
        });
      }
    });
  };

  return (
    <>
      {open ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : null}
    </>
  );
};

const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const LeftToRight = keyframes`
  0% {
    margin-left: -500px;
  }
  100% {
    margin-left: 0%;
  }
`;

const HamburgerModal = styled.div`
  width: 320px;
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  animation: ${boxFade} 0.4s;
  animation: ${LeftToRight} 0.3s;
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

export default NavBar;
