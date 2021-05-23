import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { config } from "../../shared/config";
import Swal from "sweetalert2";

//actions
const LOG_IN = "LOG_IN"; //로그인
const LOG_OUT = "LOG_OUT"; //로그아웃
const LOGIN_CHECK = "LOGIN_CHECK"; //로그인 유지
const GET_AUTHNUM = "GET_AUTHNUM"; // 인증번호 받아오기
const VALIDATE_EMAIL = "VALIDATE_EMAIL"; //이메일 인증 확인
const FIND_PWD = "FIND_PWD"; //비밀번호 찾기
const USER_INFO = "USER_INFO"; //유저정보 계속 유지하기

//actionCreators
const logIn = createAction(LOG_IN, (user, login_type) => ({
  user,
  login_type,
}));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const loginCheck = createAction(LOGIN_CHECK, (cookie) => ({ cookie }));
const validateEmail = createAction(VALIDATE_EMAIL, (user) => ({ user })); //이메일 인증
const findPwd = createAction(FIND_PWD, (email) => ({ email }));
const UserInfo = createAction(USER_INFO, (user) => ({ user }));

//initialState
const initialState = {
  user: {}, //딕셔너리형태
  // is_login: false,
  is_email_validate: "", //이메일 인증
  login_type: "normal", //일반로그인은 normal로 설정
  email: "",
};

//미들웨어

