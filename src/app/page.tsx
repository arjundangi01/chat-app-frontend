"use client";
import Image from "next/image";
import bannerImg from "./Images/banner.png";
import wave from "./Images/wave.jpg";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { onLoginAction, onSignupAction } from "@/redux/user/user.action";
import { State } from "@/redux/store";
import chatImg from "./Images/chatapp.png";
import { useRouter } from "next/navigation";
import Spinner from "./components/spinner";
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
  const userRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState<boolean>(false);
  const router = useRouter();

  const onLogin = async () => {
    setIsLoading(true);
    if (userRef.current?.value == "" || passwordRef.current?.value == "") {
      // console.log('first')
      return;
    }
    let userObj: UserObj = {
      userName: userRef.current?.value,
      password: passwordRef.current?.value,
    };
    await dispatch(onLoginAction(userObj) as any);
    if (userRef.current?.value && passwordRef.current?.value) {
      userRef.current.value = "";
      passwordRef.current.value = "";
    }
    setIsLoading(false);
    router.push("/chat", { scroll: false });
    // window.location.href = "/chat";
  };
  const onSignup = async () => {
    setIsSignUpLoading(true);

    if (userRef.current?.value == "" || passwordRef.current?.value == "") {
      return;
    }
    let userObj: UserObj = {
      userName: userRef.current?.value,
      password: passwordRef.current?.value,
    };
    await dispatch(onSignupAction(userObj) as any);
    if (userRef.current?.value && passwordRef.current?.value) {
      userRef.current.value = "";
      passwordRef.current.value = "";
    }
    setIsSignUpLoading(false);

    router.push("/chat", { scroll: false });
  };
  return (
    <>
      <main>
        <div
          className="flex py-[5rem] justify-center "
          style={{
            backgroundImage: `url(${bannerImg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "60vh",
          }}
        >
          <div className="text-white text-center w-[80%] md:w-[70%] lg:w-[50%]">
            <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[3rem] ">
              Have your best chat
            </h1>
            <h2 className="text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
              Fast Easy Unlimited chat services
            </h2>
            <div className="flex flex-col gap-5 lg:gap-3  md:flex-row  md:justify-between mt-12  items-center ">
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
              <div className="flex items-center gap-3">
                <button
                  disabled={isLoading || isSignUpLoading }
                  onClick={onLogin}
                  className="bg-[#fd3b83] rounded-2xl hover:bg-[#c35a80] px-4 py-2 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <Spinner></Spinner>
                      wait...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
                <p>OR</p>
                <button
                   disabled={isLoading || isSignUpLoading }
                  onClick={onSignup}
                  className="bg-[#fd3b83] rounded-2xl hover:bg-[#c35a80] px-4 py-2 flex items-center "
                >
                  {isSignUpLoading ? (
                    <>
                      <Spinner></Spinner>
                      wait...
                    </>
                  ) : (
                    "signup"
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400">! {error}</p>}
          </div>
        </div>
        <Image className="w-[100%]" src={wave} alt="" />
        <div className="bg-[#74e9e1] text-center flex flex-col gap-y-[1rem] items-center text-[#243b99] pb-[2rem] ">
          <h1 className="text-[2rem] md:text-[2rem] lg:text-[3rem]  my-[2rem]">
            Instant Chat
          </h1>

          <Image className="w-[80%] rounded-3xl " src={chatImg} alt="" />
        </div>
      </main>
    </>
  );
};

export default Home;
