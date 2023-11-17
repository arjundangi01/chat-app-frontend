"use client";
import Image from "next/image";
import bannerImg from "./Images/banner.png";
import wave from "./Images/wave.jpg";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { onLoginAction, onSignupAction } from "@/redux/user/user.action";
import { State } from "@/redux/store";
interface UserObj {
  userName: any;
  password: any;
}
let initialUserObj: UserObj = {
  userName: "",
  password: "",
};

const Home: React.FC = () => {
  // const [userObj, setNewUserObj] = useState(initialUserObj);
  const dispatch = useDispatch();
  const { error } = useSelector((store: State) => store.userReducer);
 const userRef = useRef<HTMLInputElement | null>(null)
 const passwordRef = useRef<HTMLInputElement | null>(null)
  // console.log(store)
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const { value, name } = e.target;
  //   setNewUserObj({ ...userObj, [name]: value });
  // };

  const onLogin = async() => {
    if (userRef.current?.value == '' || passwordRef.current?.value == '') {
      return
    }
    let userObj:UserObj = {
      userName: userRef.current?.value,
      password : passwordRef.current?.value

    }
    await dispatch(onLoginAction(userObj) as any);
    if (userRef.current?.value && passwordRef.current?.value ) {
      userRef.current.value =''
      passwordRef.current.value = ''
    }
  };
  const onSignup = async () => {
    if (userRef.current?.value == '' || passwordRef.current?.value == '') {
      return
    }
    let userObj:UserObj = {
      userName: userRef.current?.value,
      password : passwordRef.current?.value

    }
    await dispatch(onSignupAction(userObj) as any);
    if (userRef.current?.value && passwordRef.current?.value ) {
      userRef.current.value =''
      passwordRef.current.value = ''
    }
   
  };
  return (
    <>
      <main>
        <div
          className="flex py-[6rem] px-[20rem]"
          style={{
            backgroundImage: `url(${bannerImg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "60vh",
          }}
        >
          <div className="text-white">
            <h1 className="text-[5rem]">Have your best chat</h1>
            <h2 className="text-[2rem]">Fast Easy Unlimited chat services</h2>
            <div className="flex justify-between mt-12 items-center ">
              <input
                ref={userRef}
                type="text"
                className="bg-transparent border-b-2 focus:outline-none"
                placeholder="Enter user name"
                name="userName"
                // onChange={handleChange}
              />
              <input
                ref={passwordRef}
                type="text"
                className="bg-transparent border-b-2 focus:outline-none"
                placeholder="Enter password"
                name="password"
                // onChange={handleChange}
              />
              <button
                onClick={onLogin}
                className="bg-[#fd3b83] rounded-2xl hover:bg-[#c35a80] px-4 py-2"
              >
                Login
              </button>
              <p>OR</p>
              <button
                onClick={onSignup}
                className="bg-[#fd3b83] rounded-2xl hover:bg-[#c35a80] px-4 py-2"
              >
                Signup
              </button>
            </div>
            {error && <p className="text-red-400">! {error}</p>}
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
        <Image className="w-[100%]" src={wave} alt="" />
        <div className="bg-[#74e9e1] text-center text-[#243b99] pb-[10rem] ">
          <h1 className="text-6xl">Instant Chat</h1>
        </div>
      </main>
    </>
  );
};

export default Home;
