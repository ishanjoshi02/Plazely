import { browserHistory } from "react-router";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import Cookies from "js-cookie";
import { routerMiddleware } from "react-router-redux";

import reducer from "./reducer";

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory);

// const userData = JSON.parse(localStorage.getItem("uPortUserCredentials"));
const userData = Cookies.getJSON("uPortUserCredentials");
const preLoadedState = {
  user: {
    data: userData
  }
};

const store =
  userData !== null && userData
    ? createStore(
        reducer,
        preLoadedState,
        composeEnhancers(applyMiddleware(thunkMiddleware, routingMiddleware))
      )
    : createStore(
        reducer,
        composeEnhancers(applyMiddleware(thunkMiddleware, routingMiddleware))
      );

export default store;
