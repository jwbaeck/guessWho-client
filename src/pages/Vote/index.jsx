import VotingForm from "./VotingForm";
import VoteRoomTheme from "../../assets/vote_room_theme.png";
import { PAGE_STYLE, THEME_IMAGE_STYLE } from "../../utils/styleConstants";

function VoteRoom() {
  return (
    <div className={`${PAGE_STYLE} flex flex-col items-center justify-center`}>
      <img
        className={THEME_IMAGE_STYLE}
        src={VoteRoomTheme}
        alt="VoteRoom Theme"
      />
      <VotingForm />
    </div>
  );
}

export default VoteRoom;
