import { FaVoteYea } from "react-icons/fa";

function VoteDescription() {
  return (
    <div className="text-center font-bold">
      <h2 className="text-3xl text-warn-800">
        <FaVoteYea className="inline mr-2 mb-2" />
        투표 진행
        <FaVoteYea className="inline ml-2 mb-2" />
      </h2>
      <div className="text-xl text-white">
        <br />
        <p>라이어로 의심 되는 사람에 대한 투표를 진행해주세요.</p>
        <br />
        <p>▫️ 게임 간 가장 의심스러웠던 사람을 투표합니다.</p>
        <p>▫️ 라이어 또한 이 점을 이용하여 승률을 높일 수 있습니다.</p>
        <p>▫️ 선택 완료 후 아래의 버튼을 눌러 결과를 확인할 수 있습니다.</p>
        <p>▫️ 본인을 제외한 참여자에 대한 투표만 가능합니다.</p>
        <p>▫️ 중복 투표는 불가합니다.</p>
      </div>
    </div>
  );
}

export default VoteDescription;
