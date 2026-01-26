const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const users = new Map();
const rooms = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", ({ username, room }) => {
    socket.join(room);
    users.set(socket.id, { username, room });
    
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    rooms.get(room).add(username);

    socket.to(room).emit("userJoined", { username, users: Array.from(rooms.get(room)) });
    socket.emit("roomUsers", Array.from(rooms.get(room)));
    
    io.to(room).emit("message", {
      id: Date.now(),
      user: "System",
      text: `${username} joined the chat`,
      timestamp: new Date().toISOString(),
      type: "system"
    });
  });

  socket.on("sendMessage", ({ text, room }) => {
    const user = users.get(socket.id);
    if (user) {
      const message = {
        id: Date.now(),
        user: user.username,
        text,
        timestamp: new Date().toISOString(),
        type: "user"
      };
      io.to(room).emit("message", message);
    }
  });

  socket.on("typing", ({ room, isTyping }) => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(room).emit("userTyping", { username: user.username, isTyping });
    }
  });

  socket.on("disconnect", () => {
    const user = users.get(socket.id);
    if (user) {
      const { username, room } = user;
      if (rooms.has(room)) {
        rooms.get(room).delete(username);
        io.to(room).emit("userLeft", { username, users: Array.from(rooms.get(room)) });
        io.to(room).emit("message", {
          id: Date.now(),
          user: "System",
          text: `${username} left the chat`,
          timestamp: new Date().toISOString(),
          type: "system"
        });
      }
      users.delete(socket.id);
    }
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
