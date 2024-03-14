import PropTypes from "prop-types";
import { MISSION_BUTTON_STYLE } from "../../utils/styleConstants";

function MissionButton({ onClick }) {
  return (
    <button className={MISSION_BUTTON_STYLE} onClick={onClick}>
      내 역할 확인하기
    </button>
  );
}

MissionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MissionButton;
