import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  RESULT_BUTTON_STYLE,
  RESULT_BUTTON_STYLE_WHEN_DISABLED,
} from "../../utils/styleConstants";

function ResultButton({ disabled }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      navigate("/result-room");
    }
  };

  const BUTTON_STYLE = `${disabled ? RESULT_BUTTON_STYLE_WHEN_DISABLED : RESULT_BUTTON_STYLE}`;

  return (
    <button className={BUTTON_STYLE} onClick={handleClick} disabled={disabled}>
      결과 확인하기
    </button>
  );
}

ResultButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default ResultButton;
