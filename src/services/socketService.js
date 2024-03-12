import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER;

const socket = io(SOCKET_SERVER_URL, {
  cors: {
    origin: "*",
  },
});

const setUpSocket = () => {
  socket.on("test", data => {
    console.log(data);
  });

  const emitTest = data => {
    socket.emit("test", {
      data,
    });
  };

  return {
    emitTest,
  };
};

export default setUpSocket;
