import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//actions 생성
const GET_ADDRESS = "GET_LOCATION";

//action creators 생성
const getAddress = createAction(GET_ADDRESS, (address) => ({ address }));

//initialState 생성
const initialState = {
  address: "",
};

//reducer
export default handleActions(
  {
    [GET_ADDRESS]: (state, action) =>
      produce(state, (draft) => {
        draft.address = action.payload.address;
      }),
  },
  initialState
);

// action creators 들을 export 해주자
const actionCreators = {
  getAddress,
};

export { actionCreators };
