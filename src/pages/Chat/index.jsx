import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EntranceMessage from "./EntranceMessage";
import Camera from "./Camera";
import ChatTheme from "../../assets/chat_theme.png";
import GameTimer from "./GameTimer";
import VoteButton from "./VoteButton";
import useLobbyStore from "../../stores/useLobbyStore";
import setUpSocket from "../../services/socketService";
import {
  PAGE_STYLE,
  THEME_IMAGE_STYLE,
  CAMERA_GRID_STYLE,
  CAMERA_GRID_TRANSFORM_STYLE,
  ENTRANCE_MESSAGE_CONTAINER_STYLE,
} from "../../utils/styleConstants";

function ChatRoom() {
  const { users, updateUserStream, setUserEntered } = useLobbyStore();
  const [entranceMessages, setEntranceMessages] = useState([]);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const socketService = setUpSocket();
  const navigate = useNavigate();
  const peerConnections = useRef({});

  const handleUserEntrance = userId => {
    const foundUser = users.find(user => user.id === userId);

    if (
      foundUser &&
      !entranceMessages.some(msg => msg.userId === foundUser.id)
    ) {
      const updatedMessages = users
        .filter(user => user.hasEntered)
        .map(user => ({
          userId: user.id,
          name: user.name,
          key: `${user.id}-${Date.now()}`,
        }));

      setEntranceMessages(updatedMessages);
      setUserEntered(userId, true);
    }
  };

  const handleVoteButtonClick = () => {
    users.forEach(user => {
      if (user.stream) {
        user.stream.getTracks().forEach(track => track.stop());
      }
    });

    socketService.removeAllListeners();
    Object.values(peerConnections.current).forEach(pc => pc.close());

    navigate("/vote-room");
  };

  const setupWebRTCEvents = () => {
    socketService.onWebRTCOffer((sender, description) => {
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: import.meta.env.VITE_ICE_SERVER }],
      });

      peerConnections.current[sender] = peerConnection;

      peerConnection.setRemoteDescription(
        new RTCSessionDescription(description),
      );

      peerConnection.createAnswer().then(sdp => {
        peerConnection.setLocalDescription(sdp);
        socketService.sendWebRTCAnswer(sender, sdp);
      });

      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socketService.sendWebRTCIceCandidate(sender, event.candidate);
        }
      };

      peerConnection.ontrack = event => {
        updateUserStream(sender, event.streams[0]);
      };
    });
  };

  useEffect(() => {
    socketService.enterChatRoom();
    socketService.onUserEntered(handleUserEntrance);

    socketService.onGameStart(({ startTime }) => {
      setGameStartTime(startTime);
    });

    setupWebRTCEvents();

    return () => {
      socketService.removeAllListeners();
      Object.values(peerConnections.current).forEach(pc => pc.close());
    };
  }, [users]);

  useEffect(() => {
    users.forEach(user => {
      if (!user.stream && user.hasEntered) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then(stream => {
            updateUserStream(user.id, stream);
          });
      }
    });
  }, [users]);

  return (
    <div className={PAGE_STYLE}>
      <img className={THEME_IMAGE_STYLE} src={ChatTheme} alt="Chat Theme" />
      {gameStartTime && (
        <GameTimer
          startTime={gameStartTime}
          onTimeUp={() => setIsTimeUp(true)}
        />
      )}
      <div className={ENTRANCE_MESSAGE_CONTAINER_STYLE}>
        {entranceMessages.map(msg => (
          <EntranceMessage key={msg.key} userName={msg.name} />
        ))}
      </div>
      <div className={CAMERA_GRID_STYLE} style={CAMERA_GRID_TRANSFORM_STYLE}>
        {users
          .filter(user => user.hasEntered)
          .map(user => (
            <Camera key={user.id} nickname={user.name} stream={user.stream} />
          ))}
      </div>
      <VoteButton isActive={isTimeUp} onClick={handleVoteButtonClick} />
    </div>
  );
}

export default ChatRoom;
