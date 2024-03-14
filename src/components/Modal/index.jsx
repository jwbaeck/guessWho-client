import PropTypes from "prop-types";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DecodingButton from "../Button/DecodingButton";
import MissionRoomTheme from "../../assets/mission_room_theme.png";

function Modal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white p-5 rounded w-3/4 max-w-2xl h-auto">
        <div className="text-lg text-center text-text-800 font-bold mb-4">
          당신의 역할은..
        </div>
        <img src={MissionRoomTheme} alt="Mock Theme" />
        <DecodingButton />
        <button
          className="px-4 py-2 rounded"
          onClick={onClose}
          aria-label="Close"
        >
          <IoIosCloseCircleOutline className="mt-10" size={40} />
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
