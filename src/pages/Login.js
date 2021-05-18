import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";
import GoogleLogin from "react-google-login";
import kakao from "../image/kakao.png";
import googleLogo from "../image/google_logo.png";
import { ClickAwayListener } from "@material-ui/core";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const onChangeEmail = useCallback((e) => setEmail(e.target.value), []);
  const onChangePwd = useCallback((e) => setPwd(e.target.value), []);

  //일반 로그인
  const onSiteLogin = useCallback(() => {
    if (email === "" || pwd === "") {
      window.alert("이메일과 비밀번호를 모두 입력해주세요!");
      return;
    }
    dispatch(userActions.loginAPI(email, pwd));
  }, [dispatch, pwd, email]);

  //카카오로그인
  const kakaoLoginSuccess = (res) => {
    console.log(res);
    console.log(res.profile.properties.nickname);
    console.log(res.profile.kakao_account.email);

    dispatch(userActions.kakaoLoginAPI(res));
  };

  //구글로그인 실패
  const responseGoogle = (response) => {
    console.log("구글로그인 실패", response);
  };

  //구글로그인 성공
  const GoogleLoginSuccess = (response) => {
    console.log(response);
    console.log(response.profileObj.name);
    console.log(response.profileObj.givenName);
    dispatch(userActions.GoogleLoginAPI(response));
  };

  return (
    <div>
      <React.Fragment>
        <WrapLogin>
          <TitleArea>
            <Title>로그인</Title>
          </TitleArea>
          <LoginC>
            <InputC>
              <Input
                type="text"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={onChangeEmail}
                tabIndex="1"
              />
              <Input2
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={pwd}
                onChange={onChangePwd}
                tabIndex="2"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSiteLogin();
                  }
                }}
              />
            </InputC>
            <AutoLoginC>
              {/* <Autologin>
                <input type="checkbox" />
                <span>자동로그인</span>
              </Autologin> */}
              <div
                className="findPwd"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    history.push("/findpwd");
                  }
                }}
                onClick={() => {
                  history.push("/findpwd");
                }}
                tabIndex="3"
              >
                비밀번호를 잊으셨나요?
              </div>
            </AutoLoginC>

            <LoginBtn tabIndex="4" onClick={onSiteLogin}>
              로그인
            </LoginBtn>
            <SignInArea>
              <span>신규 사용자이신가요?</span>{" "}
              <div
                className="makeaccount"
                onClick={() => {
                  history.push("/signup");
                }}
                tabIndex="5"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    history.push("/signup");
                  }
                }}
              >
                계정 만들기
              </div>
            </SignInArea>
            <OrLine>
              <div></div>
              <span>또는</span>
              <div></div>
            </OrLine>
            <SocialBtnArea>
              <div tabIndex="6">
                <KaKaoLogin
                  token={"dbf3a7f227849392ad80f6426c8d9526"}
                  onSuccess={kakaoLoginSuccess}
                  onFailure={(result) => console.log(result)}
                  buttonText="kakao"
                  render={(props) => (
                    <KakaoBtn onClick={props.onClick}>
                      <img src={kakao} alt="카톡" />
                      카카오톡으로 계속
                    </KakaoBtn>
                  )}
                ></KaKaoLogin>
              </div>
              <div tabIndex="7">
                <GoogleLogin
                  clientId="797391183659-j67nu7drmq094hs3ghtfpjmsh25dah67.apps.googleusercontent.com"
                  buttonText="Google"
                  onSuccess={GoogleLoginSuccess}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  render={(props) => (
                    <GoogleBtn
                      onClick={props.onClick}
                      disabled={props.disabled}
                    >
                      <div>
                        <img src={googleLogo} alt="구글로고" />
                        Google로 계속
                      </div>
                    </GoogleBtn>
                  )}
                />
              </div>
            </SocialBtnArea>
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
  margin-bottom: 180px;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const TitleArea = styled.div`
  width: 110px;
  height: 24px;
  margin: 110px auto 60px;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.67;
  font-stretch: normal;
  font-style: normal;
  color: #2f2f2f;
`;

const LoginC = styled.div`
  width: 500px;
  height: 480px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  border-radius: 30px;
`;

const InputC = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 20px;
  align-items: center;
`;

const Input = styled.input`
  width: 359px;
  height: 56px;
  margin: 0px 421px 16px 420px;
  padding: 17.6px 155px 11.6px 16px;
  border-radius: 8px;
  border: solid 2px #d2d2d2;
  :focus {
    border: solid 2px #6fcea1;
    outline: none;
  }
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

const Input2 = styled.input`
  width: 359px;
  height: 56px;
  margin: 16px 421px 14px 420px;
  padding: 17.6px 135px 11.6px 16px;
  border-radius: 8px;
  border: solid 2px #d2d2d2;
  :focus {
    border: solid 2px #6fcea1;
    outline: none;
  }
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

const AutoLoginC = styled.div`
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  input {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    border: solid 2px #5f5f5f;
    background: #3fbe81;
  }
  .findPwd {
    width: 155px;
    height: 16px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #5f5f5f;
    cursor: pointer;

    :hover {
      font-weight: bold;
      color: #212121;
    }
  }
`;

// const Autologin = styled.div`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   span {
//     width: 70px;
//     height: 16px;
//     flex-grow: 0;
//     margin: 4px 0 4px 8px;
//     font-size: 14px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: normal;
//     letter-spacing: normal;
//     text-align: left;
//     color: #5f5f5f;
//   }
// `;

const LoginBtn = styled.div`
  width: 359px;
  height: 50px;
  flex-grow: 0;
  margin: 34px 421px 14px 420px;
  padding: 13px 150px 13px 154px;
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
`;

const SignInArea = styled.div`
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  .makeaccount {
    margin: 0 10px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #3fbe81;
    cursor: pointer;
    :hover {
      font-weight: bold;
    }
  }
`;

const OrLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 10px;
  div {
    width: 156px;
    height: 1px;
    flex-grow: 0;
    margin: 11.5px 0px 11.5px 0;
    background-color: #d2d2d2;
  }
  span {
    margin: 0 10px;
  }
`;

const SocialBtnArea = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KakaoBtn = styled.div`
  width: 166px;
  height: 50px;
  flex-grow: 0;
  padding: 15px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #f6e24b;
  margin-top: 14px;

  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: left;
  color: #000000;

  cursor: pointer;
  outline: none;

  img {
    width: 18.7px;
    height: 17.2px;
    margin: 3px 7px 3.8px 0;
    vertical-align: middle;
  }
`;

const GoogleBtn = styled.div`
  width: 166px;
  height: 50px;
  flex-grow: 0;
  padding: 13px 15px;
  border-radius: 8px;
  border: solid 1px #d2d2d2;
  box-sizing: border-box;
  margin-top: 14px;

  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  cursor: pointer;

  div {
    display: flex;
    justify-content: center;
  }
  img {
    width: 18.7px;
    height: 17.2px;
    margin: 3px 7px 0px 0px;
  }
`;

export default Login;
