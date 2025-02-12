'use client';

import { useState, useEffect } from 'react';


import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Chatbox({ userId, receiverId }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    // Écouter les messages
    useEffect(() => {
        // Charger les anciens messages
        loadMessages();

        // Écouter les nouveaux messages
        socket.on('message', newMessage => {
            setMessages(oldMessages => [...oldMessages, newMessage]);
        });

        // Nettoyer à la fin
        return () => {
            socket.off('message');
        };
    }, []);

    // Charger les messages
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

    // Envoyer un message
    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        const messageData = {
            content: message,
            senderId: userId,
            receiverId: receiverId
        };

        try {
            // Envoyer à l'API
            console.log("Message :", messageData)

            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            });

            if (res.ok) {
                // Envoyer au WebSocket
                socket.emit('message', messageData);
                // Vider le champ
                setMessage('');
            }
        } catch (error) {
            console.error('Erreur envoi message:', error);
        }
    };

    return (
        <div>
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

