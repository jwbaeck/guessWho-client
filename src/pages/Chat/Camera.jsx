import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CAMERA_AREA_STYLE, VIDEO_STYLE } from "../../utils/styleConstants";

function Camera({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log("미디어스트림을 위한 카메라");
    console.log(stream);

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
    </div>
  );
}

Camera.defaultProps = {
  stream: null,
};

Camera.propTypes = {
  stream: PropTypes.shape({
    getTracks: PropTypes.func,
  }),
};

export default Camera;
