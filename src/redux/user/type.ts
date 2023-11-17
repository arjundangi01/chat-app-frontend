"use client";
export interface loginAction {
  type: string;
  payload?: [];
}
export interface typeLoginUserReducer {
  error: string;
  loginUserDetail: {
    createdAt: string;
    updatedAt: string;
    profileImage: string;
    userName: string;
    _id: string;
  };
  loginUserConversation: typeConversation[];
}

export interface typeUserObj {
  _id: string;
  userName?: string;
  profileImage: string;
}
export interface typeUserReducer {
  error: string;
  allUsers: typeUserObj[];
}
export interface typeConversation {
  _id: string;
  members: string[];
}

export interface typeMessage {
  _id:string,
  conversationId: string;
  sender: string;
  senderImage: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
export interface typeMessageArray extends Array<typeMessage> {}
export interface typeConversationArray extends Array<typeConversation> {}
