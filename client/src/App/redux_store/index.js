import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "../Reducers";
import history from "../history";
import { routerMiddleware } from "connected-react-router";

const persistConfig = {
  key: "root",
  blacklist: ["router"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(reduxThunk),
    applyMiddleware(routerMiddleware(history))
  )
);
const persistor = persistStore(store);
const reduxStore = {
  store,
  persistor,
};

export default reduxStore;
