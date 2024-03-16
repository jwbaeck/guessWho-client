import { forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import { hideTextInImage } from "../../utils/ImageUtils";

const SteganographyImage = forwardRef(({ imageSrc, secretText }, ref) => {
  useEffect(() => {
    if (ref.current) {
      hideTextInImage(ref, imageSrc, secretText);
    }
  }, [ref, imageSrc, secretText]);

  return <canvas ref={ref} style={{ width: "100%", height: "auto" }} />;
});

SteganographyImage.displayName = "SteganographyImage";

SteganographyImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  secretText: PropTypes.string.isRequired,
};

export default SteganographyImage;
