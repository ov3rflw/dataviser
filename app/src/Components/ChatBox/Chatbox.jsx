'use client';

import { useState, useEffect } from 'react';


import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Chatbox({ userId, receiverId }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [tokenId, setTokenId] = useState(null); //récupérer l'id de l'utilisateur
    
    useEffect(() => {
        // charger les anciens messages
        loadMessages();

        const response = fetch('/api/userId', {
            method:"GET",
        })
        .then((res) => {
            setTokenId(res.headers.get("x-user-id"));
        })

        // écouter les nouveaux messages
        socket.on('message', newMessage => {
            setMessages(oldMessages => [...oldMessages, newMessage]);
        });

        // nettoyer à la fin
        return () => {
            socket.off('message');
        };
    }, []);

    // charger les messages
    const loadMessages = async () => {
        try {
            const res = await fetch(`/api/messages?userId=${userId}&receiverId=${receiverId}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setMessages(data);
            }
        } catch (error) {
            console.error('Erreur chargement messages:', error);
        }
    };

    // envoyer un message
    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        const messageData = {
            content: message,
            senderId: userId,
            receiverId: receiverId
        };

        try {
            // envoyer à l'API
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            });

            if (res.ok) {
                // envoyer au WebSocket
                socket.emit('message', messageData);
                setMessage('');
            }
        } catch (error) {
            console.error('Erreur envoi message:', error);
        }
    };

    return (
        <div style={{backgroundColor:"red"}}>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <b>{msg.senderId === userId ? 'Moi:' : 'Autre:'}</b>
                        {msg.content}
                    </p>
                ))}
            </div>

            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Votre message"
                />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

