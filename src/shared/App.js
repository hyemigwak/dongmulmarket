import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Login, Main, Mypage, Signup } from "../pages";
import { Header, Footer } from "../components";

function App() {
  return (
    <React.Fragment>
       <ConnectedRouter history={history}>
        <Header/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/mypage" component={Mypage}/>
        <Route exact path="/main" component={Main}/>
       </ConnectedRouter>
        <Footer/>
    </React.Fragment>
  );
}

export default App;
