import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { config } from "../../shared/config";

//actions
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";

//actionCreators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//initialState
const initialState = {
  post_list: [],
};

//reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        if (!draft.post_list) {
          draft.post_list = action.payload.post;
        }
        draft.post_list.unshift(action.payload.post);
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  getPost,
  addPost,
};

export { actionCreators };
