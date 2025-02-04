import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function useMessage(){

    const [messages, setMessages] = useState([]);

    const socket = io("http://localhost:4000/")

    console.log(messages);

    useEffect(() => {
        socket.on("message", (newMessage) => {
            setMessages((prevMessage) => [...prevMessage, newMessage])
        })

        return () => {
            socket.disconnect();
        }
    },[])

    return { messages }
}