import { legacy_createStore, combineReducers } from "redux";
import favoriteReducer from "./reducers/favoriteReducer";

const rootReducer = combineReducers({
  favorite: favoriteReducer,
});

const store = legacy_createStore(rootReducer);

export default store;
