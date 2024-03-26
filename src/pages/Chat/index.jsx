import { useState, useEffect, useRef } from "react";
import ChatTheme from "../../assets/chat_theme.png";
import {
  PAGE_STYLE,
  THEME_IMAGE_STYLE,
  CAMERA_GRID_STYLE,
  CAMERA_AREA_STYLE,
} from "../../utils/styleConstants";
import useLobbyStore from "../../stores/useLobbyStore";
import setUpSocket from "../../services/socketService";

function ChatRoom() {
  const { users, currentUserId, updateUserStream, setUserEntered } =
    useLobbyStore();
  const socketService = useRef(null);
  const peerConnections = useRef({});
  const localStreamRef = useRef(null);

  useEffect(() => {
    socketService.current = setUpSocket();

    const setupLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        updateUserStream(currentUserId, stream);
        socketService.current.enterChatRoom();
        setUserEntered(currentUserId, true);
      } catch (error) {
        console.error("Error setting up local stream", error);
      }
    };

    const setupPeerConnection = async userId => {
      if (!peerConnections.current[userId]) {
        const peerConnection = new RTCPeerConnection({
          iceServers: [{ urls: import.meta.env.VITE_ICE_SERVER }],
        });

        peerConnection.ontrack = event => {
          updateUserStream(userId, event.streams[0]);
          setUserEntered(userId, true);
        };

        peerConnection.onicecandidate = event => {
          if (event.candidate) {
            socketService.current.sendWebRTCIceCandidate(
              userId,
              event.candidate,
            );
          }
        };

        const addLocalTracksToPeerConnection = (retryCount = 0) => {
          if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => {
              peerConnection.addTrack(track, localStreamRef.current);
            });
          } else if (retryCount < 5) {
            console.log(
              `Local stream not ready. Retrying... Attempt ${retryCount + 1}`,
            );
            setTimeout(
              () => addLocalTracksToPeerConnection(retryCount + 1),
              1500,
            );
          } else {
            console.error(
              "Failed to initialize local stream after multiple attempts.",
            );
          }
        };

        addLocalTracksToPeerConnection();

        peerConnections.current[userId] = peerConnection;
      }

      return peerConnections.current[userId];
    };

    setupLocalStream();

    socketService.current.onUserEntered(async data => {
      const userId = data;

      if (userId !== currentUserId) {
        const peerConnection = await setupPeerConnection(userId);
        const offer = await peerConnection.createOffer();

        await peerConnection.setLocalDescription(offer);

        socketService.current.sendWebRTCOffer(userId, offer);
      }
    });

    socketService.current.onWebRTCOffer(async data => {
      const { sender, sdp } = data;
      const peerConnection = await setupPeerConnection(sender);

      await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));

      const answer = await peerConnection.createAnswer();

      await peerConnection.setLocalDescription(answer);

      socketService.current.sendWebRTCAnswer(sender, answer);
    });

    socketService.current.onWebRTCAnswer(async data => {
      const { sender, sdp } = data;
      const peerConnection = peerConnections.current[sender];

      if (peerConnection) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(sdp),
        );
      }
    });

    socketService.current.onWebRTCIceCandidate(async data => {
      const { sender, candidate } = data;
      const peerConnection = peerConnections.current[sender];

      if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      Object.values(peerConnections.current).forEach(pc => pc.close());
      socketService.current.removeAllListeners();
      peerConnections.current = {};
    };
  }, [currentUserId, updateUserStream, setUserEntered]);

  return (
    <div className={PAGE_STYLE}>
      <img src={ChatTheme} alt="Chat Theme" className={THEME_IMAGE_STYLE} />
      <div className={CAMERA_GRID_STYLE}>
        {users
          .filter(user => user.hasEntered)
          .map(user => (
            <video
              key={user.id}
              autoPlay
              playsInline
              className={CAMERA_AREA_STYLE}
              ref={el => {
                if (el && user.stream) {
                  el.srcObject = user.stream;
                }
              }}
            >
              <track kind="captions" />
            </video>
          ))}
      </div>
    </div>
  );
}

export default ChatRoom;
