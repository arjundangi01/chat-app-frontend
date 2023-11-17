"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import Messages from "./messages";
import { Conversation, UserCard } from "./usercard";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginUserConversation,
  getLoginUserDetail,
} from "@/redux/login_user/login_user.action";
import { State } from "@/redux/store";
import { ALL_USERS_CLEAR, getAllUsers } from "@/redux/user/user.action";
import {
  typeConversation,
  typeConversationArray,
  typeLoginUserReducer,
  typeMessageArray,
  typeUserReducer,
} from "@/redux/user/type";
import axios from "axios";
import NoChat from "./no_chat";
import io from 'socket.io-client'
// import {State} from "../../redux/store"



const Page = () => {
  const dispatch = useDispatch();
  const socket = useRef<any>();
  const [arrivalMessage, setArrivalMessage] = useState<any>({});

  // const [conversations, setConversations] = useState<typeConversationArray>([]);
  // const [searchUserInput, setSearchUserInput] = useState("");
  // const [timerId,setTimerId] = useState('')
  const [messages, setMessages] = useState<typeMessageArray>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [currentConversation, setCurrentConversation] =
    useState<typeConversation>({
      _id: "",
      members: [],
    });

  const { loginUserDetail, loginUserConversation }: typeLoginUserReducer =
    useSelector((store: State) => store.loginUserReducer);
  // console.log(loginUserConversation)
  const { allUsers }: typeUserReducer = useSelector(
    (store: State) => store.userReducer
  );

  useEffect(() => {
    dispatch(getAllUsers('a') as any);
    dispatch(getLoginUserDetail() as any);
  }, []);
  useEffect(() => {
    // dispatch(getLoginUserConversation(loginUserDetail._id) as any);
  }, []);
 
  useEffect(() => {
    getMessages();
  }, [currentConversation]);
  useEffect(() => {
    socket.current = io("http://localhost:8080");
    socket?.current.on("getMessage", (data:any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        senderImage: data.senderImage,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    // arrivalMessage && currentConversation?.members.includes(arrivalMessage.sender);
    setMessages((prev) => [...prev, arrivalMessage]);

  }, [arrivalMessage, currentConversation]);

  useEffect(() => {
    socket?.current.emit("addUser", loginUserDetail._id);
  }, [loginUserDetail]);

  const getMessages = async () => {
    if (!currentConversation?._id) {
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/messages/${currentConversation?._id}`
      );
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickForSearchUser = (id: string) => {
    // console.log(loginUserConversation)
    const findConversation = loginUserConversation.find(
      (ele: typeConversation) => {
        ele?.members.includes(id);
      }
    );
    if (findConversation) {
      setCurrentConversation(findConversation);
    } else {
      createConversation(id);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    // dispatch(getAllUsers(searchUserInput) as any);
    dispatch({ type: ALL_USERS_CLEAR });
  };
  const createConversation = async (id: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/conversations`,
        {
          senderId: loginUserDetail._id,
          receiverId: id,
        }
      );
      dispatch(getLoginUserConversation(loginUserDetail._id) as any);

      // setCurrentConversation((prev) => [...prev, res.data]);
      // console.log(res.data)
      setCurrentConversation(res.data);
    } catch (error) {}
  };

  let timerId: any;
  const handleSearchChange = async () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      dispatch(getAllUsers(inputRef.current?.value ?? "") as any);
    }, 1000);
  };

  return (
    <main className="flex ">
      <section className="md:w-[550px] border flex flex-col min-h-[100vh]  max-h-[100vh] py-2 px-8">
        <div className="border rounded-lg py-3">
          <div className="flex w-full justify-between px-5 ">
            <p>User Profile</p>
            <CiSettings className='text-[1.5rem]' />
          </div>
          <hr className="my-2" />
          <div className="flex items-center gap-3 px-5">
            <img
              className="max-w-[4rem] rounded-[50%]  border-2 "
              src={loginUserDetail?.profileImage}
              alt=""
            />
            <p>{loginUserDetail?.userName}</p>
          </div>
        </div>
        {/* ----------------------------- */}
        <div className="border max-h-[210px] min-h-[210px] overflow-y-scroll h-[210px] rounded-lg  mt-4 ">
          <div className="w-full   flex justify-between h-10 items-center px-2 ">
            <input
              onChange={(e) => {
                // setSearchUserInput(e.target.value);

                handleSearchChange();
              }}
              type="text"
              ref={inputRef}
              placeholder="search user"
              className="w-[100%]  ps-2 focus:outline-none"
              // value={inputRef.current.value}
            />
            <IoSearchOutline
              onClick={() => {
                dispatch(getAllUsers(inputRef.current?.value ?? "") as any);
              }}
              className="text-[1.5rem]"
            />
          </div>
          <hr className="my-2" />

          <div className="">
            {/* {map} */}
            {allUsers?.map((ele, index) => (
              <UserCard
                key={ele?._id}
                user={ele}
                onClick={onClickForSearchUser}
              />
            ))}
          </div>
        </div>
        {/* ----------------------------- */}
        <div className="border rounded-lg max-h-[380px] overflow-y-scroll h-[100%]  mt-4 ">
          <div className="w-full  flex justify-between h-6 items-center px-2 pt-2 ">
            <p className="text-[1rem] text-blue-600 font-semibold">
              All Chats..
            </p>
          </div>
          <hr className="my-2" />

          <div className="">
            {/* {map} */}
            {loginUserConversation?.map((ele, index) => (
              <Conversation
                key={ele?._id}
                conversation={ele}
                loginUser={loginUserDetail}
                onClick={createConversation}
                isSelected={currentConversation._id === ele._id}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="w-[100%]   ">
        {currentConversation?._id ? (
          <Messages
            getMessages={getMessages}
            setMessages={setMessages}
            messages={messages}
            conversation={currentConversation}
            loginUserId={loginUserDetail._id}
            loginUserDetail={loginUserDetail}
            socket={socket}
          />
        ) : (
          <NoChat />
        )}
      </section>
    </main>
  );
};

export default Page;
