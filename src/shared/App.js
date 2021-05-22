import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import {
  Login,
  Main,
  Mypage,
  Signup,
  Findpwd,
  AddProduct,
  Detail,
  PwdChange,
} from "../pages";
import { Header, Footer, MyLocation, Testpost } from "../components";
import { getCookie } from "./Cookie";
function App() {
  const dispatch = useDispatch();
  const cookie = getCookie("user_login") ? true : false;

  useEffect(() => {
    if (cookie) {
      dispatch(userActions.loginCheck(cookie));
    }
  });

  return (
    <ConnectedRouter history={history}>
      <Header />

      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/findpwd" component={Findpwd} />
      <Route exact path="/mypage" component={Mypage} />
      <Route exact path="/" component={Main} />
      <Route exact path="/addproduct" component={AddProduct} />
      <Route exact path="/mylocation" component={MyLocation} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/testpost" component={Testpost} />
      <Route exact path="/pwdchange" component={PwdChange} />

      <Footer />
    </ConnectedRouter>
  );
}

export default App;
