import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "./SocketContext";

const Messages = () => {
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user.currentUser._id; // Ensure this is used if necessary

  const socket = useSocket();

  const meetingId=localStorage.getItem("meetingId");
  console.log(meetingId)

  const [data, setData] = useState({
    username: user.currentUser.username,
    message: "",
    meetingId: meetingId
  });

  function sendMessage() {
    if (!data.message.trim()) {
      return; 
    }




    socket.emit("send-message", data);

    setData((prev) => ({ ...prev, message: "" }));
  }

  return (
    <div className="fixed bottom-0 right-0 w-full sm:w-72 bg-gray-800 p-4 shadow-xl sm:rounded-b-lg">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={data.message}
          onChange={(e) => setData((prev) => ({ ...prev, message: e.target.value }))}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring transition duration-500 ease-in-out focus:ring-red-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg transition duration-500 ease-in-out hover:bg-red-400 hover:text-black focus:outline-none focus:ring"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
