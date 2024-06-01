import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

type Message = {
  message: string;
  id: number;
  time: string;
  user: string;
};

let messages: Message[] = [];
let totalUsers = 0;

io.on("connection", (socket) => {
  ++totalUsers;
  socket.emit("previousMessage", messages);
  socket.emit("totalUsers", totalUsers);
  socket.broadcast.emit("totalUsers", totalUsers);

  socket.on("sendMessage", (data) => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", messages);
    socket.emit("receivedMessage", messages);
  });

  socket.once("disconnect", () => {
    totalUsers--;
    socket.broadcast.emit("totalUsers", totalUsers);
  });
});

httpServer.listen(3000);
