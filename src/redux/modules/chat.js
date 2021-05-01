import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import { config } from "../../shared/config";

//actions
const SEND_CHAT = "SEND_CHAT";
const GET_CHAT = "GET_CHAT";

//actionCreators
const sendChat = createAction(SEND_CHAT, (message) => ({ message }));
const getChat = createAction(GET_CHAT, (message) => ({ message }));

//initialState
const initialState = {
  message_list: [],
  socketId: null,
};

//api 연결

//reducer
export default handleActions(
  {
    [SEND_CHAT]: (state, action) => produce(state, (draft) => {}),
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.message_list.unshift(action.payload.message);
      }),
  },
  initialState
);

//action creator export
const actionCreators = {};

export { actionCreators };
