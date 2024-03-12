import Table from "../../components/Table";
import LobbyTheme from "../../assets/lobby_theme.png";
import LobbyButton from "../../components/Button/LobbyButton";

function Lobby() {
  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <img
        src={LobbyTheme}
        alt="Lobby Theme"
        className="w-full h-full object-cover absolute z-[-1]"
      />
      <div className="flex flex-col items-center justify-left w-full h-full">
        <Table />
        <div className="mt-10">
          <LobbyButton />
        </div>
      </div>
    </div>
  );
}

export default Lobby;
