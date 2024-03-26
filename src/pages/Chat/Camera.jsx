import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  CAMERA_AREA_STYLE,
  VIDEO_STYLE,
  USER_NAME_AREA_STYLE,
  SELECTED_CAMERA_STYLE,
} from "../../utils/styleConstants";

function Camera({
  nickname,
  userId,
  stream,
  isSelected,
  onSelect,
  imageToShow,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !imageToShow) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, imageToShow]);

  const handleCameraClick = () => {
    onSelect(nickname, userId);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter" || event.key === " ") {
      onSelect(nickname, userId);
    }
  };

  return (
    <div
      className={`${CAMERA_AREA_STYLE} ${isSelected ? SELECTED_CAMERA_STYLE : ""}`}
      onClick={handleCameraClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      {imageToShow ? (
        <img src={imageToShow} alt="User" className={VIDEO_STYLE} />
      ) : (
        <video ref={videoRef} autoPlay playsInline className={VIDEO_STYLE}>
          <track kind="captions" />
        </video>
      )}
      <div className={USER_NAME_AREA_STYLE}>{nickname}</div>
    </div>
  );
}

Camera.defaultProps = {
  stream: null,
  imageToShow: null,
};

Camera.propTypes = {
  nickname: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  stream: PropTypes.shape({
    getTracks: PropTypes.func,
  }),
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  imageToShow: PropTypes.string,
};

export default Camera;
