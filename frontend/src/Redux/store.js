import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './Auth/reducer';
import subReducer from './SubData/reducer';


const rootReducer = combineReducers({
  AuthReducer: authReducer, // Corrected reducer name
  SubReducer: subReducer // Corrected reducer name
  
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
