import PropTypes from "prop-types";
import {
  RESULT_BUTTON_STYLE,
  RESULT_BUTTON_STYLE_WHEN_DISABLED,
} from "../../utils/styleConstants";

function ResultButton({ disabled, isVoted, onClick }) {
  const VISIBLE_CLASS = isVoted ? "visible" : "invisible";
  const BUTTON_STYLE = `${disabled ? RESULT_BUTTON_STYLE_WHEN_DISABLED : RESULT_BUTTON_STYLE} ${VISIBLE_CLASS}`;
  const BUTTON_TEXT = disabled ? "투표 완료 대기중.." : "결과 확인하기";

  return (
    <button className={BUTTON_STYLE} disabled={disabled} onClick={onClick}>
      {BUTTON_TEXT}
    </button>
  );
}

ResultButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  isVoted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ResultButton;
