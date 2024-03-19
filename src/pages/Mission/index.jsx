import { useState } from "react";
import Description from "../../components/Info/Description";
import MissionButton from "../../components/Button/MissionButton";
import ChatEntranceButton from "../../components/Button/ChatEntranceButton";
import Modal from "../../components/Modal";
import MissionRoomTheme from "../../assets/mission_room_theme.png";
import useLobbyStore from "../../stores/useLobbyStore";
import { PAGE_STYLE, THEME_IMAGE_STYLE } from "../../utils/styleConstants";

function MissionRoom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMissionButtonClicked, setIsMissionButtonClicked] = useState(false);
  const { isLiar } = useLobbyStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsMissionButtonClicked(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={PAGE_STYLE}>
      <img
        className={THEME_IMAGE_STYLE}
        src={MissionRoomTheme}
        alt="Mission Room Theme"
      />
      <div className="flex flex-col items-center">
        <Description />
        <MissionButton onClick={handleOpenModal} />
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isLiar={isLiar}
        />
        <ChatEntranceButton isEnabled={isMissionButtonClicked} />
      </div>
    </div>
  );
}

export default MissionRoom;
