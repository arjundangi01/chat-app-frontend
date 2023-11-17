import { typeConversation, typeUserObj } from "@/redux/user/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface conversationProps {
  conversation: typeConversation;
  loginUser: typeUserObj;
  onClick: (id: string) => void;
  isSelected: boolean;
}
interface userCardProps {
  user: typeUserObj;
  onClick: (id: string) => void;
  isSelected?: boolean;
}

export const UserCard = ({ user, onClick, isSelected }: userCardProps) => {
  const { _id, profileImage, userName } = user;
  // console.log(isSelected);
  return (
    <div
      onClick={() => {
        onClick(_id);
      }}
      className={`flex cursor-pointer rounded-2xl items-center gap-3 px-5 py-1 border-y-[1px]
       hover:bg-indigo-200 
      ${isSelected ? "bg-blue-200" : "bg-indigo-300"}`}
    >
      <img
        className="max-w-[2.5rem]  rounded-[50%]  border-2 "
        src={profileImage}
        alt={userName}
      />
      <p>{userName}</p>
    </div>
  );
};

export const Conversation = ({
  conversation,
  loginUser,
  onClick,
  isSelected,
}: conversationProps) => {
  const [user, setUser] = useState<typeUserObj>({
    _id: "",
    userName: "",
    profileImage: "",
  });
  // console.log("first")
  useEffect(() => {
    const getUser = async () => {
      const userId = conversation?.members.find((ele) => ele !== loginUser._id);
      //  console.log(userId)

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/single/${userId}`
        );
        // console.log(res.data.user);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  return <UserCard isSelected={isSelected} user={user} onClick={onClick} />;
};
