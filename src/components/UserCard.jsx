import React, { useContext, useState } from "react";
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

  // Restrict the message content to 5 words
  const restrictedMessageContent = lastMessage.split(" ").slice(0, 5).join(" ");

  // Handle the user card selection
  const handleSelect = () => {
    User.setShowChat(info.userId); // Corrected to info.userId
  };

  // Toggle modal visibility
  const toggleModal = (e) => {
    e.stopPropagation();
    setModalVisible(!isModalVisible);
  };

  // Conditional styling for active chat
  const isActive = User.showChat === info.userId;

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
        <p>{restrictedMessageContent}</p>
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
