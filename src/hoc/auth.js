import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";
import SetAuthToken from "../shared/SetAuthToken";

const auth = (Component) => () => {
  //const history = useHistory();
  const dispatch = useDispatch();

  const cookie = getCookie("user_login") ? true : false;

  if (cookie) {
    console.log(getCookie("user_login"));
    SetAuthToken(getCookie("user_login")); //axios default header setting.

    dispatch(userActions.loginCheck(cookie));
    dispatch(userActions.UserInfoChkAPI());
  }

  return <Component />;
};

export default auth;
