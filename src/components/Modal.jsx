import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Modal = ({ setModalVisible, userId }) => {
  const Chats = useContext(UserContext);

  const handleDelete = (userID) => {
    const updatedData = Chats.chatData.filter((chat) => chat.userId !== userID);
    Chats.setChatData(updatedData);
    if (Chats.showChat === userID) {
      Chats.setShowChat(null);
    }
    setModalVisible(false); // Ensure modal closes after delete
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this chat?")) {
      handleDelete(userId);
    }
  };

  return (
    <div>
      <div className="absolute right-2 top-8 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-48">
        <ul className="text-sm text-gray-700">
          <li
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // Handle Mark as read action
              setModalVisible(false);
            }}
          >
            Mark as read
          </li>
          <li
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={confirmDelete}
          >
            Delete
          </li>
          <li
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setModalVisible(false);
            }}
          >
            Cancel
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
