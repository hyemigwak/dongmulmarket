import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { Login, Main, Mypage, Signup, Findpwd, AddProduct, ContactChat, Map, Test } from "../pages";
import Detail from "../pages/Detail";
import { Header, Footer, MyLocation } from "../components";
import Testpost from "../components/Testpost";
import { getCookie } from "./Cookie";

function App() {
  const dispatch = useDispatch();
  const cookie = getCookie("user_login") ? true : false;

  useEffect(() => {
    if (cookie) {
      dispatch(userActions.loginCheck(cookie));
    }
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/findpwd" component={Findpwd} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/" component={Main} />
        <Route exact path="/addproduct" component={AddProduct} />
        <Route exact path="/mylocation" component={MyLocation} />
        <Route exact path="/contact" component={ContactChat} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/testpost" component={Testpost} />
      </ConnectedRouter>
      <Footer />
    </React.Fragment>
  );
}

export default App;
