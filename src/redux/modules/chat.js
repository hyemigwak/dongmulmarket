import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { config } from "../../shared/config";

import axios from "axios";
import { io } from "socket.io-client";

//actions
const ADD_CHAT = "ADD_CHAT";
const GET_CHAT = "GET_CHAT";
const LOADING = "LOADING";
const USERS = "USERS";

//actionCreators
const addChat = createAction(ADD_CHAT, (message) => ({ message }));
const getChat = createAction(GET_CHAT, (message) => ({ message }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const user_list = createAction(USERS, (user_list) => ({ user_list }));

//initialState
const initialState = {
  chat_list: [],
  is_loading: false,
  user_list: [],
};

// // 소켓 설정(전역으로 사용하기 위해 export)
// const socket = io("http://15.165.76.76:3001/chatting");

//유저 목록 조회
// const middlewareUsers = () => {
//   return function (dispatch) {
//     axios({
//       method: 'get',
//       url: `${config.api}/member`,
//     })
//       .then((res) => {
//         const users = res.data.users.map((val) => {

//           return { ...val };
//         });
//         dispatch(user_list(users));
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
// };

//채팅 목록 불러오기
const getChatList = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));

    // socket.on('connect', (prevMessage) => {
    // socket.send("Hello!");
    dispatch(getChat());
    // });
  };
};

//채팅 내용 추가하기
const addChatList = (message) => {
  return function (dispatch, getState, { history }) {
    // socket.on('receive',(message)=>{
    //console.log(message);
    dispatch(addChat(message));
    // });
  };
};

//api 연결

//reducer
export default handleActions(
  {
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = action.payload.message;
        draft.is_loading = false;
      }),
    [ADD_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = [...draft, action.payload.message];
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [USERS]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list = action.payload.user_list;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  getChatList,
  addChatList,
  getChat,
  addChat,
  loading,
};

export { actionCreators };
