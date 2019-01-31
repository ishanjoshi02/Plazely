import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import rootReducer from "./reducers";
import Routes from "./Routes";

// CSS
import "./App.css";

// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk
// )(createStore);

const initialState = {};
const middleware = [promiseMiddleware, ReduxThunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
