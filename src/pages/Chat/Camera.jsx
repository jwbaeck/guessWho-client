import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  CAMERA_AREA_STYLE,
  VIDEO_STYLE,
  USER_NAME_AREA_STYLE,
} from "../../utils/styleConstants";

function Camera({ nickname, stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={CAMERA_AREA_STYLE}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%" }}
        className={VIDEO_STYLE}
      >
        <track kind="captions" />
      </video>
      <div className={USER_NAME_AREA_STYLE}>{nickname}</div>
    </div>
  );
}

Camera.defaultProps = {
  stream: null,
};

Camera.propTypes = {
  nickname: PropTypes.string.isRequired,
  stream: PropTypes.shape({
    getTracks: PropTypes.func,
  }),
};

export default Camera;
