import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.static("public"));

const server = http.createServer(app);

const port = 5000;

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`listion on ${port}`);
});
