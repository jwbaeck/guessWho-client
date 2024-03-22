import LiarImage from "../assets/clown.png";
import SmileImage from "../assets/smile.png";
import CryImage from "../assets/cry.png";

export function determineImageForUsers(users, isLiarIdentified) {
  const liarId = users.find(user => user.isLiar).id;

  return users.map(user => {
    if (user.id === liarId) {
      return { ...user, image: LiarImage };
    }

    return { ...user, image: isLiarIdentified ? SmileImage : CryImage };
  });
}

export function describeGameResult(users, isLiarCorrectlyIdentified, votes) {
  const liarName = users.find(user => user.isLiar).name;
  let resultMessage = `${isLiarCorrectlyIdentified ? "🎺 일반 시민의 승리입니다 🎺" : "🤡 라이어의 승리입니다 🤡"}\n\n라이어: ${liarName}\n\n득표 현황\n`;

  users.forEach(user => {
    const voteCount = votes[user.id] || 0;
    resultMessage += `• ${user.name} 님: ${voteCount} 표\n`;
  });

  return resultMessage;
}
