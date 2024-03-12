import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER;

const socket = io(SOCKET_SERVER_URL, {
  cors: {
    origin: "*",
  },
});

const setUpSocket = () => {
  const submitNickname = nickname => {
    socket.emit("submitNickname", { nickname });
  };

  const onUpdateUsers = callback => {
    socket.on("updateUsers", userList => {
      callback(userList);
    });
  };

  return {
    submitNickname,
    onUpdateUsers,
  };
};

export default setUpSocket;
