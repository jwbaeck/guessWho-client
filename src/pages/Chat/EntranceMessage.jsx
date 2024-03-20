import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IoEnter } from "react-icons/io5";
import { ENTRANCE_MESSAGE_STYLE } from "../../utils/styleConstants";

function EntranceMessage({ userName }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={ENTRANCE_MESSAGE_STYLE}>
      <IoEnter className="mr-2" />
      <span>{userName} 님이 채팅방에 입장하였습니다.</span>
    </div>
  );
}

EntranceMessage.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default EntranceMessage;
