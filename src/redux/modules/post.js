import { createAction, handleActions } from "redux-actions";
import { produce, produceWithPatches } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import { config } from "../../shared/config";

//actions
const GET_POST = "GET_POST";
const ONE_POST = "ONE_POST";
const ADD_POST = "ADD_POST";
const LOADING = "LOADING";
const ISBOSS = "ISBOSS";
const DELETE_POST = "DELETE_POST";
const CLEAR_POST = "CLEAR_POST";

//actionCreators
const loading = createAction(LOADING, (loading) => ({ loading }));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const onePost = createAction(ONE_POST, (post) => ({ post }));
const isBoss = createAction(ISBOSS, (button) => ({ button }));
const deletePost = createAction(DELETE_POST, (itemId) => ({ itemId }));
const clearPost = createAction(CLEAR_POST);

//initialState
const initialState = {
  post_list: [],
  detail_list: [],
  is_loading: false,
  boss: {},
};

//물품 삭제하기
const deletePostAPI = (itemId) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login");
    axios({
      method: "DELETE",
      url: `${config.api}/mainPage/delete`,
      headers: {
        authorization: token,
      },
      data: {
        itemId: itemId,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.msg === "success") {
          dispatch(deletePost(itemId));
        }
      })
      .catch((err) => {
        console.log("deletePostAPI에서 오류", err);
      });
  };
};

//물품 불러오기(메인)
const getPostAPI = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.api}/mainPage/noLogin`,
    })
      .then((res) => {
        console.log(res.data);

        if (res.data.msg === "success") {
          const post_list = res.data.data;
          //종료일 기준으로 내림차순 정렬
          post_list.sort(function (a, b) {
            return a.deadLine < b.deadLine
              ? -1
              : a.deadLine > b.deadLine
              ? 1
              : 0;
          });
          dispatch(getPost(post_list));
        } else {
          console.log("데이터 fail");
        }
      })
      .catch((e) => {
        console.log("getPostAPI 오류", e);
      });
  };
};

//디테일 하나만 불러오기
const getOnePostAPI = (itemId) => {
  console.log("itemId", itemId);
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`${config.api}/postDetail/${itemId}`)
      .then((res) => {
        if (res.data.msg === "success") {
          console.log(res);
          dispatch(onePost(res.data.data));
        } else {
          console.log("한개 데이터 불러오기 fail");
        }
      })
      .catch((e) => {
        console.log("getOneProductAPI 오류", e);
      });
  };
};

//물품 등록하기
const addPostAPI = (
  imgfile,
  category,
  myItem,
  wantItem,
  content,
  expireDate
) => {
  return function (dispatch, getState, { history }) {
    //이미지 전달, formdata 사용
    let token = getCookie("user_login");
    console.log(token);
    let formdata = new FormData();
    formdata.append("file", imgfile);
    formdata.append("category", category);
    formdata.append("title", myItem);
    formdata.append("wantItem", wantItem);
    formdata.append("comment", content);
    formdata.append("deadLine", expireDate);

    axios({
      method: "POST",
      url: `${config.api}/mainPage/write`,
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          console.log(res.data);
          dispatch(
            addPost(imgfile, category, myItem, wantItem, content, expireDate)
          );
          window.alert("등록 완료입니다!");
        } else {
          window.alert("등록 불러오기 실패");
        }
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
    [ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.detail_list = [];
        draft.detail_list = action.payload.post;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        if (!draft.post_list) {
          draft.post_list = action.payload.post;
        }
        draft.post_list.unshift(action.payload.post);
      }),
    [ISBOSS]: (state, action) =>
      produce(state, (draft) => {
        draft.boss = action.payload.button;
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = draft.post_list.filter(
          (p) => p.itemId !== action.payload.itemId
        );
      }),
    [CLEAR_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_list = [];
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
  getOnePostAPI,
  deletePostAPI,
  clearPost,
};

export { actionCreators };
