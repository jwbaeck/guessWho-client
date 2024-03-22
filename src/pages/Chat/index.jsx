import { useState, useEffect, useRef } from "react";
import GameTimer from "./GameTimer";
import EntranceMessage from "./EntranceMessage";
import Camera from "./Camera";
import TimeoutModal from "./TimeoutModal";
import VoteButton from "./VoteButton";
import ResultButton from "./ResultButton";
import ResultModal from "./ResultModal";
import ChatTheme from "../../assets/chat_theme.png";
import useLobbyStore from "../../stores/useLobbyStore";
import useGameResultStore from "../../stores/useGameResultStore";
import setUpSocket from "../../services/socketService";
import { determineImageForUsers } from "../../utils/gameUtils";
import {
  PAGE_STYLE,
  THEME_IMAGE_STYLE,
  CAMERA_GRID_STYLE,
  ENTRANCE_MESSAGE_CONTAINER_STYLE,
} from "../../utils/styleConstants";

function ChatRoom() {
  const { users, currentUserId, updateUserStream, setUserEntered } =
    useLobbyStore();
  const { isLiarCorrectlyIdentified } = useGameResultStore();
  const [entranceMessages, setEntranceMessages] = useState([]);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedNickname, setSelectedNickname] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [isResultsReady, setIsResultsReady] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [usersWithImages, setUsersWithImages] = useState([]);
  const socketService = setUpSocket();
  const peerConnections = useRef({});
  const setGameResult = useGameResultStore(state => state.setGameResult);

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

  const handleSelectCamera = (nickname, userId) => {
    if (isTimeUp && userId !== currentUserId) {
      setSelectedNickname(nickname);
    }
  };

  const handleVoteButtonClick = () => {
    const selectedUser = users.find(user => user.name === selectedNickname);

    if (selectedUser) {
      setIsVoted(true);
      socketService.submitVote({ userId: selectedUser.id });
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

  useEffect(() => {
    if (isTimeUp) {
      users.forEach(user => {
        if (user.stream) {
          user.stream.getAudioTracks().forEach(track => {
            track.enabled = false;
          });
        }
      });

      setShowModal(true);

      const handleVoteResults = data => {
        console.log(data);

        setGameResult(data);
        setIsResultsReady(true);
      };

      socketService.onVoteResults(handleVoteResults);
    }
  }, [isTimeUp, users]);

  const handleResultButtonClick = () => {
    setShowResultModal(true);

    const updatedUsersWithImages = determineImageForUsers(
      users,
      isLiarCorrectlyIdentified,
    );

    setUsersWithImages(updatedUsersWithImages);
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
  };

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
      <div className="flex flex-col items-center">
        <div className={CAMERA_GRID_STYLE}>
          {users
            .filter(user => user.hasEntered)
            .map(user => (
              <Camera
                key={user.id}
                nickname={user.name}
                stream={user.stream}
                isSelected={selectedNickname === user.name}
                onSelect={handleSelectCamera}
                userId={user.id}
                imageToShow={usersWithImages.find(u => u.id === user.id)?.image}
              />
            ))}
        </div>
        {showModal && <TimeoutModal onClose={() => setShowModal(false)} />}
        <VoteButton
          onClick={handleVoteButtonClick}
          isTimeUp={isTimeUp}
          isVoted={isVoted}
        />
        <ResultButton
          disabled={!isResultsReady}
          isVoted={isVoted}
          onClick={handleResultButtonClick}
        />
        {showResultModal && <ResultModal onClose={handleCloseResultModal} />}
      </div>
    </div>
  );
}

export default ChatRoom;
