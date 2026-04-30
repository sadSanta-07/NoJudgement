/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const { Server } = require("socket.io");
const { randomUUID } = require("crypto");

const httpServer = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200);
    res.end("OK");
    return;
  }
  res.writeHead(404);
  res.end();
});

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
  },
});

let queue = [];
const rooms = new Map();

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("join_queue", ({ userId, level, topic }) => {
    console.log(`User ${userId} joining — level:${level} topic:${topic}`);

    let matchIndex = queue.findIndex(
      (u) => u.level === level && u.topic === topic && u.userId !== userId
    );

    if (matchIndex === -1) {
      matchIndex = queue.findIndex(
        (u) => u.level === level && u.userId !== userId
      );
    }

    if (matchIndex === -1) {
      matchIndex = queue.findIndex((u) => u.userId !== userId);
    }

    if (matchIndex !== -1) {
      const partner = queue[matchIndex];
      queue.splice(matchIndex, 1);

      const roomId = randomUUID();
      console.log(`Matched: ${userId} <-> ${partner.userId} → room ${roomId}`);

      socket.emit("matched", { partnerId: partner.userId, roomId });
      io.to(partner.socketId).emit("matched", { partnerId: userId, roomId });
    } else {
      queue.push({ socketId: socket.id, userId, level, topic });
      console.log(`Added to queue. Size: ${queue.length}`);
    }
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joining room ${roomId}`);

    const room = rooms.get(roomId) || [];
    room.push(socket.id);
    rooms.set(roomId, room);

    if (room.length === 1) {
      socket.emit("room_role", { role: "callee" });
      console.log(`${socket.id} is callee, waiting...`);
    } else if (room.length === 2) {
      socket.emit("room_role", { role: "caller" });
      console.log(`${socket.id} is caller, starting offer...`);
    }
  });

  socket.on("webrtc_offer", ({ offer, roomId }) => {
    console.log(`Offer from ${socket.id}`);
    socket.to(roomId).emit("webrtc_offer", { offer });
  });

  socket.on("webrtc_answer", ({ answer, roomId }) => {
    console.log(`Answer from ${socket.id}`);
    socket.to(roomId).emit("webrtc_answer", { answer });
  });

  socket.on("webrtc_ice_candidate", ({ candidate, roomId }) => {
    socket.to(roomId).emit("webrtc_ice_candidate", { candidate });
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    const room = rooms.get(roomId) || [];
    const updated = room.filter((id) => id !== socket.id);
    if (updated.length === 0) {
      rooms.delete(roomId);
    } else {
      rooms.set(roomId, updated);
    }
    socket.to(roomId).emit("peer_left");
  });

  socket.on("leave_queue", () => {
    queue = queue.filter((u) => u.socketId !== socket.id);
  });

  socket.on("disconnect", () => {
    queue = queue.filter((u) => u.socketId !== socket.id);
    for (const [roomId, members] of rooms.entries()) {
      if (members.includes(socket.id)) {
        const updated = members.filter((id) => id !== socket.id);
        if (updated.length === 0) {
          rooms.delete(roomId);
        } else {
          rooms.set(roomId, updated);
          socket.to(roomId).emit("peer_left");
        }
      }
    }
    console.log("Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});