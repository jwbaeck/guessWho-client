import { useState, useEffect } from "react";
import VoteDescription from "./VoteDescription";
import VoteTable from "./VoteTable";
import VotingButton from "./VotingButton";
import ResultButton from "./ResultButton";
import setUpSocket from "../../services/socketService";
import useGameResultStore from "../../stores/useGameResultStore";

function VotingForm() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [resultAvailable, setResultAvailable] = useState(false);
  const socket = setUpSocket();

  useEffect(() => {
    socket.onVoteResults(data => {
      useGameResultStore.getState().setGameResult(data);

      setResultAvailable(true);
    });

    return () => {
      socket.onVoteResults(null);
    };
  }, [socket]);

  const submitVote = () => {
    if (selectedUserId) {
      socket.submitVote({ votedForId: selectedUserId });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <VoteDescription />
      <VoteTable
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      <VotingButton onVoteSubmit={submitVote} disabled={!selectedUserId} />
      <ResultButton disabled={!resultAvailable} />
    </div>
  );
}

export default VotingForm;
