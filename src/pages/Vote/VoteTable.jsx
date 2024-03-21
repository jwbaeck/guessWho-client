import PropTypes from "prop-types";
import useLobbyStore from "../../stores/useLobbyStore";
import { VOTE_TABLE_STYLE, CHECK_BOX_STYLE } from "../../utils/styleConstants";

function VoteTable({ setSelectedUserId }) {
  const { users, currentUserId } = useLobbyStore();

  const handleVoteChange = (event, userId) => {
    const isChecked = event.target.checked;

    setSelectedUserId(isChecked ? userId : null);
  };

  const filteredUsers = users.filter(user => user.id !== currentUserId);

  return (
    <table className={VOTE_TABLE_STYLE}>
      <thead className="text-lg text-center lg:text-lg uppercase">
        <tr className="text-white">
          <th scope="col" className="py-1">
            닉네임
          </th>
          <th scope="col" className="py-1">
            선택
          </th>
        </tr>
      </thead>
      <tbody className="text-3xl text-center font-bold">
        {filteredUsers.map(user => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={user.id}
          >
            <td className="py-2 text-md lg:text-lg">{user.name}</td>
            <td className="py-4 w-30">
              <label htmlFor={`vote-${user.id}`} className="sr-only">
                {`Vote for ${user.name}`}
              </label>
              <input
                id={`vote-${user.id}`}
                type="radio"
                name="vote"
                className={CHECK_BOX_STYLE}
                onChange={event => handleVoteChange(event, user.id)}
                aria-label={`Vote for ${user.name}`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

VoteTable.propTypes = {
  setSelectedUserId: PropTypes.func.isRequired,
};

export default VoteTable;
