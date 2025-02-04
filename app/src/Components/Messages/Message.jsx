"use client";

import "./Message.css";

import Message from "../../../public/assets/messages.svg";

import Image from "next/image";

import useMessage from "../../hooks/useMessage";
import { useState } from "react";

export default function Messages() {

  const [isExpanded, setIsExpanded] = useState(false);
  const { messages } = useMessage();

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={`main__messages ${isExpanded ? 'expanded' : ''}`} onClick={handleClick}>
      <div className="main__messages--top">
        <div className="messages__top--container">
          <Image src={Message} width={30} alt="message icon"/>
        </div>
        <h3>Nombre de messages</h3>
        <p></p>
      </div>
      <div className="main__messages--bottom">
        <ul className="main__messages--list">
          {messages.length === 0 ? (
            <li>
              <p>Aucun message.</p>
            </li>
          ) : (
            messages.map((message, index) => (
              <li key={index}>
                <p>{message.username}</p>
                <p>{message.message}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
