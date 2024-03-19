import { useState, useEffect, useRef } from "react";
import EntranceMessage from "./EntranceMessage";
import Camera from "./Camera";
import ChatTheme from "../../assets/chat_theme.png";
import useLobbyStore from "../../stores/useLobbyStore";
import setUpSocket from "../../services/socketService";
import {
  PAGE_STYLE,
  THEME_IMAGE_STYLE,
  CAMERA_GRID_STYLE,
} from "../../utils/styleConstants";

function ChatRoom() {
  const { users, updateUserStream, setUserEntered } = useLobbyStore();
  const [entranceMessages, setEntranceMessages] = useState([]);
  const socketService = setUpSocket();
  const peerConnections = useRef({});

  const handleUserEntrance = userId => {
    const foundUser = users.find(user => user.id === userId);

    if (foundUser && !entranceMessages.includes(foundUser.name)) {
      setEntranceMessages(prev => [...prev, foundUser.name]);
      setUserEntered(userId, true);
    }
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

  const handleHideMessage = userId => {
    setEntranceMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === userId ? { ...msg, isVisible: false } : msg,
      ),
    );
  };

  return (
    <div className={PAGE_STYLE}>
      <img className={THEME_IMAGE_STYLE} src={ChatTheme} alt="Chat Theme" />
      {entranceMessages.map(
        msg =>
          msg.isVisible && (
            <EntranceMessage
              key={msg.id}
              userName={msg.name}
              onHide={() => handleHideMessage(msg.id)}
            />
          ),
      )}
      <div
        className={CAMERA_GRID_STYLE}
        style={{ transform: "translateX(10%) translateY(-18%)" }}
      >
        {users
          .filter(user => user.hasEntered)
          .map(user => (
            <Camera key={user.id} nickname={user.name} stream={user.stream} />
          ))}
      </div>
    </div>
  );
}

export default ChatRoom;
