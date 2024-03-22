import PropTypes from "prop-types";
import useGameResultStore from "../../stores/useGameResultStore";

function ResultModal({ onClose }) {
  const { isLiarCorrectlyIdentified, votes, topVotedUserId } =
    useGameResultStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">투표 결과</h2>
        {isLiarCorrectlyIdentified ? (
          <p>거짓말쟁이가 정확히 식별되었습니다!</p>
        ) : (
          <p>거짓말쟁이를 찾는 데 실패했습니다.</p>
        )}
        <div className="mt-4">
          <p>가장 많은 표를 받은 사용자 ID: {topVotedUserId}</p>
          <p>투표 상세:</p>
          <ul>
            {Object.entries(votes).map(([userId, voteCount]) => (
              <li key={userId}>
                {userId}: {voteCount}표
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-700"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

ResultModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ResultModal;
