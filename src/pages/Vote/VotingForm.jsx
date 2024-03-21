import { useState, useEffect } from "react";
import VoteDescription from "./VoteDescription";
import VoteTable from "./VoteTable";
import VotingButton from "./VotingButton";
import ResultButton from "./ResultButton";
import setUpSocket from "../../services/socketService";

function VotingForm() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [resultAvailable, setResultAvailable] = useState(false);
  const socket = setUpSocket();

  useEffect(() => {
    socket.onVoteResults(data => {
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
      <div className="w-full flex justify-center">
        <VoteTable
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
      </div>
      <div className="w-full flex justify-center mt-5">
        <VotingButton onVoteSubmit={submitVote} disabled={!selectedUserId} />
      </div>
      <ResultButton disabled={!resultAvailable} />
    </div>
  );
}

export default VotingForm;
