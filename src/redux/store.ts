// 'use client'

import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./user/user.reducer";
import { loginUserReducer } from "./login_user/login_user.reducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({ userReducer,loginUserReducer });
const middleware = applyMiddleware(thunk);

export const store = legacy_createStore(rootReducer,middleware)
export type State = ReturnType<typeof rootReducer>;