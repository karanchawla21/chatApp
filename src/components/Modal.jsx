import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";

const Modal = ({ setModalVisible, userId }) => {
  const Chats = useContext(UserContext);
  const modalRef = useRef(null);

  const handleRead = (userId) => {
    const updatedData = Chats.chatData.map((chat) => {
      if (chat.userId === userId) {
        return { ...chat, unreadCount: 0 };
      }
      return chat;
    });
    Chats.setChatData(updatedData);
    setModalVisible(false); // Ensure modal closes after marking as read
  };

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

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={modalRef} className="absolute right-2 top-8 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-48">
      <ul className="text-sm text-gray-700">
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleRead(userId);
          }}
        >
          Mark as read
        </li>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            confirmDelete(e);
          }}
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
  );
};

export default Modal;
