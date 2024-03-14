import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MAX_USERS from "../../utils/constants";
import {
  LOBBY_BUTTON_STYLE,
  LOBBY_BUTTON_STYLE_WHEN_DISABLED,
} from "../../utils/styleConstants";

function LobbyButton({ usersCount, maxUsers = MAX_USERS }) {
  const navigate = useNavigate();
  const isRoomFull = usersCount >= maxUsers;

  const handleClick = () => {
    if (isRoomFull) {
      navigate("/mission-room");
    }
  };

  const buttonStyle = `${isRoomFull ? LOBBY_BUTTON_STYLE : LOBBY_BUTTON_STYLE_WHEN_DISABLED}`;

  return (
    <button
      type="button"
      className={buttonStyle}
      onClick={handleClick}
      disabled={!isRoomFull}
    >
      미션 확인하기
    </button>
  );
}

LobbyButton.defaultProps = {
  maxUsers: MAX_USERS,
};

LobbyButton.propTypes = {
  usersCount: PropTypes.number.isRequired,
  maxUsers: PropTypes.number,
};

export default LobbyButton;
