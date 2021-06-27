import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

// 액션 타입부터 정해줍니다!
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// 액션 생성 함수를 만들어요.
//  redux-actions의 createAction을 사용해서 만들어줍니다.
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState를 만듭니다.
// 기본 값을 미리 정해주는거예요.
/**
 * user 유저 정보가 들어가는 딕셔너리
 * is_login 로그인했는 지, 아닌 지 여부
 */
const initialState = {
  user: null,
  is_login: false,
};

// 미들웨어(액션이 일어나고 -> 리듀서 내의 어떤 로직이 실행되기 사이의 중간다리 역할을 해줄 함수들)을 작성합니다!
/**
 *
 * @param {*} id 아이디
 * @param {*} pwd 패스워드
 * 파이어베이스의 인증 서비스를 통해 로그인 한 뒤,
 * 리덕스에서도 로그인 상태를 저장해줄거예요.
 */
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    //   로그인 정보를 저장할 위치를 세션으로 바꿔줍니다.
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      // 이메일과 비밀번호로 로그인합니다.
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          // 성공한 경우, 유저 정보가 어떻게 오는 지 주석을 풀고 확인해봐요!
          //   console.log(user);

          //   리덕스에도 유저 정보를 저장해줍니다.
          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );

          // 미들웨어에서 페이지 이동하기!
          // 이걸 위해서 configureStore.js에서 뭘 해줬는 지 다시 한 번 확인해보고 오세요!
          history.push("/");
        })
        .catch((error) => {
            // 로그인 실패하면 alert으로 알려줄거예요!
            // 여기에 팝업을 띄워주거나, 왜 실패했는 지 알려주는 등 다른 작업도 해볼 수 있겠죠! :) 
            // (시간이 남으면 해보세요!)
          window.alert("로그인 실패!");

          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage);
        });
    });
  };
};

// 회원가입
/**
 *
 * @param {*} id 아이디
 * @param {*} pwd 패스워드
 * @param {*} user_name 닉네임 (유저 네임)
 * @returns
 */
const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);

        auth.currentUser
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            dispatch(
              setUser({
                user_name: user_name,
                id: id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });

        // Signed in
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

// 로그인했는 지 아닌 지 체크, 만약 파이어베이스에 로그인한 상태라면? 리덕스에도 유저 정보를 넣어줍니다.
const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    // 유저 정보를 가져옵니다.
    auth.onAuthStateChanged((user) => {
      // 유저 정보가 있으면 리덕스에 유저 정보 넣어주기
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        //   없으면 파이어베이스에서도 로그아웃 합니다.
        dispatch(logoutFB());
      }
    });
  };
};

// 로그아웃
const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    //   파이어베이스에서 로그아웃하고,
    auth.signOut().then(() => {
      // 성공하면 리덕스에서도 유저 정보를 삭제하고, is_login 상태를 false로 바꿔줍니다.
      dispatch(logOut());
      //   그리고 메인 페이지로 이동해요!
      history.replace("/");
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// 만든 액션생성자들(+중간다리들)을 외부에서 호출할 수 있도록 내보내줍니다. 내보낼 필요가 없는 건 굳이 내보내지 않아도 괜찮아요!
const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
