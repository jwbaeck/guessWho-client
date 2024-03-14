import { useState } from "react";
import Description from "../../components/Info/Description";
import MissionButton from "../../components/Button/MissionButton";
import ChatEntranceButton from "../../components/Button/ChatEntranceButton";
import Modal from "../../components/Modal";
import MissionRoomTheme from "../../assets/mission_room_theme.png";
import { THEME_IMAGE_STYLE } from "../../utils/styleConstants";

function MissionRoom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMissionButtonClicked, setIsMissionButtonClicked] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsMissionButtonClicked(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <img
        className={THEME_IMAGE_STYLE}
        src={MissionRoomTheme}
        alt="Mission Room Theme"
      />
      <div className="flex flex-col items-center">
        <Description />
        <MissionButton onClick={handleOpenModal} />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        <ChatEntranceButton isEnabled={isMissionButtonClicked} />
      </div>
    </div>
  );
}

export default MissionRoom;
