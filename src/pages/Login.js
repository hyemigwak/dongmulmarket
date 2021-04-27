import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const onChangeEmail = useCallback((e) => setEmail(e.target.value), []);
  const onChangePwd = useCallback((e) => setPwd(e.target.value), []);

  //일반 로그인
  const onSiteLogin = () => {
    if (email === "" || pwd === "") {
      window.alert("이메일과 비밀번호를 모두 입력해주세요!");
      return;
    }
    dispatch(userActions.loginAPI(email, pwd));
  };

  //카카오로그인
  const kakaoLoginSuccess = (res) => {
    const data = res.response;
    dispatch(
      userActions.kakaoLoginAPI({
        kakaoToken: data.access_token,
      })
    );
  };

  return (
    <div>
      <LoginArea>
        <div>
          <Input type="text" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeEmail} />
        </div>
        <div>
          <Input type="password" placeholder="비밀번호를 입력해주세요" value={pwd} onChange={onChangePwd} />
        </div>
        <div>
          <input type="checkbox" />
          <span>자동로그인</span>
        </div>
        <BtnArea>
          <button onClick={onSiteLogin}>로그인</button>
          <KaKaoLogin
            jskey={"09084d41809de830907a0b9a981ecf21"}
            onSuccess={kakaoLoginSuccess}
            onFailure={(result) => console.log(result)}
            buttonText="kakao"
            render={(props) => <button onClick={props.onClick}>kakao</button>}
          ></KaKaoLogin>
        </BtnArea>
        <button
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </button>
        <button
          onClick={() => {
            history.push("/findpwd");
          }}
        >
          비밀번호 찾기
        </button>
      </LoginArea>
    </div>
  );
};

const LoginArea = styled.div`
  width: 30rem;
  margin: 15% auto;
  background-color: #efefef;
  border-radius: 10px;
  text-align: center;
  display: block;
`;
const BtnArea = styled.div`
  display: block;
`;
const Input = styled.input`
  width: 70%;
  height: 1.5rem;
  margin: 0.4rem 0rem;
`;

export default Login;
