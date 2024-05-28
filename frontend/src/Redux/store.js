import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { authReducer as AuthReducer  } from "./Auth/reducer"

const rootReducer = combineReducers({
  AuthReducer
  
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
