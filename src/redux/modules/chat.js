import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie } from "../../shared/Cookie";
import io from "socket.io-client";
// import { socket } from "../../components/Chat";

//actions
const ADD_CHAT = "ADD_CHAT";
const GET_CHAT = "GET_CHAT";
const GET_USERS = "GET_USERS";
const ADD_USER = "ADD_USER";
const LOADING = "LOADING";
const REMOVE_USER = "REMOVE_USER";

//actionCreators
const addChat = createAction(ADD_CHAT, (message) => ({ message }));
const getChat = createAction(GET_CHAT, (messages) => ({ messages }));
const getUsers = createAction(GET_USERS, (users) => ({ users }));
const addUser = createAction(ADD_USER, (user) => ({ user }));
const removeUser = createAction(REMOVE_USER, (user) => ({ user }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//initialState
const initialState = {
  chat_list: [],
  user_list: [],
  is_loading: false,
};

//소켓설정 부분(email과 detail에서 icrId 가져오기)
const email = localStorage.getItem("email");

const getIcrId = () => {
  return function (dispatch, getState, { history }) {
    console.log(getState().post.detail_list.icrId);
  };
};

const socket = io("http://15.165.76.76:3001/chatting", { query: `email=${email}&icrId=${getIcrId}` });

// const getSocket = (socket) => {
//   return console.log(socket);
// };

//setRoom에서 받아온 채팅 목록 && 유저목록 추가
const getAllChatList = (socket) => {
  console.log("아무거나");
  console.log("내려오는소켓", socket);
  console.log("함수실행체크123");
  return function (dispatch, getState, { history }) {
    console.log("함수실행체크");
    socket.on("setRoom", (data) => {
      console.log("셋룸데이터", data);
      dispatch(getChat(data.msgList));
      dispatch(getUsers(data.userList));
    });
  };
};

//받은 메세지 채팅 리스트에 추가하기
const addChatList = (socket) => {
  console.log("애드챗확인", addChatList);
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
            console.log("겟데이터", get_data);
            dispatch(addChat(get_data));
          });
        }
      }
    );
  };
};

//채팅 유저 추가하기(참여버튼 누를때)
const addUserList = (socket, my_data) => {
  console.log(socket);
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login");
    socket.emit(
      "authenticate",
      {
        token: token,
      },
      (data) => {
        if (data["msg"] === "success") {
          console.log("msg가 성공이라면 if문");
          const joinRoom_data = {
            email: my_data.email,
            icrId: my_data.icrId,
          };
          socket.emit("joinRoom", joinRoom_data);
          //서버에서 내려준 참여자 목록을 저장해서 화면에 보여준다
          socket.on("addUser", (addUser_data) => {
            console.log("참여 유저 정보 받나요???");
            dispatch(addUser(addUser_data));
          });
        }
      }
    );
  };
};

//채팅 유저 강퇴하기(나가게 하기)
const removeUserList = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(removeUser(user));
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
        // draft.chat_list = [...draft.chat_list, action.payload.message];
        draft.chat_list.push(action.payload.message);
      }),
    [REMOVE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list.filter((c) => c !== action.payload.user);
      }),
    [GET_USERS]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list = action.payload.users;
      }),
    [ADD_USER]: (state, action) =>
      produce(state, (draft) => {
        //draft.user_list = [draft.user_list, action.payload.user];
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
  getAllChatList,
  addChatList,
  addUserList,
  removeUserList,
  getChat,
  addChat,
  loading,
  getIcrId,
  socket,
};

export { actionCreators };
