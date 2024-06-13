import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { THREE_DOTS } from "../constants/constants";
import Modal from "./Modal";

const UserCard = ({ info }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const User = useContext(UserContext);

  // Access the last chat object
  const lastChat = info.chat[info.chat.length - 1];

  // Determine the last message and who sent it
  const lastMessage = lastChat.you ? lastChat.you.message : lastChat.user1.message;

  // Restrict the message content to 4 words
  const restrictedMessageContent = lastMessage.split(" ").slice(0, 4).join(" ");

  // Handle the user card selection
  const handleSelect = () => {
    User.setShowChat(info.userId);
    handleRead(info.userId); // Mark as read when chat is selected
  };

  // Mark as read function
  const handleRead = (userId) => {
    const updatedData = User.chatData.map((chat) => {
      if (chat.userId === userId) {
        return { ...chat, unreadCount: 0 };
      }
      return chat;
    });
    User.setChatData(updatedData);
  };

  // Toggle modal visibility
  const toggleModal = (e) => {
    e.stopPropagation();
    setModalVisible(!isModalVisible);
  };

  // Conditional styling for active chat
  const isActive = User.showChat === info.userId;

  // Use effect to mark as read when chat becomes active
  useEffect(() => {
    if (isActive) {
      handleRead(info.userId);
    }
  }, [isActive]);

  return (
    <div
      onClick={handleSelect}
      className={`relative flex p-[8px] w-full md:w-[330px] h-[64px] m-5 gap-5 hover:bg-blue-50 rounded-lg cursor-pointer ${
        isActive ? "bg-blue-100" : ""
      }`}
    >
      <img
        className="w-14 h-14 rounded-full"
        src={info.profilePictureURL}
        alt="dp"
      />
      <div className="flex-1">
        <h1 className="font-bold">{info.name}</h1>
        <div className="flex gap-3">
          <p>{restrictedMessageContent}</p>
          {info.unreadCount > 0 && <div className="rounded-full w-5 h-5 flex justify-center align-middle bg-green-600 text-white">{info.unreadCount}</div>}
        </div>
      </div>
      <div className="absolute right-10 md:right-2 top-1/2 transform -translate-y-1/2">
        <button onClick={toggleModal}>
          {THREE_DOTS}
        </button>
      </div>
      {isModalVisible && (
        <Modal setModalVisible={setModalVisible} userId={info.userId} />
      )}
    </div>
  );
};

export default UserCard;
