import axios from "axios";
import { Dispatch } from "redux";
import Cookies from "js-cookie";

export const GET_LOGIN_USER_DETAIL_SUCCESS = "GET_LOGIN_USER_DETAIL";
export const GET_LOGIN_USER_CONVERSATION_SUCCESS = "GET_LOGIN_USER_CONVERSATION_SUCCESS";

export const getLoginUserDetail = () => async (dispatch: Dispatch) => {
  const userToken = Cookies.get("chat_token");
  // console.log(id);
  if (!userToken) {
    window.location.href = "/";
}
    // console.log(userToken);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/login_user`, {
        headers: {
          Authorization: `bearer ${userToken}`
        }
      }
      
    );
    // console.log(response);

    if (response.data?.message) {
      return;
    }
    dispatch({
      type: GET_LOGIN_USER_DETAIL_SUCCESS,
      payload: response.data.user,
    });
    dispatch(getLoginUserConversation(response.data.user._id) as any);

    // console.log(response);
  } catch (error) {}
};
export const getLoginUserConversation = (id:string) => async (dispatch: Dispatch) => {
  
    // console.log(id);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/conversations/${id}`,
      
    );
    if (response.data?.message) {
      return;
    }
    dispatch({
      type: GET_LOGIN_USER_CONVERSATION_SUCCESS,
      payload: response.data,
    });
    // console.log( 'conversation', response);
  } catch (error) {}
};


