import { FaVoteYea, FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";
import { GO_TO_VOTE_STYLE } from "../../utils/styleConstants";

function VoteButton({ onClick, isActive, isVoted }) {
  return (
    <button
      className={`${GO_TO_VOTE_STYLE} ${!isActive ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={!isActive}
      onClick={onClick}
    >
      {isVoted ? (
        <FaCheck className="inline mr-2" size={50} />
      ) : (
        <FaVoteYea className="inline mr-2" size={50} />
      )}
    </button>
  );
}

VoteButton.defaultProps = {
  onClick: () => {},
  isVoted: false,
};

VoteButton.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  isVoted: PropTypes.bool,
};

export default VoteButton;
