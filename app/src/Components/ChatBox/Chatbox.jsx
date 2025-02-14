import { useState, useEffect, useRef } from 'react';
import "./Chatbox.css";
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const socket = io('http://localhost:3001');

export default function Chatbox({ senderId }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState(null);
    const [userList, setUserList] = useState([]);
    const lastMessage = useRef();

    useEffect(() => {
        loadUsers();

        // écouter les nouveaux messages
        socket.on('message', newMessage => {
            setMessages(oldMessages => [...oldMessages, newMessage]);
        });

        // nettoyer à la fin
        return () => {
            socket.off('message');
        };
    }, []);

    useEffect(() => {
        if (lastMessage.current) {
            lastMessage.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const loadMessages = async (receiverId) => {
        try {
            const res = await fetch(`/api/messages?userId=${senderId}&receiverId=${receiverId}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setMessages(data);
            }

            console.log(data);
        } catch (error) {
            console.error('Erreur chargement messages:', error);
        }
    };

    const loadUsers = async () => {
        try {
            const res = await fetch('/api/userList');
            const users = await res.json();
            setUserList(users.getUsers);
        } catch (error) {
            console.error('Erreur chargement des utilisateurs:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
    
        if (!message.trim()) return;
    
        const messageData = {
            content: message,
            senderId: senderId,
            receiverId: receiverId
        };
    
        try {
            if (receiverId) {
                const res = await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(messageData)
                });
    
                if (res.ok) {
                    socket.emit('message', messageData);
                    setMessages(oldMessages => [...oldMessages, messageData]); // Ajoutez le message à l'état
                    setMessage('');
                }
            }
        } catch (error) {
            console.error('Erreur envoi message:', error);
        }
    };
    

    const getReceiverId = (e) => {
        const friendId = e.target.getAttribute('data-id');
        setReceiverId(friendId);
        loadMessages(friendId);
    };

    const getUserName = (senderId) => {
        const user = userList.find(user => user.id == senderId);
        return user ? `${user.firstName} ${user.lastName}` : 'Utilisateur inconnu';
    };

    return (
        <div className="Chatbox__component">
            <div className="Chatbox__left--friendList">
                <ul>
                    {userList.map((user) => (
                        <li key={user.id} onClick={getReceiverId} style={{cursor: "pointer"}}>
                            <p data-id={user.id}>
                                {user.firstName} {user.lastName}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="Chatbox__component--right">
                <div className="Chatbox__component--messages">
                    {messages.map((msg, index) => (
                        <p key={`${index}-${uuidv4()}`} ref={index === messages.length -  1 ? lastMessage : null}>
                            <b>{msg.senderId == senderId ? 'Moi: ' : `${getUserName(msg.senderId)} : `}</b>
                            {msg.content}
                        </p>
                    ))}
                </div>

                <div className="Chatbox__component--sender">
                    <form onSubmit={sendMessage}>
                        <div className="inputMessage">
                            <input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Votre message"
                            />
                        </div>
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
