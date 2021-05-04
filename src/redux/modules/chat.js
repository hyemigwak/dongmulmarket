import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { config } from "../../shared/config";

//actions
const ADD_CHAT = "ADD_CHAT";
const GET_CHAT = "GET_CHAT";
const LOADING = "LOADING";

//actionCreators
const addChat = createAction(ADD_CHAT, (message) => ({ message }));
const getChat = createAction(GET_CHAT, (message) => ({ message }));
const loading = createAction(LOADING, (loading) => ({ loading }));

//initialState
const initialState = {
  chat_list: [],
  is_loading: false,
};

// const socket = new WebSocket("ip주소")

const getChatList = (prevMessage) => {
  return function (dispatch, getState, { history }) {
    dispatch(getChat(prevMessage));
  };
};

const addChatList = (message) => {
  return function (dispatch, getState, { history }) {
    dispatch(addChat(message));
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
        draft.is_loading = action.payload.loading;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  getChatList,
  addChatList,
  loading,
  // socket,
};

export { actionCreators };
