import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  PLUS,
  MIKE,
  PHONE,
  THREE_DOTS,
  VIDEO_CAM,
  SEND,
} from "../constants/constants";

const ChatContainer = () => {
  const User = useContext(UserContext);
  // Finding the chat for the active user
  const activeUser = User.chatData.find((user) => user.userId === User.showChat);

  if (!activeUser) {
    return (
      <div className="flex items-center justify-center h-full">
        Select a chat to view messages
      </div>
    );
  }
  const placeHolder = `Message ${activeUser.name}`;

  return (
    <div className={`flex flex-col ${User.showChat && ' md:block'}  gap-10 md:gap-0 lg:gap-0 p-4 h-full overflow-y-auto w-full md:border-l-4 border-gray-200 relative`}>
      <button
        className="md:hidden absolute top-2 left-2 font-extrabold text-2xl"
        onClick={() => User.setShowChat(null)}
      >
        👈
      </button>
      <div className="flex justify-between bg-gray-200 p-2 rounded-xl">
        <div className="flex flex-row gap-5">
          <img
            className="h-14 w-14 rounded-full"
            src={activeUser.profilePictureURL}
            alt="dp"
          />
          <div>
            <h1 className="font-bold">{activeUser.name}</h1>
            <p className="font-xs">Click here for contact info</p>
          </div>
        </div>
        <div className="flex align-middle justify-center gap-2 mt-4 overflow-y-auto">
          {VIDEO_CAM}
          {PHONE}
          {THREE_DOTS}
        </div>
      </div>

      {activeUser.chat.map((message, index) => {
        // Dynamically determine the sender key and message content
        const senderKey = Object.keys(message).find((key) => key !== "you");
        const senderMessage = message[senderKey];
        const youMessage = message.you;

        return (
          <div key={index} className="my-4 flex">
            {senderMessage && (
              <div className="flex flex-col items-start">
                <div className="bg-gray-50 text-black p-2 rounded-2xl max-w-xs">
                  {senderMessage.message}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {senderMessage.timeStamp}
                </div>
              </div>
            )}
            {youMessage && (
              <div className="flex flex-col items-end ml-auto mt-12">
                <div className="bg-[#DCF7C5] text-black font-[16px] p-2 rounded-2xl max-w-xs">
                  {youMessage.message}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {youMessage.timeStamp}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex lg:mt-32 md:absolute md:bottom-1 md:ml-10">
        {PLUS}
        {MIKE}

        <div>
          <input
            className="w-[300px] md:w-[320px] lg:w-[700px] ml-2 border border-gray-200 rounded-xl p-2 "
            type="text"
            placeholder={placeHolder}
          />
          <span className="absolute lg:right-4 lg:bottom-3 bottom-7 right-6 md:bottom-3 md:right-4">
            {SEND}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
