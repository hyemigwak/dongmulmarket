import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions
const ADD_CHAT = "ADD_CHAT";
const GET_CHAT = "GET_CHAT";
const GET_USERS = "GET_USERS";
const ADD_USER = "ADD_USER";
const LOADING = "LOADING";

//actionCreators
const addChat = createAction(ADD_CHAT, (message) => ({ message }));
const getChat = createAction(GET_CHAT, (messages) => ({ messages }));
const getUsers = createAction(GET_USERS, (users) => ({ users }));
const addUser = createAction(ADD_USER, (user) => ({ user }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//initialState
const initialState = {
  chat_list: [],
  user_list: [],
  is_loading: false,
};

//채팅 목록 불러오기
const getChatList = (messages) => {
  return function (dispatch, getState, { history }) {
    dispatch(getChat(messages.msgList));
  };
};

//채팅 내용 추가하기
const addChatList = (message) => {
  return function (dispatch, getState, { history }) {
    dispatch(addChat(message));
  };
};

//최초 참여 사용자 불러오기
const getUserList = (users) => {
  return function (dispatch, getState, { history }) {
    dispatch(getUsers(users.userList));
  };
};

//채팅 유저 추가하기(참여버튼 누를때)
const addUserList = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(addUser(user));
  };
};

//reducer
export default handleActions(
  {
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = action.payload.messages;
      }),
    [ADD_CHAT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.message);
        draft.chat_list.push(action.payload.message);
      }),
    [GET_USERS]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list = action.payload.users;
      }),
    [ADD_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list.push(action.payload.user);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  getChatList,
  addChatList,
  getUserList,
  addUserList,
  getChat,
  addChat,
  loading,
};

export { actionCreators };
