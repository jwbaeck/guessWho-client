import PropTypes from "prop-types";
import { NICKNAME_INPUT_STYLE } from "../../utils/styleConstants";

function NicknameInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={NICKNAME_INPUT_STYLE}
    />
  );
}

NicknameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NicknameInput;
