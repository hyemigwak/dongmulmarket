import "./App.css";
import React from "react";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

// pages에 index.js 파일을 만들고, index.js 내에서 모든 파일을 임포트, 익스포트 해주면
// 이런 식으로도 불러 올 수 있어요.
import { Login, Signup } from "../pages";

import {Header} from "../components";
import { Grid } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { apiKey } from "./firebase";
import { Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <ConnectedRouter history={history}>
          <Header></Header>
          {/* 아직 목록 페이지가 없으니, 루트 경로(/)는 Login을 엮어줄게요! */}
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
