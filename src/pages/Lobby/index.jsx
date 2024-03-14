import Table from "../../components/Table";
import LobbyButton from "../../components/Button/LobbyButton";
import LobbyTheme from "../../assets/lobby_theme.png";
import useLobbyStore from "../../stores/useLobbyStore";
import { THEME_IMAGE_STYLE } from "../../utils/styleConstants";

function Lobby() {
  const users = useLobbyStore(state => state.users);
  const usersCount = users.length;

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <img className={THEME_IMAGE_STYLE} src={LobbyTheme} alt="Lobby Theme" />
      <div className="flex flex-col items-center justify-left w-full h-full">
        <Table users={users} />
        <div className="mt-10">
          <LobbyButton usersCount={usersCount} />
        </div>
      </div>
    </div>
  );
}

export default Lobby;
