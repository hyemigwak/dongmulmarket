import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
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
import { Header, Footer, MyLocation, AddressChange } from "../components";
import NotFound from "./NotFound";
import Spinner from "./Spinner";

import auth from "../hoc/auth";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/findpwd" component={Findpwd} />
        <Route exact path="/mypage" component={auth(Mypage)} />
        <Route exact path="/" component={Main} />
        <Route exact path="/addproduct" component={AddProduct} />
        <Route exact path="/mylocation" component={MyLocation} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/address" component={AddressChange} />
        <Route exact path="/pwdchange" component={PwdChange} />
        <Route exact path="/loading" component={Spinner} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </ConnectedRouter>
  );
}

export default App;
