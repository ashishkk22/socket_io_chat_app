const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
server.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", socket => {
    console.log("user disconnected");
  });
  socket.on("chat message", msg => {
    // console.log("message : ", msg);
    io.emit("chat message", msg);
  });
});
