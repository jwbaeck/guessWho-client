import { useEffect, useRef } from "react";
import Camera from "./Camera";
import { PAGE_STYLE, CAMERA_GRID_STYLE } from "../../utils/styleConstants";
import useLobbyStore from "../../stores/useLobbyStore";
import setUpSocket from "../../services/socketService";

function ChatRoom() {
  const { users, currentUserId, updateUserStream } = useLobbyStore();
  const socketService = useRef(setUpSocket()).current;
  const peerConnections = useRef({});
  const localStreamRef = useRef(null);

  useEffect(() => {
    const setupLocalStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;

      updateUserStream(currentUserId, stream);
    };

    const setupPeerConnection = async userId => {
      if (!peerConnections.current[userId]) {
        const peerConnection = new RTCPeerConnection({
          iceServers: [{ urls: import.meta.env.VITE_ICE_SERVER }],
        });

        peerConnections.current[userId] = peerConnection;

        peerConnection.ontrack = event => {
          updateUserStream(userId, event.streams[0]);
        };

        peerConnection.onicecandidate = event => {
          if (event.candidate) {
            socketService.sendWebRTCIceCandidate(userId, event.candidate);
          }
        };

        if (localStreamRef.current) {
          localStreamRef.current
            .getTracks()
            .forEach(track =>
              peerConnection.addTrack(track, localStreamRef.current),
            );
        }
      }

      return peerConnections.current[userId];
    };

    const handleWebRTCOffer = async (sender, offer) => {
      const peerConnection = await setupPeerConnection(sender);

      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer),
      );

      const answer = await peerConnection.createAnswer();

      await peerConnection.setLocalDescription(answer);
      socketService.sendWebRTCAnswer(sender, answer);
    };

    const handleWebRTCAnswer = async (sender, answer) => {
      const peerConnection = peerConnections.current[sender];

      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer),
      );
    };

    const handleWebRTCIceCandidate = (sender, candidate) => {
      const peerConnection = peerConnections.current[sender];

      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const initialize = async () => {
      await setupLocalStream();
      socketService.onWebRTCOffer(handleWebRTCOffer);
      socketService.onWebRTCAnswer(handleWebRTCAnswer);
      socketService.onWebRTCIceCandidate(handleWebRTCIceCandidate);
    };

    initialize();

    return () => {
      Object.values(peerConnections.current).forEach(pc => pc.close());
      socketService.removeAllListeners();
    };
  }, [currentUserId]);

  return (
    <div className={PAGE_STYLE}>
      <div className={CAMERA_GRID_STYLE}>
        {users.map(user => (
          <Camera
            key={user.id}
            nickname={user.name}
            stream={user.stream}
            userId={user.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatRoom;
