"use client";

import { loginAction, typeLoginUserReducer } from "../user/type";
import { GET_LOGIN_USER_CONVERSATION_SUCCESS, GET_LOGIN_USER_DETAIL_SUCCESS } from "./login_user.action";

const initialState :typeLoginUserReducer = {
  error: "",
  loginUserDetail: {
    createdAt: "",
    updatedAt: "",
    profileImage: "",
    userName: "",
    _id: "",
  },
  loginUserConversation:[]
}
type Action = loginAction;
export const loginUserReducer = (
  state = initialState,
  { type, payload }: Action
) => {
  switch (type) {
    case GET_LOGIN_USER_DETAIL_SUCCESS:
      return { ...state, loginUserDetail: payload };
    case GET_LOGIN_USER_CONVERSATION_SUCCESS:
      return { ...state, loginUserConversation: payload };

    default:
      return state;
  }
};
