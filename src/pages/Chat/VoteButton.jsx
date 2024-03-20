import { FaVoteYea } from "react-icons/fa";
import PropTypes from "prop-types";
import { GO_TO_VOTE_STYLE } from "../../utils/styleConstants";

function VoteButton({ isActive, onClick }) {
  return (
    <button
      className={`${GO_TO_VOTE_STYLE} ${!isActive ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={!isActive}
      onClick={onClick}
    >
      <FaVoteYea className="inline mr-2" size={50} />
      투표하기
    </button>
  );
}

VoteButton.defaultProps = {
  onClick: () => {},
};

VoteButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default VoteButton;
