import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combinedReducers from "../reducers/index";

const composeEnhancers =
  typeof global.window !== "undefined"
    ? global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
const configureStore = () => {
  const store = createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore();
