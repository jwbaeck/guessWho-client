import { GiVote } from "react-icons/gi";

function VotingButton() {
  return (
    <button aria-label="Vote now">
      <GiVote size={60} />
    </button>
  );
}

export default VotingButton;
