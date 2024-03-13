import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MAX_USERS from "../../utils/constants";

function LobbyButton({ usersCount, maxUsers = MAX_USERS }) {
  const navigate = useNavigate();
  const isRoomFull = usersCount >= maxUsers;

  const handleClick = () => {
    if (isRoomFull) {
      navigate("/mission-room");
    }
  };

  const buttonStyle = `text-xl ${isRoomFull ? "text-warn-500 border-blue-500" : "text-gray-500 border-gray-500"} opacity-100 border-2 px-4 py-2 rounded`;

  return (
    <button
      type="button"
      className={buttonStyle}
      onClick={handleClick}
      disabled={!isRoomFull}
    >
      Check My Mission
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
