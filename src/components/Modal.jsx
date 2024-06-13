import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";

const Modal = ({ setModalVisible, userId }) => {
  const Chats = useContext(UserContext);
  const modalRef = useRef(null);

  const handleMarkUnread = (userId) => {
    // Find the unreadCount from the result array
    const userInResult = Chats.result.find((user) => user.userId === userId);
    const newUnreadCount = userInResult ? userInResult.unreadCount : 0;

    // Update chatData with the new unreadCount
    const updatedChatData = Chats.chatData.map((chat) => {
      if (chat.userId === userId) {
        return { ...chat, unreadCount: newUnreadCount };
      }
      return chat;
    });

    Chats.setChatData(updatedChatData);
    setModalVisible(false); // Ensure modal closes after action
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
            handleMarkUnread(userId);
          }}
        >
          Mark as unread
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
