import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions 생성
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

//action creators 생성
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

//initialState 생성
const initialState = {
  image_url: "",
  uploading: false, //처음엔 업로딩중이 아니니 펄스값
  preview: null,
};

//api 부분
const uploadImageAPI = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));
  };
};

//reducer
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false; //이미지 url 넘겨주면 이제 uploading 끝?
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

// action creators 들을 export 해주자
const actionCreators = {
  uploadImage,
  uploadImageAPI,
  setPreview,
};

export { actionCreators };
