import PropTypes from "prop-types";
import {
  ENTER_ROOM_BUTTON_STYLE,
  ENTER_ROOM_BUTTON_STYLE_WHEN_DISABLED,
} from "../../utils/styleConstants";

function Button({ onClick, disabled }) {
  return (
    <button
      type="submit"
      className={`${ENTER_ROOM_BUTTON_STYLE} ${disabled ? ENTER_ROOM_BUTTON_STYLE_WHEN_DISABLED : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      Enter the Room
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
