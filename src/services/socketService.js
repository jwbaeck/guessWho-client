import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER;
let socketInstance = null;

const setUpSocket = () => {
  if (!socketInstance) {
    console.log("서버와 소켓 연결 시작.");

    const socket = io(SOCKET_SERVER_URL, {
      cors: {
        origin: "*",
      },
    });

    const submitNickname = (nickname, roomNumber) => {
      socket.emit("submitNickname", { nickname, roomNumber });
    };

    const onReceiveSocketId = callback => {
      socket.on("yourSocketId", callback);
    };

    const onUpdateUsers = callback => {
      socket.on("updateUsers", callback);
    };

    const joinRoom = roomNumber => {
      socket.emit("joinRoom", roomNumber);
    };

    const onMaxCapacityReached = callback => {
      socket.on("maxCapacityReached", callback);
    };

    const onRoleInfo = callback => {
      socket.on("roleInfo", callback);
    };

    const removeAllListeners = () => {
      socket.removeAllListeners();
    };

    const onUserEntered = callback => {
      socket.on("userEntered", callback);
    };

    const onGameStart = callback => {
      socket.on("gameStart", callback);
    };

    const enterChatRoom = () => {
      socket.emit("userEnteredChatRoom");
    };

    const submitVote = vote => {
      socket.emit("submitVote", vote);
    };

    const onVoteResults = callback => {
      socket.on("voteResults", callback);
    };

    const onWebRTCOffer = callback => {
      socket.on("webRTC-offer", ({ sender, sdp }) => callback(sender, sdp));
    };

    const onWebRTCAnswer = callback => {
      socket.on("webRTC-answer", ({ sender, sdp }) => callback(sender, sdp));
    };

    const onWebRTCIceCandidate = callback => {
      socket.on("webRTC-candidate", ({ sender, candidate }) =>
        callback(sender, candidate),
      );
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
      socket,
      submitNickname,
      onReceiveSocketId,
      onUpdateUsers,
      joinRoom,
      onMaxCapacityReached,
      onRoleInfo,
      removeAllListeners,
      onUserEntered,
      enterChatRoom,
      onGameStart,
      submitVote,
      onVoteResults,
      onWebRTCOffer,
      onWebRTCAnswer,
      onWebRTCIceCandidate,
      sendWebRTCOffer,
      sendWebRTCAnswer,
      sendWebRTCIceCandidate,
    };
  }

  return socketInstance;
};

export default setUpSocket;