//구글 로그인
const GoogleLoginAPI = (response) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account/googleAuth`,
      data: {
        email: response.profileObj.email,
        firstName: response.profileObj.name,
        lastName: response.profileObj.familyName
          ? response.profileObj.familyName
          : "",
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          //토큰 받아오기
          const jwtToken = res.data.token;
          const nickname = res.data.nickname;
          const email = res.data.email;

          //토큰 저장하기
          setCookie("user_login", jwtToken);

          //딕셔너리
          const user_data = {
            email: res.data.email,
            nickname: res.data.nickname,
            token: res.data.token,
          };

          dispatch(logIn(user_data, "google"));
          Swal.fire({
            title: "로그인 성공",
            text: "정상적으로 로그인 되었습니다!",
            confirmButtonColor: "#3fbe81",
            confirmButtonText: "확인",
          });
          history.push("/");
        } else {
          console.log("구글로그인 msg === fail");
        }
      })
      .catch((err) => {
        console.log("구글로그인오류", err);
      });
  };
};

//카카오 로그인
const kakaoLoginAPI = (response) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account/kakaoAuth`,
      data: {
        email: response.profile.kakao_account.email,
        nickname: response.profile.properties.nickname,
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          //토큰 받아오기
          const jwtToken = res.data.token;
          const nickname = res.data.nickname;
          const email = res.data.email;

          //토큰 저장하기
          setCookie("user_login", jwtToken);

          //딕셔너리
          const user_data = {
            email: res.data.email,
            nickname: res.data.nickname,
            token: res.data.token,
          };

          //로그인 액션 디스패치 해주기
          //로그인타입 넣어주기
          dispatch(logIn(user_data, "kakao"));

          Swal.fire({
            title: "로그인 성공",
            text: "정상적으로 로그인 되었습니다!",
            confirmButtonColor: "#3fbe81",
          });
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

//로그인 유지
const UserInfoChkAPI = () => {
  return function (dispatch, getState, { history }) {
    console.log("UserInfoChkAPI");
    let token = getCookie("user_login");
    axios({
      method: "POST",
      url: `${config.api}/account/reset`,
      // headers: {
      //   authorization: token,
      // },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          console.log(res.data);
          dispatch(UserInfo(res.data));
        } else {
          Swal.fire({
            title: "로그인이 만료되었습니다!",
            confirmButtonColor: "#d6d6d6",
            confirmButtonText: "확인",
          });
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log("UserInfoChkAPI에서 오류 발생", err);
      });
  };
};

//일반 로그인
const loginAPI = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account/login`,
      data: {
        email: email,
        password: pwd,
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          console.log(res.data); // response 확인

          //받아온 것들을 이런 변수에  저장
          const jwtToken = res.data.token;
          const nickname = res.data.nickname;
          const email = res.data.email;

          //토큰은 setCookie에 저장하고 nickname이랑 email은 로컬 스토리지에 저장
          setCookie("user_login", jwtToken); //쿠키에 user_login 이라는 이름으로 저장

          //딕셔너리
          const user_data = {
            email: res.data.email,
            nickname: res.data.nickname,
            token: res.data.token,
          };

          dispatch(logIn(user_data, "normal"));

          Swal.fire({
            title: "로그인 성공",
            text: "동물마켓에 접속해주셔서 감사해요!",
            confirmButtonColor: "#3fbe81",
            confirmButtonText: "확인",
          });

          if (res.data.address !== null) {
            history.push("/");
          } else {
            history.push("/mylocation");
          }
          //자동로그아웃 -> 로그인 하자마자 1시간(토큰 만료) 되면 알럿창과 함께 로그아웃 함수 실행
          setTimeout(function () {
            Swal.fire({
              title: "1시간이 경과하여 자동 로그아웃 됩니다",
              confirmButtonColor: "#3fbe81",
              confirmButtonText: "확인",
            });
            dispatch(logOut());
            history.replace("/");
          }, 1000 * 60 * 60);
        } else {
          Swal.fire({
            title: "로그인에 실패했습니다!",
            confirmButtonColor: "#d6d6d6",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((err) => {
        console.log("loginAPI에서 오류 발생", err);
      });
  };
};

//회원가입
const signupAPI = (email, nickname, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        email: email,
        nickname: nickname,
        password: pwd,
      },
    })
      .then((res) => {
        Swal.fire({
          title: "회원가입 성공",
          text: "축하합니다. 동물마켓의 회원이 되어주셔서 감사합니다.",
          confirmButtonColor: "#3fbe81",
        });
        history.push("/login");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
      });
  };
};

//이메일 인증 메일 요청 api(인증번호 일치 여부 확인을 위해 서버로 보냄)
const EmailValidationAPI = (email, authnumber) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account/mail/check`,
      data: {
        email: email,
        authchkNum: Number(authnumber),
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          dispatch(validateEmail(true));
        } else {
          Swal.fire({
            title: "인증번호가 일치하지 않습니다.",
            confirmButtonColor: "#d6d6d6",
          });
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
      url: `${config.api}/account/sendpassword`,
      data: {
        email: email,
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          dispatch(findPwd(email));
          localStorage.setItem("email", email);
          Swal.fire({
            title: "가입하신 이메일로 비밀번호 재설정 메일을 보내드렸습니다",
            confirmButtonColor: "#3fbe81",
            confirmButtonText: "확인",
          });
          history.push("/pwdchange");
        } else {
          Swal.fire({
            title: "메일이 존재하지 않습니다!",
            confirmButtonColor: "#d6d6d6",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((err) => {
        console.log("FindPwdAPI에서 오류 발생", err);
      });
  };
};

//비밀번호 변경
const ChangePwdAPI = (email, pwd, newPwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/account/changepassword`,
      data: {
        email: email,
        passwordchkNum: Number(pwd),
        newpassword: String(newPwd),
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          Swal.fire({
            title: "비밀번호가 변경되었습니다. 다시 로그인해주세요!",
            confirmButtonColor: "#3fbe81",
            confirmButtonText: "확인",
          });
          localStorage.removeItem("email");
          history.push("/login");
        } else {
          Swal.fire({
            title: "비밀번호 변경에 실패했습니다.",
            confirmButtonColor: "#d6d6d6",
            confirmButtonText: "확인",
          });
          return;
        }
      })
      .catch((err) => {
        console.log("ChangePwdAPI에서 오류 발생", err);
      });
  };
};

//로그아웃 미들웨어
//구글로그인하면 구글로그아웃, 카카오로그인하면 카카오로그아웃 해주기 위해서
// initialstate에서 정의해준 login_type를 가져옴
//api에서 내려주는 게 없으니까 =()=> 비워둠

const LogOutMiddleware = () => {
  return function (dispatch, getState, { history }) {
    const loginType = getState().user.login_type;

    if (loginType === "normal") {
      deleteCookie("user_login");
      deleteCookie("G_AUTHUSER_H");
      dispatch(logOut());
      return;
    }

    if (loginType === "kakao") {
      deleteCookie("user_login");
      deleteCookie("kakao_nickname");
      deleteCookie("G_AUTHUSER_H");
      dispatch(logOut());

      return;
    }
    if (loginType === "google") {
      //구글닉넴따로 해야댐
      //딜리트쿠키에
      deleteCookie("user_login");
      deleteCookie("G_AUTHUSER_H");
      dispatch(logOut());

      return;
    }
  };
};

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user; //유저가 딕셔너리
        draft.is_login = true;
        draft.login_type = action.payload.login_type;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
        draft.login_type = null;
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.cookie;
      }),
    [GET_AUTHNUM]: (state, action) =>
      produce(state, (draft) => {
        draft.AuthNumber = action.payload.authnumber;
      }),
    [VALIDATE_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.is_email_validate = action.payload.user;
      }),
    [FIND_PWD]: (state, action) =>
      produce(state, (draft) => {
        draft.email = action.payload.email;
      }),
    [USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
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
  UserInfoChkAPI,
  EmailValidationAPI,
  FindPwdAPI,
  ChangePwdAPI,
  LogOutMiddleware,
};

export { actionCreators };
