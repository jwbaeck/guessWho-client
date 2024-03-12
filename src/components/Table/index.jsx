import { useState } from "react";

function Table() {
  const [users, setUsers] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
  ]);

  return (
    <table className="text-center w-96 h-80 bg-background-100 opacity-60">
      <caption className="text-3xl text-900 font-bold mb-4">
        Participants List
      </caption>
      <thead>
        <tr>
          <th className="p-2">닉네임</th>
          <th className="p-2">상태</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td className="p-2">{user.name}</td>
            <td className="p-2">🟢</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
