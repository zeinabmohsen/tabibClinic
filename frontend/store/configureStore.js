import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import combinedReducers from "../reducers/index";

// Define Redux persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["UserData"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const configureStore = () => {
  const composeEnhancers =
    typeof window !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose;
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
