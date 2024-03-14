import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CHAT_ENTRANCE_BUTTON_STYLE } from "../../utils/styleConstants";

function ChatEntranceButton({ isEnabled }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isEnabled) {
      navigate("/chat-room");
    }
  };

  return (
    <button
      className={CHAT_ENTRANCE_BUTTON_STYLE}
      onClick={handleClick}
      disabled={!isEnabled}
    >
      채팅방 입장하기
    </button>
  );
}

ChatEntranceButton.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
};

export default ChatEntranceButton;
