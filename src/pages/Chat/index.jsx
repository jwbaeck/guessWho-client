import { useEffect, useRef } from "react";
import Camera from "./Camera";
import ChatTheme from "../../assets/chat_theme.png";
import useLobbyStore from "../../stores/useLobbyStore";
import setUpSocket from "../../services/socketService";
import {
  THEME_IMAGE_STYLE,
  CAMERA_GRID_STYLE,
} from "../../utils/styleConstants";

function ChatRoom() {
  const { users, updateUserStream } = useLobbyStore();
  const socketService = setUpSocket();
  const peerConnections = useRef({});

  useEffect(() => {
    socketService.onWebRTCOffer((sender, description) => {
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: import.meta.env.VITE_ICE_SERVER }],
      });

      peerConnections.current[sender] = peerConnection;

      peerConnection.setRemoteDescription(
        new RTCSessionDescription(description),
      );

      peerConnection
        .createAnswer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socketService.sendWebRTCAnswer(
            sender,
            peerConnection.localDescription,
          );
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

    socketService.onWebRTCAnswer((sender, description) => {
      const peerConnection = peerConnections.current[sender];

      if (peerConnection) {
        peerConnection.setRemoteDescription(
          new RTCSessionDescription(description),
        );
      }
    });

    socketService.onWebRTCIceCandidate((sender, candidate) => {
      const peerConnection = peerConnections.current[sender];

      if (peerConnection) {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      socketService.removeAllListeners();

      Object.values(peerConnections.current).forEach(pc => pc.close());
    };
  }, []);

  useEffect(() => {
    users.forEach(user => {
      if (!user.stream) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then(stream => {
            updateUserStream(user.id, stream);

            const peerConnection = new RTCPeerConnection({
              iceServers: [{ urls: import.meta.env.VITE_ICE_SERVER }],
            });

            peerConnections.current[user.id] = peerConnection;

            stream
              .getTracks()
              .forEach(track => peerConnection.addTrack(track, stream));
          })
          .catch(error => console.error("웹캠 접근 에러", error));
      }
    });
  }, [users]);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <img className={THEME_IMAGE_STYLE} src={ChatTheme} alt="Chat Theme" />
      <div className="camera-grid" style={CAMERA_GRID_STYLE}>
        {users.map(user => (
          <Camera key={user.id} nickname={user.name} stream={user.stream} />
        ))}
      </div>
    </div>
  );
}

export default ChatRoom;
