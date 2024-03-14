import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER;
const socket = io(SOCKET_SERVER_URL, {
  cors: {
    origin: "*",
  },
});

const setUpSocket = () => {
  console.log("서버와 소켓 연결 시작.");

  const submitNickname = (nickname, roomNumber) => {
    socket.emit("submitNickname", { nickname, roomNumber });
  };

  const onUpdateUsers = callback => {
    socket.on("updateUsers", userList => {
      callback(userList);
    });
  };

  const joinRoom = roomNumber => {
    socket.emit("joinRoom", roomNumber);
  };

  const onMaxCapacityReached = callback => {
    socket.on("maxCapacityReached", userList => {
      callback(userList);
    });
  };

  const onRoleInfo = callback => {
    socket.on("roleInfo", callback);
  };

  const removeAllListeners = () => {
    socket.removeAllListeners();
  };

  return {
    submitNickname,
    onUpdateUsers,
    joinRoom,
    onMaxCapacityReached,
    onRoleInfo,
    removeAllListeners,
  };
};

export default setUpSocket;
