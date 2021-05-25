import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import lock from "../image/lock.png";
import Swal from "sweetalert2";

const Findpwd = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const onChageEmail = useCallback((e) => setEmail(e.target.value), []);

  //이메일 정규표현식
  const email_regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const onSiteFindPwd = () => {
    if (email === "") {
      Swal.fire({
        title: "이메일을 써주세요!",
        confirmButtonColor: "#d6d6d6",
        confirmButtonText: "확인",
      });
      return;
    }
    if (!email_regExp.test(email)) {
      Swal.fire({
        title: "이메일이 맞지 않습니다",
        confirmButtonColor: "#d6d6d6",
        confirmButtonText: "확인",
      });
      return;
    }
    dispatch(userActions.FindPwdAPI(email));
  };

  return (
    <React.Fragment>
      <WrapFindPwd>
        <TopArea>
          <img src={lock} alt="자물쇠 이미지" />
          <Title>비밀번호를 잊으셨나요?</Title>
          <SubTitle>비밀번호를 초기화시키기 위해서 이메일 주소가 필요합니다</SubTitle>
        </TopArea>
        <FindPwdC>
          <Input type="text" placeholder="이메일을 입력해주세요" value={email} onChange={onChageEmail} />
          <FindpwdBtn onClick={onSiteFindPwd}>입력완료</FindpwdBtn>
        </FindPwdC>
        <SignInArea>
          <span>신규 사용자이신가요?</span>{" "}
          <div
            className="makeaccount"
            onClick={() => {
              history.push("/signup");
            }}
          >
            계정 만들기
          </div>
        </SignInArea>
      </WrapFindPwd>
    </React.Fragment>
  );
};

const WrapFindPwd = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */

  @media (max-width: 767px) {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    width: 100%;
  }
`;

const TopArea = styled.div`
  margin: 100px auto 0px;
  text-align: center;
  img {
    width: 110px;
    height: 100px;
  }

  @media (max-width: 767px) {
    width: 310px;
    margin: auto;
  }
`;
const Title = styled.div`
  width: 390px;
  height: 24px;
  flex-grow: 0;
  margin: 50px auto 24px;
  font-size: 36px;
  font-weight: bold;
  line-height: 0.67;
  text-align: left;
  color: #2f2f2f;

  @media (max-width: 767px) {
    width: 100%;
    font-size: 28px;
  }
`;

const SubTitle = styled.div`
  width: 390px;
  height: 16px;
  flex-grow: 0;
  margin: 24px 9px 0 10px;
  font-size: 14px;
  text-align: left;
  color: #5f5f5f;

  @media (max-width: 767px) {
    width: 100%;
    font-size: 12px;
  }
`;

const FindPwdC = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767px) {
    width: 100%;
    margin: auto;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
  }
`;

const Input = styled.input`
  width: 359px;
  height: 56px;
  margin: 70px 421px 16px 420px;
  padding: 17.6px 135px 14.4px 16px;
  border-radius: 8px;
  border: solid 2px #d2d2d2;
  ::placeholder {
    font-size: 18px;
    line-height: 1.33;
    text-align: left;
    color: #b5b5b5;

    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  @media (max-width: 767px) {
    width: 300px;
    margin: 50px auto 16px;
  }
`;

const FindpwdBtn = styled.div`
  width: 359px;
  height: 50px;
  flex-grow: 0;
  margin: 16px 421px 50px 420px;
  padding: 14px 140px;
  border-radius: 8px;
  background-color: #d6d6d6;

  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;

  cursor: pointer;

  :hover {
    background-color: #3fbe81;
  }

  @media (max-width: 767px) {
    width: 300px;
    margin: 20px auto 20px;
    font-size: 14px;
    padding: 15px 120px;
  }
`;

const SignInArea = styled.div`
  width: 360px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .makeaccount {
    margin: 0 10px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #3fbe81;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    width: 100%;
    margin: 40px auto;
  }
`;

export default Findpwd;
