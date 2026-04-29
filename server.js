/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const { Server } = require("socket.io");

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

      socket.emit("matched", { partnerId: partner.userId });
      io.to(partner.socketId).emit("matched", { partnerId: userId });

      console.log(`Matched: ${userId} <-> ${partner.userId}`);
    } else {
      queue.push({ socketId: socket.id, userId, level, topic });
      console.log(`Added to queue. Size: ${queue.length}`);
    }
  });

  socket.on("leave_queue", () => {
    queue = queue.filter((u) => u.socketId !== socket.id);
    console.log(`Left queue. Size: ${queue.length}`);
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