import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

const Signup = (props) => {
  const dispatch = useDispatch();
  const user_exist = useSelector((state) => state.user.is_exist);
  const is_email_validate = useSelector((state) => state.user.is_email_validate);
  const my_location = useSelector((state) => state.map.address);
  console.log(my_location);

  const [email, setEmail] = useState("");
  const [authnumber, setAuthNumber] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [emailDoubleCheck, SetEmailDoubleCheck] = useState(""); // 이메일 중복 확인
  const [show, setShow] = useState(false); //이메일 중복 아닐 때, 인증번호 창 보이게 하기

  const onChangeEmail = useCallback((e) => setEmail(e.target.value), []);
  const onChangeAuthnumber = useCallback((e) => setAuthNumber(e.target.value), []);
  const onChangeNickname = useCallback((e) => setNickname(e.target.value), []);
  const onChangePwd = useCallback((e) => setPwd(e.target.value), []);
  const onChangepwdCheck = useCallback((e) => setPwdCheck(e.target.value), []);

  //이메일, 비밀번호 정규표현식
  const email_regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const password_regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,14}$/;

  // 이메일 중복체크
  const emailCheck = () => {
    dispatch(userActions.EmailCheckAPI(email));
    if (email === "") {
      window.alert("이메일을 입력해주세요!");
      return;
    }
    if (!email_regExp.test(email)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    if (!user_exist) {
      window.alert("이미 존재하는 ID입니다!");
      return;
    } else {
      dispatch(userActions.EmailValidationAPI(email));
      SetEmailDoubleCheck("사용 가능한 ID입니다");
      setShow(true);
    }
  };

  const onSiteSignup = () => {
    //하나라도 공란일경우
    if (email === "" || nickname === "" || pwd === "" || pwdCheck === "" || authnumber === "") {
      window.alert("모두 입력해주세요");
      return;
    }
    //비밀번호 서로 다를경우
    if (pwd !== pwdCheck) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    //이메일 형식 틀릴경우
    if (!email_regExp.test(email)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    //비밀번호 형식 틀릴경우
    if (!password_regExp.test(pwd)) {
      window.alert("비밀번호는 영문/숫자 혼합으로 8~14자리로 입력해주세요!");
      return;
    }
    if (!is_email_validate) {
      window.alert("이메일 인증이 되지 않았습니다");
      return;
    }
    dispatch(userActions.signupAPI(email, nickname, pwd, authnumber));
  };

  return (
    <React.Fragment>
      <SignUpLogin>
        <Title>회원가입</Title>
        <SignUpC>
          <InputC>
            <EmailArea>
              <Input style={{ marginRight: "10px" }} type="text" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeEmail} />
              <div>{emailDoubleCheck}</div>
              <CertiBtn onClick={emailCheck}>인증</CertiBtn>
            </EmailArea>
            {show && <Input type="text" placeholder="인증번호를 입력해주세요" value={authnumber} onChange={onChangeAuthnumber} />}
            <Input type="text" placeholder="닉네임을 입력해주세요" value={nickname} onChange={onChangeNickname} />
            <Input type="password" placeholder="비밀번호를 입력해주세요" value={pwd} onChange={onChangePwd} />
            <Input type="password" placeholder="비밀번호를 다시 입력해주세요" value={pwdCheck} onChange={onChangepwdCheck} />
          </InputC>
          <SignInBtn onClick={onSiteSignup}>회원가입</SignInBtn>
        </SignUpC>
      </SignUpLogin>
    </React.Fragment>
  );
};

const SignUpLogin = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const Title = styled.div`
  padding-top: 40px;
  width: 100%;
  margin: 10px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;

const SignUpC = styled.div`
  width: 500px;
  height: 380px;
  margin: auto;
  margin-top: 40px;
  background: #ffffff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  border-radius: 30px;
`;

const EmailArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputC = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 15px;
  margin-bottom: 20px;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 2.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  border-radius: 7px;
  margin: 0.6rem 0rem;
`;

const CertiBtn = styled.button`
  width: 50px;
  height: 40px;
  border-radius: 16px;
  background: #ffc149;
  border: none;
  color: white;
  font-weight: 600;
  margin: 1rem 1rem 0rem 0rem;
  cursor: pointer;
`;

const SignInBtn = styled.button`
  width: 120px;
  height: 40px;
  padding: 8px;
  border-radius: 16px;
  background: #ffc149;
  border: none;
  color: white;
  font-weight: 600;
  margin: 1rem 1rem 0rem 0rem;
  cursor: pointer;
`;

export default Signup;
