import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "./SocketContext";

const CreateMeeting = () => {
  const user = useSelector((state) => state.user);
  const [roomId, setRoomId] = useState(uuidv4());
  const [data, setData] = useState({
    meetingId: roomId,
    meetingHost: user?.currentUser?._id || "", 
    userId:user.currentUser?._id||"",
  });

  const socket=useSocket();

  const navigate=useNavigate();


  useEffect(() => {
    localStorage.setItem("meetingId", roomId);
  }, [roomId]);

  const createMeeting = async () => {
    console.log(roomId);

    socket.emit("room-join",roomId);
   
    try {
      const apiResponse = await fetch(
        "http://localhost:4444/api/v1/meeting/createMeeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const apiResult = await apiResponse.json();
      console.log(apiResult)
    
    

      if (apiResult.success) {
        
              navigate(`/Streamvideo/${data.meetingId}`);
              
        
      } else {
        alert("Error creating the meeting: " + apiResult.message);
      }
    } catch (err) {
      console.error(err.message);
      alert("An unexpected error occurred: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold text-white mb-8">Create a Meeting Room</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <label
          htmlFor="roomId"
          className="block text-lg font-medium text-gray-300 mb-2"
        >
          Room ID
        </label>
        <input
          id="roomId"
          type="text"
          value={data.meetingId}
          onChange={(e) =>
            setData((prev) => ({ ...prev, meetingId: e.target.value }))
          }
          className="w-full p-3 border border-gray-700 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={createMeeting}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateMeeting;
