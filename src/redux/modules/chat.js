import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie } from "../../shared/Cookie";

//actions
const ADD_CHAT = "ADD_CHAT";
const GET_CHAT = "GET_CHAT";
const REMOVE_CHAT = "REMOVE_CHAT";
const GET_USERS = "GET_USERS";
const ADD_USER = "ADD_USER";
const LOADING = "LOADING";
const REMOVE_USER = "REMOVE_USER";
const CLEAR_ONE = "CLEAR_ONE";

//actionCreators
const addChat = createAction(ADD_CHAT, (message) => ({ message }));
const getChat = createAction(GET_CHAT, (messages) => ({ messages }));
const removeChat = createAction(REMOVE_CHAT, () => ({}));
const getUsers = createAction(GET_USERS, (users) => ({ users }));
const addUser = createAction(ADD_USER, (user) => ({ user }));
const removeUser = createAction(REMOVE_USER, (user) => ({ user }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const clearOne = createAction(CLEAR_ONE);

//initialState
const initialState = {
  chat_list: [],
  user_list: [],
  is_loading: false,
};

const getIcrId = () => {
  return function (dispatch, getState, { history }) {
    console.log(getState().post.detail_list.icrId);
  };
};

//채팅창 보낼때 사용하려고 만들었으나 사용하고있지 않음(ChatInput에서 사용하고파)
// const sendChat = (socket, message, icrId) => {
//   return function (dispatch, getState, { history }) {
//     let token = getCookie("user_login");
//     socket.emit(
//       "authenticate",
//       {
//         token: token,
//       },
//       (data) => {
//         if (data["msg"] === "success") {
//           console.log("msg가 성공이라면 if문");
//           let send_data = {
//             email: email,
//             icrId: icrId,
//             chatMsg: message,
//           };
//           socket.emit("sendMsg", send_data);
//         }
//       }
//     );
//   };
// };

//setRoom에서 받아온 채팅 목록 && 유저목록 추가
const getAllChatList = (socket) => {
  return function (dispatch, getState, { history }) {
    socket.on("setRoom", (data) => {
      console.log("setRoom", data);
      dispatch(getChat(data.msgList));
      dispatch(getUsers(data.userList));
    });
  };
};

//받은 메세지 채팅 리스트에 추가하기
const addChatList = (socket) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login");
    socket.emit(
      "authenticate",
      {
        token: token,
      },
      (data) => {
        if (data["msg"] === "success") {
          socket.on("getMsg", (get_data) => {
            dispatch(addChat(get_data));
          });
        }
      }
    );
  };
};

//채팅 유저 추가하기(참여버튼 누를때)
const addUserList = (socket, { email, icrId }) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login");
    socket.emit(
      "authenticate",
      {
        token: token,
      },
      (data) => {
        if (data["msg"] === "success") {
          socket.emit("joinRoom", { email, icrId });
          socket.on("addUser", (addUser_data) => {
            dispatch(addUser(addUser_data.userList));
            dispatch(addChat(addUser_data.msgList.data));
          });
        }
      }
    );
  };
};

//채팅 유저 강퇴하기(나가게 하기)
// export const removeUserList = (user) => {
//   return function (dispatch, getState, { history }) {
//     dispatch(removeUser(user));
//   };
// };

//reducer
export default handleActions(
  {
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        console.log("챗리스트 확인", draft.chat_list);
        if (action.payload.messages) draft.chat_list = action.payload.messages;
      }),
    [ADD_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list.push(action.payload.message);
      }),
    [REMOVE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list = draft.user_list.filter(
          (c) => c.email !== action.payload.user
        );
      }),
    [GET_USERS]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.users) draft.user_list = action.payload.users;
      }),
    [ADD_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list = action.payload.user;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [REMOVE_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = [];
      }),
    [CLEAR_ONE]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = [];
        draft.user_list = [];
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  getAllChatList,
  addChatList,
  addUserList,
  getChat,
  addChat,
  loading,
  getIcrId,
  removeChat,
  clearOne,
  removeUser,
};

export { actionCreators };
