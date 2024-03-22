import { FaVoteYea, FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";
import { GO_TO_VOTE_STYLE } from "../../utils/styleConstants";

function VoteButton({ onClick, isTimeUp, isVoted }) {
  const VISIBLE = isTimeUp ? "visible" : "invisible";

  return (
    <button className={`${GO_TO_VOTE_STYLE} ${VISIBLE}`} onClick={onClick}>
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
  isVoted: PropTypes.bool,
  isTimeUp: PropTypes.bool.isRequired,
};

export default VoteButton;
