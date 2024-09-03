import { current } from "@reduxjs/toolkit";
import { createContext, useCallback, useState, useEffect } from "react";
import {io} from "socket.io-client";
export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    const [userToken, setUserToken] = useState('');
    const [isUserOff, setIsUserOff] = useState(false);
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    
    useEffect(() => {
        if(userToken === null) return;
        const newSocket = io("http://192.168.1.7:4000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        }
    }, [userToken]);
    

    useEffect(() => {
        if(socket === null) return;
        if(userToken === '') return;
        socket.emit("addNewUser", userToken);
        socket.on("getOnlineUser", (res) => {
            setOnlineUser(res);

        })
    }, [socket]);

    useEffect(() => {
        if(isUserOff){
            socket.emit("clearUser", userToken);
            socket.on("getOnlineUser", (res) => {
                setOnlineUser(res);
            })
        }
        return () => {
            setIsUserOff(false);
        }
    }, [isUserOff, userToken]);
    
    useEffect(() => {
        if(newMessage === null) return;
        socket.emit("sendMessage", newMessage);

    }, [newMessage]);

    useEffect(() => {
        if(socket === null) return;

        socket.on("getMessage", (res) => {
            setMessage((prev) => [...prev, res])
        })

        return () => {
            socket.off("getMessage");
        }
    }, [socket, currentChat]);

    const updateCurrentChat = (chat) => {
        setCurrentChat(chat);
    }

    const updateSendMessage = (chat) => {
        setNewMessage(chat);
    }


    return (
        <SocketContext.Provider
            value={{
                socket,
                onlineUser,
                setUserToken,
                updateSendMessage,
                newMessage,
                message,
                updateCurrentChat,
                currentChat,
                setMessage,
                setIsUserOff
            }}
        >
            {children}

        </SocketContext.Provider>
    )
}