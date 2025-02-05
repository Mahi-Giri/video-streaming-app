import express from "express";
import dotenv from "dotenv";
import authRoute from "./router/auth.route.js";
import videoRoute from "./router/video.route.js";
import userRoute from "./router/user.route.js";
import { invitationRoutuer } from "./router/invitation.route.js";
import { meetingRouter } from "./router/meeting.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import cors from "cors";
import http from "http"
import { Server } from "socket.io";
dotenv.config();


const app = express();


const server=http.createServer(app)

const io=new Server(server,{cors:true});


io.on('connection', (socket) => {
  console.log("Socket connected:", socket.id);


  socket.on("room-join", (meetingId) => {
      socket.join(meetingId);
      const roomSockets = io.sockets.adapter.rooms.get(meetingId);
        const socketIds = roomSockets ? Array.from(roomSockets) : [];

        console.log(`Total participants in ${meetingId}: ${socketIds.length}`);
        console.log(`Socket IDs in ${meetingId}:`, socketIds);
 
  });

  socket.on("send-message", (data) => {
    
      console.log("Message received:", data);
      
      io.to(data.meetingId).emit("chat-message", {
          username: data.username,
          message: data.message
      });
  });


  socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);
  });
});



app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin:["http://localhost:5173","http://localhost:5174","http://localhost:5175","http://localhost:5176","http://localhost:5177",] , // Frontend URL
    credentials: true, // Allows cookies to be sent
  })
);

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Unable to connect mongoDB server.... ${err}`);
  });


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/video", videoRoute);
app.use("/api/v1/invitation",invitationRoutuer)
app.use("/api/v1/meeting",meetingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
