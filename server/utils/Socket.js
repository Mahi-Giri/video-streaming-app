import { Server } from "socket.io";
import http from "http"
import express from "express";
const app = express();


const server=http.createServer(app)

 const io=new Server(server,{cors:true});

io.on('connection', (socket) => {
    console.log("Socket connected:", socket.id);
  
    // Handle room join
    socket.on("room-join", (meetingId) => {
        console.log(`Socket ${socket.id} joining room ${meetingId}`);
        socket.join(meetingId); 
        
        const roomSockets = io.sockets.adapter.rooms.get(meetingId);
        console.log(`Sockets in room ${meetingId}:`, roomSockets); // Log the sockets in the room
    });
  
    socket.on("send-message", (data) => {
        console.log("Message received:", data);
        
       
      
        
        io.to(data.meetingId).emit("chat-message", {
            username: data.username,
            message: data.message
        });
    });
  
    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
  });

  export default io;
  