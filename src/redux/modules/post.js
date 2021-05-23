import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import { config } from "../../shared/config";
import Swal from "sweetalert2";

//actions
const GET_POST = "GET_POST";
const ONE_POST = "ONE_POST";
const ADD_POST = "ADD_POST";
const LOADING = "LOADING";
const ISBOSS = "ISBOSS";
const DELETE_POST = "DELETE_POST";
const CLEAR_POST = "CLEAR_POST";
const MY_PAGE = "MY_PAGE";
const MY_ADDRESS = "MY_ADDRESS";

//actionCreators
const loading = createAction(LOADING, (loading) => ({ loading }));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const onePost = createAction(ONE_POST, (post) => ({ post }));
const isBoss = createAction(ISBOSS, (button) => ({ button }));
const deletePost = createAction(DELETE_POST, (itemId) => ({ itemId }));
const clearPost = createAction(CLEAR_POST);
const myPage = createAction(MY_PAGE, (my_list) => ({ my_list }));
const myAddress = createAction(MY_ADDRESS, (address) => ({ address }));

//initialState
const initialState = {
  post_list: [],
  detail_list: [],
  mypage_list: [],
  is_loading: false,
  boss: {},
  new_address: "",
};

// axios.defaults.headers.common["authorization"] = token;

//주소변경하기
const ChangeAddressAPI = (email, new_address) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login");
    axios({
      method: "POST",
      url: `${config.api}/myPage/address`,
      headers: {
        authorization: token,
      },
      data: {
        email: email,
        new_address: new_address,
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          console.log(res.data);
          dispatch(myAddress(new_address));
          Swal.fire({
            title: "주소를 수정했습니다!",
            confirmButtonColor: "#3fbe81",
            confirmButtonText: "확인",
          });
        } else {
          console.log("res.data.msg === fail");
        }
      })
      .catch((err) => {
        console.log("myPageAPI 오류", err);
      });
  };
};

//마이페이지 판매/교환/구매내역 뿌려주기
const myPageAPI = () => {
  let token = getCookie("user_login");
  console.log(token);
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.api}/myPage`,
      // headers: {
      //   authorization: token,
      // },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          console.log(res.data);
          dispatch(myPage(res.data.postInfo));
        } else {
          console.log("res.data.msg === fail");
        }
      })
      .catch((err) => {
        console.log("myPageAPI 오류", err);
      });
  };
};

//물품 삭제하기
const deletePostAPI = (itemId) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login");
    axios({
      method: "DELETE",
      url: `${config.api}/mainPage/delete`,
      // headers: {
      //   authorization: token,
      // },
      data: {
        itemId: itemId,
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          dispatch(deletePost(itemId));
          Swal.fire({
            text: "삭제되었습니다!",
            confirmButtonColor: "#3fbe81",
            confirmButtonText: "확인",
          });
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
    dispatch(loading(true));
    axios({
      method: "GET",
      url: `${config.api}/mainPage/noLogin`,
    })
      .then((res) => {
        if (res.data.msg === "success") {
          const post_list = res.data.data;
          //종료일 기준으로 내림차순 정렬
          post_list.sort(function (a, b) {
            return a.deadLine < b.deadLine ? -1 : a.deadLine > b.deadLine ? 1 : 0;
          });
          dispatch(getPost(post_list));
          dispatch(loading(false));
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
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));
    await axios
      .get(`${config.api}/postDetail/${itemId}`)
      .then((res) => {
        if (res.data.msg === "success") {
          dispatch(onePost(res.data.data));
          dispatch(loading(false));
        } else {
          console.log("한개 데이터 불러오기 fail");
        }
      })
      .catch((e) => {
        console.log("getOneProductAPI 오류", e);
      });
  };
};

//채팅 유저 강퇴
const kickUserList = (socket, { itemId, email, icrId }) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login");
    socket.emit(
      "authenticate",
      {
        token: token,
      },
      (data) => {
        if (data["msg"] === "success") {
          socket.emit("kickUser", { email, itemId, icrId });
        }
      }
    );
  };
};

//채팅 유저 교환 확정
const exchangeUserList = (socket, { loginEmail, itemId, email, icrId }) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login");
    socket.emit(
      "authenticate",
      {
        token: token,
      },
      (data) => {
        console.log(data);
        if (data["msg"] === "success") {
          socket.emit("exchange", { hostEmail: loginEmail, consumerEmail: email, itemId, icrId });
        }
      }
    );
  };
};

//물품 등록하기
const addPostAPI = (imgfile, category, myItem, wantItem, content, expireDate) => {
  return function (dispatch, getState, { history }) {
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
          dispatch(addPost(imgfile, category, myItem, wantItem, content, expireDate));
          Swal.fire({
            title: "등록 완료입니다!",
            confirmButtonColor: "#3fbe81",
            confirmButtonText: "확인",
          });
        } else {
          Swal.fire({
            title: "글 작성에 실패했습니다.",
            confirmButtonColor: "#d6d6d6",
            confirmButtonText: "확인",
          });
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
        draft.is_loading = action.payload.loading;
        draft.post_list = action.payload.post_list;
      }),
    [ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.loading;
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
        let idx = draft.mypage_list.findIndex((p) => p.itemId === action.payload.itemId);
        draft.mypage_list.splice(idx, 1);
      }),
    [CLEAR_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_list = [];
      }),
    [MY_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.mypage_list = action.payload.my_list;
      }),
    [MY_ADDRESS]: (state, action) =>
      produce(state, (draft) => {
        draft.address = action.payload.address;
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
  getPost,
  addPost,
  getPostAPI,
  addPostAPI,
  getOnePostAPI,
  deletePostAPI,
  clearPost,
  kickUserList,
  exchangeUserList,
  myPageAPI,
  ChangeAddressAPI,
};

export { actionCreators };
