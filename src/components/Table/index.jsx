import { useEffect } from "react";
import setUpSocket from "../../services/socketService";
import useLobbyStore from "../../stores/useLobbyStore";
import MAX_USERS from "../../utils/constants";

function Table() {
  const { users, setUsers } = useLobbyStore();

  useEffect(() => {
    const socketService = setUpSocket();

    const handleUpdateUsers = updatedUserList => {
      setUsers(updatedUserList);
    };

    socketService.onUpdateUsers(handleUpdateUsers);

    return () => {
      socketService.removeAllListeners();
    };
  }, []);

  const displayedUsers = [...users];

  for (let i = users.length; i < MAX_USERS; i += 1) {
    displayedUsers.push({ id: `empty-${i}`, name: "", status: "🔴" });
  }

  return (
    <table className="text-center font-weight-bold w-96 h-80 bg-background-100 opacity-60">
      <caption className="text-3xl text-text-50 font-bold mb-4">
        Participants List
      </caption>
      <thead>
        <tr>
          <th className="p-2">닉네임</th>
          <th className="p-2">상태</th>
        </tr>
      </thead>
      <tbody>
        {displayedUsers.map(user => (
          <tr key={user.id} className="font-bold">
            <td className="p-2">{user.name || "대기 중..."}</td>
            <td className="p-2">{user.status || "🟢"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
