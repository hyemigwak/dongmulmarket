import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// 리듀서를 가져올거예요.
import User from "./modules/user";

// 브라우저 히스토리를 만듭니다.
export const history = createBrowserHistory();

// 가져온 리듀서를 루트 리듀서로 묶어줍니다.
const rootReducer = combineReducers({
  user: User,
  router: connectRouter(history),
});

// 사용할 미들웨어를 여기에 넣어줍니다.
// thunk에는 history를 넣어줄거예요. (중간 다리 역할을 하는 미들웨어에서도 페이지 이동을 할 수 있게 하려고!)
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// redux devtools 익스텐션 사용 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
