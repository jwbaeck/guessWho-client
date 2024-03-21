import PropTypes from "prop-types";
import { GiVote } from "react-icons/gi";

function VotingButton({ disabled, onVoteSubmit }) {
  const handleClick = () => {
    if (!disabled) {
      onVoteSubmit();
    }
  };

  return (
    <button
      aria-label="Vote now"
      onClick={handleClick}
      disabled={disabled}
      className={`p-2 rounded-lg text-white ${disabled ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"}`}
    >
      <GiVote size={60} />
    </button>
  );
}

VotingButton.defaultProps = {
  disabled: false,
};

VotingButton.propTypes = {
  disabled: PropTypes.bool,
  onVoteSubmit: PropTypes.func.isRequired,
};

export default VotingButton;
