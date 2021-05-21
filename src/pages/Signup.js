import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import axios from "axios";
import { config } from "../shared/config";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [authnumber, setAuthNumber] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [emailDoubleCheck, SetEmailDoubleCheck] = useState(""); // 이메일 중복 확인
  const [emailDoubleFail, SetEmailDoubleFail] = useState(""); // 이메일 중복 확인 실패
  const [AuthCorrect, SetAuthCorrect] = useState(null); // 인증번호 일치
  const [AuthFail, SetAuthFail] = useState(""); // 인증번호 불일치
  const [show, setShow] = useState(false); //이메일 중복 아닐 때, 인증번호 창 보이게 하기
  const [validate, setValidate] = useState(false);
  const [address, setAddress] = useState("");

  const onChangeEmail = useCallback((e) => setEmail(e.target.value), []);
  const onChangeAuthnumber = useCallback(
    (e) => setAuthNumber(e.target.value),
    []
  );
  const onChangeNickname = useCallback((e) => setNickname(e.target.value), []);
  const onChangePwd = useCallback((e) => setPwd(e.target.value), []);
  const onChangepwdCheck = useCallback((e) => setPwdCheck(e.target.value), []);

  const [pwdDetail, setPwdDetail] = useState(false);

  //ref 걸어서 focus 이벤트 주기
  const _email = useRef();
  const _authnum = useRef();
  const _nickname = useRef();
  const _pwd = useRef();
  const _pwdchk = useRef();

  //이메일, 비밀번호 정규표현식
  const email_regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const password_regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,14}$/;

  const GetAuthNumAPI = (email) => {
    const API = `${config.api}/account/mail`;
    axios
      .post(API, {
        email: email,
      })
      .then((res) => {
        if (res.data.statusCode === 201) {
          window.alert("사용가능한 ID입니다");
          setShow(true);
          SetEmailDoubleCheck("사용 가능한 이메일입니다");
          SetEmailDoubleFail("");
        } else {
          SetEmailDoubleFail("이미 존재하는 ID입니다!");
          SetEmailDoubleCheck("");
        }
        if (email === "") {
          window.alert("이메일을 입력해주세요!");
          _email.current.focus();
          return;
        }
        if (!email_regExp.test(email)) {
          window.alert("이메일 형식이 맞지 않습니다!");
          _email.current.focus();
          return;
        }
      })
      .catch((err) => {
        console.log("GetAuthNumAPI에서 오류", err);
      });
  };

  const EmailValidationAPI = (email, authnumber) => {
    const AUTH_API = `${config.api}/account/mail/check`;
    axios
      .post(AUTH_API, {
        email: email,
        authchkNum: Number(authnumber),
      })
      .then((res) => {
        if (res.data.msg === "success") {
          SetAuthCorrect("인증번호가 일치합니다");
          SetAuthFail("");
          setShow(true);
          setValidate(true);
        } else {
          SetAuthCorrect("");
          SetAuthFail("인증번호가 불일치합니다");
          return;
        }
      })
      .catch((err) => {
        console.log("EmailValidationAPI에서 오류", err);
      });
  };

  const onSiteSignup = () => {
    //하나라도 공란일경우
    if (
      email === "" ||
      nickname === "" ||
      pwd === "" ||
      pwdCheck === "" ||
      authnumber === ""
    ) {
      window.alert("모두 입력해주세요");
      return;
    }
    //비밀번호 서로 다를경우
    if (pwd !== pwdCheck) {
      window.alert("비밀번호가 일치하지 않습니다.");
      _pwdchk.current.focus();
      return;
    }
    //이메일 형식 틀릴경우
    if (!email_regExp.test(email)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      _email.current.focus();
      return;
    }
    //비밀번호 형식 틀릴경우
    if (!password_regExp.test(pwd)) {
      window.alert("비밀번호는 영문/숫자 혼합으로 8~14자리로 입력해주세요!");
      _pwd.current.focus();
      return;
    }
    if (!validate) {
      window.alert("이메일 인증이 되지 않았습니다");
      return;
    }
    dispatch(userActions.signupAPI(email, nickname, pwd, address));
  };

  return (
    <React.Fragment>
      <SignUpLogin>
        <TitleArea>
          <Title>회원가입</Title>
          <div className="require">
            반드시 모든 내용을 입력하신 후 가입하기를 눌러주세요
          </div>
        </TitleArea>
        <SignUpC>
          <InputC>
            <EmailArea>
              <InputInfo>이메일</InputInfo>
              <Input
                type="text"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={onChangeEmail}
                ref={_email}
              />
              <CertiBtn
                onClick={() => {
                  GetAuthNumAPI(email);
                }}
                tabIndex="0"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    GetAuthNumAPI(email);
                  }
                }}
              >
                인증하기
              </CertiBtn>
            </EmailArea>
            <p className="availableEmail">{emailDoubleCheck}</p>
            <p className="availableFail">{emailDoubleFail}</p>

            {show && (
              <>
                <EmailArea>
                  <InputInfo>인증번호</InputInfo>
                  <Input
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                    value={authnumber}
                    onChange={onChangeAuthnumber}
                    ref={_authnum}
                  />
                  <VerifyNum
                    onClick={() => {
                      EmailValidationAPI(email, authnumber);
                    }}
                    tabIndex="0"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        EmailValidationAPI(email, authnumber);
                      }
                    }}
                  >
                    인증번호 확인
                  </VerifyNum>
                </EmailArea>
                <p className="availableEmail">{AuthCorrect}</p>
                <p className="availableFail">{AuthFail}</p>
              </>
            )}
            <InfoArea>
              <InputInfo>닉네임</InputInfo>
              <Input
                type="text"
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={onChangeNickname}
                ref={_nickname}
              />
            </InfoArea>
            <InfoArea>
              <InputInfo>비밀번호</InputInfo>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={pwd}
                onChange={onChangePwd}
                ref={_pwd}
                onFocus={() => setPwdDetail(true)}
              />
            </InfoArea>
            <PasswordDetail Open={pwdDetail}>
              비밀번호는 8~14자리의 영문/숫자 혼합입니다.
            </PasswordDetail>
            <InfoArea>
              <InputInfo>비밀번호 확인</InputInfo>
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                value={pwdCheck}
                onChange={onChangepwdCheck}
                ref={_pwdchk}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSiteSignup();
                  }
                }}
              />
            </InfoArea>
          </InputC>
          <SignInBtn
            mybtn
            onClick={onSiteSignup}
            tabIndex="0"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSiteSignup();
              }
            }}
          >
            가입하기
          </SignInBtn>
        </SignUpC>
      </SignUpLogin>
    </React.Fragment>
  );
};

