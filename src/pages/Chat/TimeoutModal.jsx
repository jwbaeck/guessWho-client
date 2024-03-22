import PropTypes from "prop-types";
import { IoMdAlert } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { MODAL_STYLE } from "../../utils/styleConstants";

function TimeoutModal({ onClose }) {
  return (
    <div className={MODAL_STYLE}>
      <div className="bg-white text-center p-10 rounded-lg">
        <h2 className="text-2xl text-warn-800 font-bold">
          <IoMdAlert className="inline mr-2 mb-2" />
          채팅이 종료되었습니다
          <IoMdAlert className="inline ml-2 mb-2" />
        </h2>
        <div className="text-xl text-black">
          <br />
          <p>라이어로 의심 되는 사람을 투표해주세요.</p>
          <br />
          <p>• 상대의 카메라 화면을 클릭하여 선택 가능합니다.</p>
          <p>• 선택 완료 후 아래의 버튼을 눌러 결과를 확인할 수 있습니다.</p>
          <p>• 본인을 제외한 참여자에 대한 투표만 가능합니다.</p>
          <p>• 더 이상의 추가 토의는 불가합니다.</p>
          <p>• 중복 투표는 불가합니다.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-7 p-2 rounded"
          aria-label="닫기"
        >
          <IoCloseCircle size={30} />
          <span className="sr-only">닫기</span>
        </button>
      </div>
    </div>
  );
}

TimeoutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TimeoutModal;
