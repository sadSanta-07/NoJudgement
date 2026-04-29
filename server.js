import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer((req, res) => {
  // health check for Render
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

// Queue structure:
// { socketId, userId, level, topic }
let queue = [];

// roomId -> [socketId1, socketId2]
const rooms = new Map();

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("join_queue", ({ userId, level, topic, roomId }) => {
    console.log(`User ${userId} joining queue — level:${level} topic:${topic}`);

    // If roomId already exists (match made via DB), just join the room
    if (roomId) {
      socket.join(roomId);
      const room = rooms.get(roomId) || [];
      room.push(socket.id);
      rooms.set(roomId, room);

      if (room.length === 2) {
        io.to(roomId).emit("matched", { roomId });
      }
      return;
    }

    // Find best match in queue
    // Priority: same level + same topic → same level → any
    let matchIndex = -1;

    // 1. exact match (same level + same topic)
    matchIndex = queue.findIndex(
      (u) => u.level === level && u.topic === topic && u.userId !== userId
    );

    // 2. same level, different topic
    if (matchIndex === -1) {
      matchIndex = queue.findIndex(
        (u) => u.level === level && u.userId !== userId
      );
    }

    // 3. anyone in queue
    if (matchIndex === -1) {
      matchIndex = queue.findIndex((u) => u.userId !== userId);
    }

    if (matchIndex !== -1) {
      const partner = queue[matchIndex];
      queue.splice(matchIndex, 1); // remove from queue

      // roomId will be passed from frontend (the MatchSession.id from DB)
      // emit to both — frontend handles redirect
      socket.emit("matched", { partnerId: partner.userId });
      io.to(partner.socketId).emit("matched", { partnerId: userId });

      console.log(`Matched: ${userId} <-> ${partner.userId}`);
    } else {
      // add to queue
      queue.push({ socketId: socket.id, userId, level, topic });
      console.log(`Added to queue. Queue size: ${queue.length}`);
    }
  });

  socket.on("leave_queue", () => {
    queue = queue.filter((u) => u.socketId !== socket.id);
    console.log(`Left queue. Queue size: ${queue.length}`);
  });

  socket.on("disconnect", () => {
    queue = queue.filter((u) => u.socketId !== socket.id);
    console.log("Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});