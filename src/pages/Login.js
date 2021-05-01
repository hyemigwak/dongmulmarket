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
      <React.Fragment>
        <WrapLogin>
          <Title>로그인</Title>
          <LoginC>
            <InputC>
              <Input type="text" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeEmail} />
              <Input type="password" placeholder="비밀번호를 입력해주세요" value={pwd} onChange={onChangePwd} />
            </InputC>
            <AutoLoginC>
              <input type="checkbox" />
              <span>자동로그인</span>
            </AutoLoginC>

            <LoginBtn onClick={onSiteLogin}>로그인</LoginBtn>
            <KaKaoLogin
              jskey={"09084d41809de830907a0b9a981ecf21"}
              onSuccess={kakaoLoginSuccess}
              onFailure={(result) => console.log(result)}
              buttonText="kakao"
              render={(props) => <KakaoBtn onClick={props.onClick}>kakao</KakaoBtn>}
            ></KaKaoLogin>
            <SignPwdC>
              <SignInBtn
                onClick={() => {
                  history.push("/signup");
                }}
              >
                회원가입
              </SignInBtn>
              <SignInBtn
                onClick={() => {
                  history.push("/findpwd");
                }}
              >
                비밀번호 찾기
              </SignInBtn>
            </SignPwdC>
          </LoginC>
        </WrapLogin>
      </React.Fragment>
    </div>
  );
};

// C => Container
const WrapLogin = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 60px;
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

const LoginC = styled.div`
  width: 500px;
  height: 420px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  border-radius: 30px;
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
  margin: 0.8rem 0rem;
`;

const AutoLoginC = styled.div`
  margin-bottom: 10px;
  span {
    margin-left: 5px;
  }
`;

const LoginBtn = styled.button`
  width: 150px;
  padding: 7px 0px 7px 8px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  border: 1px solid #dbdbdb;
  cursor: pointer;
  outline: none;
  background-color: #0095f6;
  color: white;
`;

const KakaoBtn = styled.button`
  width: 150px;
  padding: 7px 0px 7px 8px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  border: 1px solid #dbdbdb;
  cursor: pointer;
  outline: none;
  background-color: rgba(255, 238, 51, 0.99);
  color: black;
`;

const SignPwdC = styled.div`
  display: flex;
  margin-top: 15px;
`;

const SignInBtn = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 16px;
  background: #ffc149;
  border: none;
  color: white;
  font-weight: 600;
  margin: 1rem 1rem 0rem 0rem;
`;

export default Login;
