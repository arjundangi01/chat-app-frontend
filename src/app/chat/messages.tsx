import React, { Dispatch, useEffect, useRef, useState } from "react";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { FcVideoCall } from "react-icons/fc";
import { FcCallback } from "react-icons/fc";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { MyMessage, SenderMessage } from "./onemessage";
import {
  typeConversation,
  typeMessage,
  typeMessageArray,
  typeUserObj,
} from "@/redux/user/type";
import axios from "axios";


interface MessagesProps {
  messages: typeMessageArray;
  loginUserId: string;
  conversation: typeConversation;
  setMessages: React.Dispatch<React.SetStateAction<typeMessageArray>>,
  getMessages: () => void,
  socket:any,
  loginUserDetail:typeUserObj
}

const Messages = ({ messages, loginUserId, conversation,setMessages,getMessages,socket,loginUserDetail }: MessagesProps) => {
  const [user, setUser] = useState<typeUserObj>({
    _id: "",
    userName: "",
    profileImage: "",
  });
  

  const [newMessage, setNewMessage] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null);


  // console.log("first",conversation);
  useEffect(() => {
    const getUser = async () => {
      const userId = conversation?.members.find((ele) => ele !== loginUserId);
      // console.log("user", userId);

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/single/${userId}`
        );
        // console.log(res.data.user);
        
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation]);

  const messageContainerRef = useRef<any>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };
  const onMessageSend = async () => {
    if (!inputRef.current) {
      return
    }
    try {
      const newObj = {
        conversationId: conversation._id,
        sender: loginUserId,
        text: inputRef.current?.value,
        senderImage: loginUserDetail.profileImage,
      }
      const receiverId = conversation.members.find(
        (member) => member !== loginUserId
      );
      socket?.current.emit("sendMessage", {
        senderId: loginUserId,        
        senderImage: loginUserDetail.profileImage,
        receiverId,
        text: inputRef.current?.value,
      });

      // setNewMessage('')
      if (inputRef.current) {
        inputRef.current.value = '';
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, newObj);
      // console.log(response)
      getMessages()
    // setMessages((prev) => [...prev, response.data]);

    
      
      
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <main className="flex flex-col h-[100%] max-h-[100vh] ">
      <section className="border  w-full flex justify-between items-center px-5">
        <div className="flex items-center gap-3  py-2 ">
          <img
            className="max-w-[3rem] rounded-[50%]   "
            src={user?.profileImage}
            alt=""
          />
          <p>{user?.userName}</p>
        </div>
        <div className="flex gap-10 items-center text-[1.5rem]">
          <FcVideoCall />
          <FcCallback />
          <PiDotsThreeOutlineVerticalLight />
        </div>
      </section>
      <section className=" max-h-[100%] overflow-y-scroll  h-[100%] px-10 " ref={messageContainerRef}>
        {messages.map((ele, index) => (
          <>
            {loginUserId == ele.sender ? (
              <MyMessage key={ele._id} {...ele} />
            ) : (
              <SenderMessage key={ele._id} {...ele} />
            )}
          </>
        ))}
      </section>
      <section className="border  w-full flex gap-8 items-center px-5 h-[4rem] self-end bottom-0">
        <BsEmojiSmile className="text-[1.5rem] text-pink-600" />
        <input
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              onMessageSend()
            }
          }}
          // value={newMessage}
          // onChange={(e)=>setNewMessage(e.target.value)}
          type="text"
          className="w-[100%] focus:outline-none focus:border-transparent tracking-wide  "
          placeholder="Your message here..."
        />
        <IoMdAttach className="text-[1.5rem]" />
        <IoSend className="text-[1.5rem] text-green-600 " onClick={onMessageSend} />
      </section>
    </main>
  );
};

export default Messages;
