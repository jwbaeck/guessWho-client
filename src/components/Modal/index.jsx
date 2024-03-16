import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DecodingButton from "../Button/DecodingButton";
import SteganographyImage from "../SteganographyImage/SteganographyImage";
import CategoryImage from "../../assets/food.png";
import { decodeTextFromImage } from "../../utils/ImageUtils";

function Modal({ isOpen, onClose, isLiar }) {
  const canvasRef = useRef(null);
  const [decodedText, setDecodedText] = useState("");

  const handleDecodeClick = () => {
    if (canvasRef.current) {
      const textFromImage = decodeTextFromImage(canvasRef);

      setDecodedText(textFromImage);
    }
  };

  if (!isOpen) {
    return null;
  }

  const textStyle = {
    minHeight: "20px",
    marginTop: "16px",
    textAlign: "center",
    visibility: decodedText ? "visible" : "hidden",
  };
  const roleMessage = isLiar ? "라이어" : "일반 시민";
  const secretText = isLiar ? "You are a Liar" : "Pizza";

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white p-5 rounded w-3/4 max-w-2xl h-auto">
        <div className="text-lg text-center text-text-800 font-bold mb-4">
          {`당신은 ${roleMessage} 입니다.`}
        </div>
        <SteganographyImage
          ref={canvasRef}
          imageSrc={CategoryImage}
          secretText={secretText}
        />
        <DecodingButton onClick={handleDecodeClick} />
        <div style={textStyle}>{decodedText}</div>
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
  isLiar: PropTypes.bool.isRequired,
};

export default Modal;
