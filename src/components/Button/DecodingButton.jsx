import { FaKey } from "react-icons/fa";
import PropTypes from "prop-types";

function DecodingButton({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Decoding Button">
      <FaKey size={30} className="mt-10" />
    </button>
  );
}

DecodingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DecodingButton;
