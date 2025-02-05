import React, { useEffect, useState, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { GiTireIronCross } from "react-icons/gi";

import { useSocket } from "./SocketContext";
import Messages from './Messsages'
import { useSelector } from "react-redux";
const MessageContainer = ({ chat, setChat }) => {
  const [messages, setMessages] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = useSocket();
const user=useSelector(state=>state.user);
 
  useEffect(() => {
    if (!socket) {
      console.error("Socket is not connected!");
      return;
    }

    const handleChatMessage = (data) => {
    
      setMessages((prev) => [...prev, data]);
      console.log(messages)
    };

    socket.on("chat-message", handleChatMessage);


    return () => {
      socket.off("chat-message", handleChatMessage);
    };
  }, []);

  // Scroll to the latest message when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Show sidebar on mount
  useEffect(() => {
    setIsSidebarVisible(true);
  }, []);

  // Handle sidebar close
  const handleSidebarClose = () => {
    setIsSidebarVisible(false);
    setTimeout(() => setChat(false), 500); // Delay to allow animation before unmounting
  };

  return (
    <div className="relative">
      {/* Close Button for Toggling Chat */}
      <GiTireIronCross
        size={"16px"}
        className="text-gray-900 absolute top-4 left-4 cursor-pointer"
        onClick={handleSidebarClose}
      />

      {chat && (
        <div
          className={`fixed top-0 right-0 z-40 w-full sm:w-72 bg-gray-900 text-white h-screen sm:rounded-lg shadow-2xl overflow-hidden sm:overflow-auto transition-transform duration-500 ease-in-out transform ${
            isSidebarVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full px-4 py-6 flex flex-col justify-between">
            {/* Sidebar Header with Close Icon */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-center w-full font-bold text-white">
                Live Chat
              </h2>
              <RxCross2
                className="text-2xl text-white cursor-pointer"
                onClick={handleSidebarClose}
              />
            </div>

            {/* Messages List */}
            <div className="space-y-4 overflow-y-auto flex-grow">
              {messages.length > 0 ? (
                messages.map((item, index) => (
                  <div
                    key={index}
                    className="py-3 px-4 bg-gray-800 text-gray-200 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="text-lg font-semibold text-blue-300">
                         {user.currentUser.username === item.username ? "You" : item.username} 
                      </h5>
                    </div>
                    <p className="text-base text-gray-300">{item.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No messages yet.</p>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <Messages/>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