const SignUpLogin = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 40px;
  margin-bottom: 180px;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const TitleArea = styled.div`
  width: 360px;
  margin: 140px auto 14px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;

  .require {
    width: 360px;
    height: 16px;
    flex-grow: 0;
    margin: 14px auto 0px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #5f5f5f;
  }
`;

const Title = styled.div`
  width: 360px;
  height: 42px;
  flex-grow: 0;
  font-family: Roboto;
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #2f2f2f;
`;

const SignUpC = styled.div`
  width: 500px;
  height: 500px;
  margin: auto;
  margin-top: 40px;
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

const InputInfo = styled.div`
  width: 120px;
  margin: 0px 100px 0px 225px;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #2f2f2f;
`;

const InputC = styled.div`
  display: inline-block;

  .availableEmail {
    margin: 5px 100px 10px 455px;
    text-align: center;
    font-size: 14px;
    text-align: left;
    color: #3fbe81;
  }
  .availableFail {
    margin: 5px 100px 10px 455px;
    text-align: center;
    font-size: 14px;
    text-align: left;
    color: red;
  }
`;

const Input = styled.input`
  width: 359px;
  height: 56px;
  margin: 0px 31px 0px 0px;
  padding: 17.6px 80px 11.6px 16px;
  border-radius: 8px;
  border: solid 2px #d2d2d2;
  ::placeholder {
    font-family: Roboto;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #b5b5b5;
  }
  .focus {
    border: solid 2px #e72a2a;
  }
  :focus {
    border: solid 2px #6fcea1;
    outline: none;
  }
`;

const PasswordDetail = styled.div`
  display: ${(props) => (props.Open ? "inline-block" : "none")};
  font-size: 14px;
  color: #d6d6d6;
  margin: 0 auto;
  padding-top: 0.4rem;
  width: 359px;
  position: relative;
  left: 450px;
`;

const CertiBtn = styled.div`
  width: 105px;
  height: 50px;
  flex-grow: 0;
  margin: 0px 285px 0px 31px;
  padding: 12px 16px;
  border-radius: 8px;
  border: solid 2px #6fcea1;

  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #6fcea1;

  cursor: pointer;

  :hover {
    background-color: #3fbe81;
    color: #ffffff;
  }
`;

const VerifyNum = styled.div`
  width: 110px;
  height: 24px;
  margin: 0px 285px 0px 31px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #2f2f2f;
  text-decoration: underline;
  cursor: pointer;
`;

const InfoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 26px 0px 0px -420px;
`;

const SignInBtn = styled.div`
  width: 165px;
  height: 50px;
  flex-grow: 0;
  margin: 70px 130px 200px 172px;
  padding: 14px 45px;
  border-radius: 8px;
  background-color: #d6d6d6;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.33;
  text-align: left;
  color: #ffffff;

  cursor: pointer;

  :hover {
    background-color: #3fbe81;
  }
`;

export default Signup;
