import Layout from "./components/Layout";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import MissionRoom from "./pages/Mission";
import ChatRoom from "./pages/Chat";

const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/lobby", element: <Lobby /> },
      { path: "/mission-room", element: <MissionRoom /> },
      { path: "/chat-room", element: <ChatRoom /> },
    ],
  },
];

export default routes;
