import { useState, useEffect, useRef } from 'react';
import "./Chatbox.css";
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import Avatar from '../../../public/assets/profile_test.jpg';
import Image from 'next/image';
import useUserStore from '../../../store/contactsStore';

export default function Chatbox({ senderId }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState(null);
    const lastMessage = useRef();
    const socketRef = useRef(null);

    const { users, isLoading, fetchContacts, initialize } = useUserStore();

    useEffect(() => {
        initialize();

        return () => {
            useUserStore.getState().cleanup();
        }
    }, [initialize]);

    useEffect(() => {

        socketRef.current = io('http://localhost:3001');

        socketRef.current.on('message', newMessage => {
            setMessages(oldMessages => [...oldMessages, newMessage]);
        });

        // nettoyer à la fin
        return () => {
            socketRef.current.off('message');
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
        } catch (error) {
            console.error('Erreur chargement messages:', error);
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
                    socketRef.current.emit('message', messageData);
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
        const user = users.find(user => user.id == senderId);
        return user ? `${user.firstName} ${user.lastName}` : 'Utilisateur inconnu';
    };

    return (
        <div className="Chatbox__component">
            <div className="Chatbox__component--left">
                <ul className="Chatbox__left--friendList">
                    {isLoading ? '' : (users.map((user) => (
                        <li key={user.id} data-id={user.id} onClick={getReceiverId} style={{ cursor: "pointer" }}>
                            <div className="Chatbox__avatar--wrapper">
                                <Image data-id={user.id} src={Avatar} alt='avatar' width={50} height={50} />
                            </div>
                            <b data-id={user.id}>
                                {user.firstName} {user.lastName}
                            </b>
                        </li>
                    )))}
                </ul>
            </div>

            <div className="Chatbox__component--right">
                <div className="Chatbox__component--messages">
                    <ul className="Chatbox__component--content">
                        {messages.map((msg, index) => (
                            <li
                                key={`${index}-${uuidv4()}`}
                                ref={index === messages.length - 1 ? lastMessage : null}
                                className={msg.senderId == senderId ? 'message--right' : 'message--left'}
                            >
                                <div className="Chatbox__component--messageHeader">
                                    <p className="timestamp">
                                        {new Date(msg.createdAt).toLocaleTimeString() == "Invalid Date" ? new Date().toLocaleTimeString() : new Date(msg.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                                <div className="Chatbox__component--message">
                                    <b className="sender">
                                        {msg.senderId == senderId ? 'Moi' : getUserName(msg.senderId)}
                                    </b>
                                    <p>{msg.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="Chatbox__component--sender">
                    <form onSubmit={sendMessage}>
                        <div className="inputMessage">
                            <input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Écrivez un message"
                            />
                        </div>
                        <button className="sendButton" type="submit">Envoyer</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
