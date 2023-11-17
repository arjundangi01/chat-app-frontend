"use client";

import { loginAction, typeUserReducer } from "./type";
import {
  ALL_USERS_CLEAR,
  ALL_USERS_SUCCESS,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_SIGNUP_REQUEST_ERROR,
  USER_SIGNUP_REQUEST_SUCCESS,
} from "./user.action";

const initialState:typeUserReducer = {
  error: "",
  allUsers :[],
  
};
type Action = loginAction;
export const userReducer = (
  state = initialState,
  { type, payload }: Action
) => {
  switch (type) {
    case USER_LOGIN_REQUEST_SUCCESS:
      return { ...state,error:'' };
    case USER_SIGNUP_REQUEST_SUCCESS:
      return { ...state,error:'' };
    case USER_LOGIN_REQUEST_SUCCESS:
      return { ...state,error:'' };
    case USER_SIGNUP_REQUEST_ERROR:
      return { ...state,error:payload };
    case ALL_USERS_SUCCESS:
      return { ...state,allUsers:payload };
    case ALL_USERS_CLEAR:
      return { ...state,allUsers:[] };
    default:
      return state;
  }
};
