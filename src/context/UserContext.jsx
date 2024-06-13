import {data} from "../ChatData"
import { createContext, useState } from "react";



export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [showChat, setShowChat] = useState("user1");
    const [chatData, setChatData] = useState(data)
    return (
        <UserContext.Provider value={{showChat, setShowChat, chatData, setChatData}}>
            {children}
        </UserContext.Provider>
    )
}