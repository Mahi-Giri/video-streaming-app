import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { useSocket } from "./SocketContext";

const MeetingRoom = () => {
 
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get("roomCode");
  console.log(roomCode)
  localStorage.setItem('meetingId',roomCode);

  const user = useSelector((state) => state.user);
  const socket=useSocket();


 
  const [data,setData]=useState({
        meetingId:roomCode,
        userId:user.currentUser._id || ""
  })

    const navigate=useNavigate();

  const handleJoinRoom = async() => {
    console.log(roomCode)
    socket.emit("room-join",roomCode);
    
    try{
           const apiResponse=await fetch('http://localhost:4444/api/v1/meeting/joinMeeting',{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(data)
 
           })

           const apiResult=await apiResponse.json();
           console.log(apiResult);
          
            navigate(`/Streamvideo/${data.meetingId}`)
                
        

    }catch(err){
      console.error("Error joining room:", err.message);
      alert("Error joining the room: " + err.message);
          
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-3xl font-bold mb-6 text-white">Meeting Room</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <label
          htmlFor="roomIdInput"
          className="block text-lg font-medium text-gray-200 mb-2"
        >
          Room ID
        </label>
        <input
          id="roomIdInput"
          type="text"
          value={data.meetingId}
          onChange={(e) =>setData((prev)=>({...prev,roomId:data.roomId}))}
          placeholder="Enter Room ID"
          className="w-full p-3 border border-gray-600 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleJoinRoom}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default MeetingRoom;
