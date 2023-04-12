import thunk from "redux-thunk";
import CvGeneratorReducer from "./reducers/CvGeneratorReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import screenShotReducer from "./reducers/screenShotReducer";

const persistenceConfigs = {
  key: "ReduxStore",
  storage,
};

const rootReducers = combineReducers({
  CvGeneratorReducer,
  screenShotReducer,
});

const persistedReducer = persistReducer(persistenceConfigs, rootReducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistedStore = persistStore(store);
