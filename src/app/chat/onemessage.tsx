import { typeMessage } from "@/redux/user/type";
import React from "react";

export const MyMessage = ({_id,text,senderImage}:typeMessage) => {
  return (
    <div className="flex   py-2 justify-end   ">
      <div className="flex items-center gap-3  max-w-[25rem] rounded-xl px-5 py-1">
        <p className=" bg-blue-300 rounded-xl px-5 py-1">
         {text}
        </p>
        <img
          className="max-w-[2rem] rounded-[50%] self-start  "
          src={senderImage}
          alt=""
        />
      </div>
    </div>
  );
};
export const SenderMessage = ({_id,text,senderImage}:typeMessage) => {
  return (
    <div className="flex items-center gap-3  py-2 justify-start  ">
      <div className="flex items-center gap-3  max-w-[25rem] rounded-xl px-5 py-1">
        <img
          className="max-w-[2rem] rounded-[50%] self-start  "
          src={senderImage}
          alt=""
        />
        <p className=" bg-purple-300 rounded-xl px-5 py-1">
          {text}
        </p>
      </div>
    </div>
  );
};
