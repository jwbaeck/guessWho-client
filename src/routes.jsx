import Layout from "./components/Layout";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import MissionRoom from "./pages/Mission";
import ChatRoom from "./pages/Chat";
import VoteRoom from "./pages/Vote";
import ResultRoom from "./pages/Result";

const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/lobby", element: <Lobby /> },
      { path: "/mission-room", element: <MissionRoom /> },
      { path: "/chat-room", element: <ChatRoom /> },
      { path: "/vote-room", element: <VoteRoom /> },
      { path: "/result-room", element: <ResultRoom /> },
    ],
  }
];

export default routes;
