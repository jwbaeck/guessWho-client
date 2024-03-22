import PropTypes from "prop-types";
import { FaVoteYea } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import useLobbyStore from "../../stores/useLobbyStore";
import useGameResultStore from "../../stores/useGameResultStore";
import { describeGameResult } from "../../utils/gameUtils";
import { MODAL_STYLE } from "../../utils/styleConstants";

function ResultModal({ onClose }) {
  const lobbyStore = useLobbyStore();
  const gameResultStore = useGameResultStore();

  const gameResultMessage = describeGameResult(
    lobbyStore.users,
    gameResultStore.isLiarCorrectlyIdentified,
    gameResultStore.votes,
  );

  return (
    <div className={`${MODAL_STYLE} opacity-90`}>
      <div className="bg-background-100 text-center p-4 rounded-lg shadow-xl w-2/4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-warn-500">
          <FaVoteYea className="inline mr-2 mb-2" />
          투표 결과
          <FaVoteYea className="inline ml-2 mb-2" />
        </h2>
        <pre className="text-xl font-bold">{gameResultMessage}</pre>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-700"
          aria-label="Close"
        >
          <IoIosCloseCircle size={40} className="mt-10" />
        </button>
      </div>
    </div>
  );
}

ResultModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ResultModal;
