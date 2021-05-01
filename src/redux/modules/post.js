import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import { config } from "../../shared/config";

//actions
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const LOADING = "LOADING";

//actionCreators
const loading = createAction(LOADING, (loading) => ({ loading }));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//initialState
const initialState = {
  post_list: [],
  is_loading: false,
};

//api

//물품 불러오기(메인)
const MockAPI = "https://run.mocky.io/v3/0c7b921d-dc07-401f-a6d2-b71163ac660f";
const getPostAPI = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(MockAPI)
      .then((res) => {
        if (res.data.ok) {
          console.log(res.data);
          console.log(res.data.PostList);
          dispatch(getPost(res.data.PostList));
          dispatch(loading(false));
        } else {
          console.log("data.ok is false");
        }
      })
      .catch((e) => {
        console.log("setProductAPI 오류", e);
      });
  };
};

//디테일 하나만 불러오기

//물품 등록하기
const addPostAPI = (imgfile, category, myItem, wantItem, content, expireDate, createdAt) => {
  return function (dispatch, getState, { history }) {
    //이미지 전달, formdata 사용
    let token = getCookie("user_login");
    let formdata = new FormData();
    formdata.append("", imgfile);
    formdata.append("", category);
    formdata.append("", myItem);
    formdata.append("", wantItem);
    formdata.append("", content);
    formdata.append("", expireDate);

    axios({
      method: "POST",
      url: `${config.api}/post/write`,
      data: formdata,
      // json으로 간다. 바꿔줘야함*
      header: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(addPost(res.data));
      })
      .catch((err) => {
        console.log("addPostAPI 오류", err);
      });
  };
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
  getPostAPI,
  addPostAPI,
};

export { actionCreators };
