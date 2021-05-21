import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

import lock from "../image/lock.png";

const PwdChange = (props) => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdChk, setNewPwdChk] = useState("");
  const onChangePwd = useCallback((e) => setPwd(e.target.value), []);
  const onChangeNewPwd = useCallback((e) => setNewPwd(e.target.value), []);
  const onChangeNewPwdChk = useCallback(
    (e) => setNewPwdChk(e.target.value),
    []
  );

  const password_regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,14}$/;

  const sitepwdChange = () => {
    if (pwd === "" || newPwd === "" || newPwdChk === "") {
      window.alert("모두 입력해주세요");
      return;
    }
    if (!password_regExp.test(newPwd, newPwdChk)) {
      window.alert("비밀번호는 영문/숫자 혼합으로 8~14자리로 입력해주세요!");
      return;
    }
    if (newPwd !== newPwdChk) {
      window.alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    //디스패치(새 비밀번호 보내주기)
    dispatch(userActions.ChangePwdAPI(email, pwd, newPwd));
  };

  return (
    <React.Fragment>
      <WrapFindPwd>
        <TopArea>
          <img src={lock} alt="자물쇠 이미지" />
          <Title>비밀번호 변경</Title>
          <SubTitle>변경하실 비밀번호를 입력해주세요</SubTitle>
        </TopArea>
        <FindPwdC>
          <Input
            type="text"
            placeholder="인증번호를 입력해주세요"
            value={pwd}
            onChange={onChangePwd}
          />
          <Input
            type="password"
            placeholder="새 비밀번호를 입력해주세요"
            value={newPwd}
            onChange={onChangeNewPwd}
          />
          <Input
            type="password"
            placeholder="새 비밀번호를 한번 더 입력해주세요"
            value={newPwdChk}
            onChange={onChangeNewPwdChk}
          />
          <FindpwdBtn onClick={sitepwdChange}>변경 완료</FindpwdBtn>
        </FindPwdC>
      </WrapFindPwd>
    </React.Fragment>
  );
};

const WrapFindPwd = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const TopArea = styled.div`
  width: 359px;
  margin: 100px auto 30px;
  text-align: center;
  img {
    width: 110px;
    height: 100px;
  }
`;
const Title = styled.div`
  width: 359px;
  height: 24px;
  flex-grow: 0;
  margin: 50px auto 24px;
  font-size: 36px;
  font-weight: bold;
  line-height: 0.67;
  letter-spacing: normal;
  color: #2f2f2f;
`;

const SubTitle = styled.div`
  width: 359px;
  height: 16px;
  flex-grow: 0;
  margin: 24px 9px 0 10px;
  font-size: 14px;
  color: #5f5f5f;
`;

const FindPwdC = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 359px;
  height: 56px;
  margin: 10px auto 18px;
  padding: 12px 20px;
  border-radius: 8px;
  border: solid 2px #d2d2d2;
  ::placeholder {
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #b5b5b5;
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

  font-family: Roboto;
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
`;

export default PwdChange;
