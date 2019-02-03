import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};
const middleware = [promiseMiddleware, ReduxThunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
