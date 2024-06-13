import { data } from "../ChatData";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [showChat, setShowChat] = useState("user1");
    const [chatData, setChatData] = useState(data);

    // Extract userId and unreadCount
    const result = data.map(user => ({
        userId: user.userId,
        unreadCount: user.unreadCount
    }));

    console.log(result);

    return (
        <UserContext.Provider value={{ showChat, setShowChat, chatData, setChatData, result }}>
            {children}
        </UserContext.Provider>
    );
};
