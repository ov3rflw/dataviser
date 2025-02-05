"use client";

import "./Message.css";
import Message from "../../../public/assets/messages.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import useMessage from "../../hooks/useMessage";
import { useState, useRef, useEffect } from "react";

import Arrow from '../../../public/assets/arrow.svg';
import ArrowRight from '../../../public/assets/arrow-right.svg';
import Close from '../../../public/assets/close.svg';

export default function Messages() {
  const [ isExpanded, setIsExpanded] = useState(false);
  const [ isScale, setIsScale ] = useState(false);

  console.log(isExpanded)

  const cardRef = useRef();
  const { messages } = useMessage(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsExpanded(false);
        setIsScale(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className={`main__messages`}
      onClick={() => {
        setIsExpanded(true);
      }}
      animate={
        isExpanded
          ? {
              position: isScale ? "fixed" : "absolute",
              margin: "auto",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              marginBottom: isScale ? '' : "2%",
              borderRadius: isScale ? '0%' : '',
              border: 'none',
              zIndex: 6,
              backgroundColor: "white",
              transition: {
                type: "tween",
              },
            }
          : {
              position: "relative",
              transition: {
                type: "tween",
              },
            }
      }
      ref={cardRef}
    >
      <div className="main__messages--top">
        <div className="messages_top--wrapper">
          <div className="messages__top--container">
            <Image src={Message} width={30} alt="message icon" />
          </div>
          <div className="message__top--button">
              {
              isExpanded ? (
                <>
                {
                  isScale ? (
                    <Image src={Arrow} alt="unscale icon" width={25} onClick={() => {setIsScale(false)}}/>
                  ) : (
                    <Image src={ArrowRight} alt="scale icon" width={25} onClick={() => {setIsScale(true)}}/>
                  )
                } 
                  <Image src={Close} alt="close icon" width={25} onClick={(e) => { 
                    e.stopPropagation();
                    setIsExpanded(false); 
                    setIsScale(false); 
                    }} />
                </>
              ) :
              ''
            }

          </div>
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
    </motion.div>
  );
}