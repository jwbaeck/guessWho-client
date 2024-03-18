import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER;
let socketInstance = null;

const setUpSocket = () => {
  if (socketInstance) {
    return socketInstance;
  }

  console.log("서버와 소켓 연결 시작.");

  const socket = io(SOCKET_SERVER_URL, {
    cors: {
      origin: "*",
    },
  });

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

  const onWebRTCOffer = callback => {
    socket.on("webRTC-offer", data => {
      callback(data.sender, data.sdp);
    });
  };

  const onWebRTCAnswer = callback => {
    socket.on("webRTC-answer", data => {
      callback(data.sender, data.sdp);
    });
  };

  const onWebRTCIceCandidate = callback => {
    socket.on("webRTC-candidate", data => {
      callback(data.sender, data.candidate);
    });
  };

  const sendWebRTCOffer = (target, description) => {
    socket.emit("webRTC-offer", { target, sdp: description });
  };

  const sendWebRTCAnswer = (target, description) => {
    socket.emit("webRTC-answer", { target, sdp: description });
  };

  const sendWebRTCIceCandidate = (target, candidate) => {
    socket.emit("webRTC-candidate", { target, candidate });
  };

  socketInstance = {
    submitNickname,
    onUpdateUsers,
    joinRoom,
    onMaxCapacityReached,
    onRoleInfo,
    removeAllListeners,
    onWebRTCOffer,
    onWebRTCAnswer,
    onWebRTCIceCandidate,
    sendWebRTCOffer,
    sendWebRTCAnswer,
    sendWebRTCIceCandidate,
  };

  return socketInstance;
};

export default setUpSocket;
