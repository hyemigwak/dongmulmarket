import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { config } from "../../shared/config";
import GoogleLogin from "react-google-login";

//actions
const LOG_IN = "LOG_IN"; //로그인
const LOG_OUT = "LOG_OUT"; //로그아웃
const LOGIN_CHECK = "LOGIN_CHECK"; //로그인 유지
const GET_USER = "GET_USER"; //유저email 있는지 여부 받아오기
const VALIDATE_EMAIL = "VALIDATE_EMAIL"; //이메일 인증 확인

//actionCreators
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const loginCheck = createAction(LOGIN_CHECK, (cookie) => ({ cookie }));
const getUser = createAction(GET_USER, (user) => ({ user })); // 이메일 중복체크
const validateEmail = createAction(VALIDATE_EMAIL, (user) => ({ user })); //이메일 인증

//initialState
const initialState = {
  user: [],
  is_login: false,
  is_exist: false, // 이메일 중복체크
  is_email_validate: false, //이메일 인증
};

//api연결

//구글 로그인

const GoogleLoginAPI = (response) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account/googleAuth`,
      data: {
        // accessToken: response.accessToken,
        email: response.profileObj.email,
        firstName: response.profileObj.name,
        lastName: response.profileObj.givenName ? response.profileObj.givenName : "",
      },
      // headers: {
      //   "Content-Type": "application/json",
      // },
    })
      .then((res) => {
        console.log(res.data); // response 확인
        // if (res.data.msg === "success") {
        //   //토큰 받아오기
        //   const jwtToken = res.data.token;
        //   const user_name = res.data.name;

        //   //토큰 저장하기
        //   setCookie("user_token", jwtToken); //쿠키에 user_login 이라는 이름으로 저장
        //   setCookie("user_name", user_name); //유저 이름을 로컬스토리지에 저장

        //   //디폴트로 헤더에 토큰 담아주기
        //   axios.defaults.headers.common["Authorization"] = `${jwtToken}`;
        //   dispatch(logIn(user_name));

        //   window.alert("정상적으로 로그인 되었습니다!");
        //   history.push("/");
        // } else {
        //   console.log("구글로그인 msg === fail");
        // }
      })
      .catch((err) => {
        console.log("구글로그인오류", err);
      });
  };
};

//카카오 로그인
const kakaoLoginAPI = (res) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account/kakaoAuth`,
      data: res.profile.kakao_account.email,
    })
      .then((res) => {
        if (res.data.msg === "success") {
          console.log(res.data); // response 확인

          //토큰 받아오기
          const jwtToken = res.data.token;
          const user_email = res.data.email;

          //토큰 저장하기
          setCookie("user_token", jwtToken); //쿠키에 user_login 이라는 이름으로 저장
          setCookie("user_email", user_email); //유저네임을 로컬스토리지에 저장

          //디폴트로 헤더에 토큰 담아주기
          axios.defaults.headers.common["Authorization"] = `${jwtToken}`;
          dispatch(logIn(user_email));

          window.alert("정상적으로 로그인 되었습니다!");
          history.push("/");
        } else {
          console.log("카카오 res.data.msg fail");
        }
      })
      .catch((err) => {
        console.log("kakaologin오류", err);
      });
  };
};

//일반 로그인
const loginAPI = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
<<<<<<< HEAD
      url: `${config.api}/account/login`,
=======
      url: "http://15.165.76.76/account/login",
>>>>>>> 5b2c77c44ea63057b2f4212b05e159f34c80b6db
      data: {
        email: email,
        password: pwd,
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          console.log(res.data); // response 확인

          const jwtToken = res.data.token;
          const nickname = res.data.nickname;
          const email = res.data.email;

          setCookie("user_login", jwtToken); //쿠키에 user_login 이라는 이름으로 저장
          setCookie("nickname", nickname); //유저 닉네임 저장
          setCookie("email", email); //유저 이메일 저장 -> 나만 보이는 버튼에서 true/false 여부로 쓸 예정

          //디폴트로 헤더에 토큰 담아주기
          axios.defaults.headers.common["Authorization"] = `${jwtToken}`;

          dispatch(logIn(res.data));
          window.alert("정상적으로 로그인 되었습니다!");
          history.push("/");
          //자동로그아웃 -> 로그인 하자마자 1시간(토큰 만료) 되면 알럿창과 함께 로그아웃 함수 실행
          setTimeout(function () {
            window.alert("1시간이 경과하여 자동 로그아웃 됩니다");
            dispatch(logOut());
            history.replace("/");
          }, 1000 * 60 * 60);
        } else {
          window.alert("로그인에 실패했습니다!");
        }
      })
      .catch((err) => {
        console.log("loginAPI에서 오류 발생", err);
      });
  };
};

//회원가입
const signupAPI = (email, nickname, pwd, address) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
<<<<<<< HEAD
      url: `${config.api}/account`,
=======
      url: "http://15.165.76.76/account",
>>>>>>> 5b2c77c44ea63057b2f4212b05e159f34c80b6db
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        email: email,
        nickname: nickname,
        password: pwd,
        address: address,
      },
    })
      .then((res) => {
        console.log(res);
        window.alert("축하합니다. 동물마켓의 회원이 되어주셔서 감사합니다.");
        history.push("/login");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
      });
  };
};

//이메일 중복확인
const EmailCheckAPI = (email) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account/chkEmail`,
      data: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.msg === "success") {
          dispatch(getUser(true));
        } else {
          window.alert("중복된 ID입니다.");
        }
      })
      .catch((err) => {
        console.log("EmailCheckAPI에서 오류 발생", err);
      });
  };
};

//이메일 인증 메일 요청 api
const EmailValidationAPI = (email) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config}/`,
      data: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.msg === "success") {
          dispatch(validateEmail(true));
        }
      })
      .catch((err) => {
        console.log("EmailValidationAPI에서 오류 발생", err);
      });
  };
};

//비밀번호 찾기
const FindPwdAPI = (email) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account/find`,
      data: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res.data);
        //서버에 이메일만 넘겨주면, 유효성 검사는 서버에서 함. response가 succeess인지만 check!
      })
      .catch((err) => {
        console.log("FindPwdAPI에서 오류 발생", err);
      });
  };
};

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("user_login");
        deleteCookie("nickname");
        deleteCookie("email");
        localStorage.clear();
        draft.user = null;
        draft.is_login = false;
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.cookie;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_exist = action.payload.user;
        console.log(action.payload);
        console.log(action.payload.user);
      }),
    [VALIDATE_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.is_email_validate = action.payload.user;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  loginAPI,
  loginCheck,
  signupAPI,
  logOut,
  kakaoLoginAPI,
  GoogleLoginAPI,
  EmailCheckAPI,
  EmailValidationAPI,
  FindPwdAPI,
};

export { actionCreators };
