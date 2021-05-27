import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import axios from "axios";

import User from "./modules/user";
import Post from "./modules/post";
import Chat from "./modules/chat";
import Map from "./modules/map";

export const history = createBrowserHistory();

// 리듀서를 추가해주어야 모듈이 작동된다!
const rootReducer = combineReducers({
  user: User,
  post: Post,
  map: Map,
  chat: Chat,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

// const env = process.env.NODE_ENV;

// if (env === "development") {
//   const { logger } = require("redux-logger");
//   middlewares.push(logger);
// }

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
);

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
