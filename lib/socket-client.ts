import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let currentRoom: string | null = null;

export function getSocket(forRoom?: string): Socket {
  if (forRoom && currentRoom && currentRoom !== forRoom) {
    console.log("New room — resetting socket");
    socket?.disconnect();
    socket = null;
  }

  if (forRoom) currentRoom = forRoom;

  if (!socket || socket.disconnected) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });
  }

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
  currentRoom = null;
}