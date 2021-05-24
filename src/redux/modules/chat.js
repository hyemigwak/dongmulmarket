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

//setRoom에서 받아온 채팅 목록 && 유저목록 추가
const getAllChatList = (socket) => {
  return function (dispatch, getState, { history }) {
    socket.on("setRoom", (data) => {
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

//reducer
export default handleActions(
  {
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.messages) draft.chat_list = action.payload.messages;
      }),
    [ADD_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list.push(action.payload.message);
      }),
    [REMOVE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list = draft.user_list.filter((c) => c.email !== action.payload.user);
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
