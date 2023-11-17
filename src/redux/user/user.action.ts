"use client";

import axios from "axios";
import { Dispatch } from "redux";
import Cookies from "js-cookie";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_REQUEST_SUCCESS = "USER_LOGIN_REQUEST_SUCCESS";
export const USER_LOGIN_REQUEST_ERROR = "USER_LOGIN_REQUEST_ERROR";

export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_REQUEST_SUCCESS = "USER_SIGNUP_REQUEST_SUCCESS";
export const USER_SIGNUP_REQUEST_ERROR = "USER_SIGNUP_REQUEST_ERROR";

export const ALL_USERS_SUCCESS = "ALL_USERS";
export const ALL_USERS_CLEAR = "ALL_USERS_CLEAR";

interface UserObj {
  userName: string;
  password: string;
}
export const onLoginAction =
  (userObj: UserObj) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
        userObj
      );
      console.log(data);
      if (
        data.message === "User not registered" ||
        data.message === "Entered wrong details"
      ) {
        dispatch({ type: USER_SIGNUP_REQUEST_ERROR, payload: data.message });
        return;
      }
      dispatch({ type: USER_LOGIN_REQUEST_SUCCESS });
      Cookies.set("chat_token", data.token);
      // window.location.assign('/chat')
      window.location.href = "/chat";
    } catch (error) {
      console.log(error);
    }
  };
export const onSignupAction =
  (userObj: UserObj) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
        userObj
      );
      console.log(response);
      if (response.data.message === "User already registered") {
        dispatch({
          type: USER_SIGNUP_REQUEST_ERROR,
          payload: response.data.message,
        });
      } else if (response.data.message == "User registered successful") {
        dispatch({
          type: USER_SIGNUP_REQUEST_SUCCESS,
          payload: response.data.message,
        });
        Cookies.set("chat_token", response.data.token);
        // dispatch({ type: USER_LOGIN_REQUEST_SUCCESS });

        window.location.href = "/chat";
      }
    } catch (error) {
      console.log(error);
    }
  };
  export const getAllUsers = (q:string) => async (dispatch: Dispatch) => {
    const userToken = Cookies.get("chat_token");
    if (!q) {
      return
    }
    //   console.log(userToken);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users?q=${q}`,
        {
          headers: {
            Authorization: `bearer ${userToken}`,
          },
        }
      );
      if (response.data?.message) {
        return;
      }
      dispatch({
        type: ALL_USERS_SUCCESS,
        payload: response.data.allUser,
      });
      console.log(response);
    } catch (error) {}
  };