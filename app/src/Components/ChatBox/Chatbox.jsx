import { useEffect, useState } from "react";
import "./Chatbox.css";
import { io } from "socket.io-client";

export default function Chatbox(){

    const [socket, setSocket] = useState();
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');

    
    useEffect(() => {
        const newSocket = io('http://localhost:4000/')
        setSocket(newSocket);
        
        newSocket.on("broadcastMessage", (message) => {
            setMessage((prevMessage) => [...prevMessage, message])
        })
        
        return () => newSocket.disconnect();
    },[])
    
    const sendMessage = () => {
        if (message.trim() && socket) {
            socket.emit("sendMessage", { senderId: 1, message });
            setMessages((prevMessages) => [...prevMessages, { senderId: 1, message }]);
            setMessage("");
        }
    };

    return(
        <div className="tchatBox" style={{ flex: 2}}>
            <div className="tchatBox__messages">
                
            </div>
            <div className="tchatBox__sendMessages">
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Envoyer</button>
            </form>

            </div>
        </div>
    )
}