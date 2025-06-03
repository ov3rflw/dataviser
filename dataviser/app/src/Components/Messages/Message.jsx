"use client";

import "./Message.css";
import Message from "../../../public/assets/messages.svg";
import Image from "next/image";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import Arrow from '../../../public/assets/arrow.svg';
import ArrowRight from '../../../public/assets/arrow-right.svg';
import Close from '../../../public/assets/close.svg';
import Chatbox from "../ChatBox/Chatbox";
import { ContactContextProvider } from "../../context/contact";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScale, setIsScale] = useState(false);
  const [senderId, setSenderId] = useState(null);

  const cardRef = useRef();

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

  useEffect(() => {
    const response = fetch('/api/userId', {
      method: "GET",
    })
      .then((res) => {
        setSenderId(res.headers.get("x-user-id"));
      })
  }, [])


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
            top: 0,
            left: 0,
            bottom: 0,
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
        <div className="messages__top--wrapper">
          <div className="messages__left--wrapper">
            <div className="messages__top--container">
              <Image src={Message} width={30} alt="message icon" />
            </div>
            <h3>Nombre de messages</h3>
            <p>{messages.length}</p>
          </div>
          <div className="messages__right--wrapper">
            <div className="message__top--button">
              {
                isExpanded ? (
                  <>
                    {
                      isScale ? (
                        <Image src={Arrow} alt="unscale icon" width={25} onClick={() => { setIsScale(false) }} />
                      ) : (
                        <Image src={ArrowRight} alt="scale icon" width={25} onClick={() => { setIsScale(true) }} />
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
        </div>
        <p></p>
      </div>
      <div className="main__messages--bottom" style={{ flexDirection: isExpanded ? "" : "" }}>
        <ContactContextProvider>
          {isExpanded ? (
            <Chatbox senderId={senderId}/>
          ) : (
            ''
          )}
        </ContactContextProvider>
      </div>
    </motion.div>
  );
}