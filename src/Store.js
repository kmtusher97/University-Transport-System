import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initailState = {};
const middleware = [thunk];

let store;

if (0 && window.navigator.userAgent.includes("Chrome")) {
  store = createStore(
    rootReducer,
    initailState,
    composeWithDevTools(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(
    rootReducer,
    initailState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

export default store;