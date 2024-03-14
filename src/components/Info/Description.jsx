function Description() {
  return (
    <div className="text-xl text-center text-white font-bold">
      <h2 className="text-warn-500 underline">Game Rule</h2>
      <br />
      <p>게임 제한시간은 5분 입니다.</p>
      <br />
      <p>▫️ 참가자 중 한 명은 라이어로, 나머지는 일반 참가자가 됩니다.</p>
      <br />
      <p>
        ▫️ 모든 참가자는 동일한 이미지를 제공받고, 열쇠 버튼을 클릭해 숨겨진
        단어를 해독할 수 있습니다.
      </p>
      <br />
      <p>
        ▫️ 라이어를 제외한 모든 참가자는 동일한 단어를, 라이어는 You are a Liar
        라는 키워드를 제시받습니다.
      </p>
      <br />
      <p>
        ▫️ 참가자들은 차례대로 단어에 대해 설명하고, 라이어는 다른 참가자들의
        설명을 듣고 정답을 추론하여 설명합니다.
      </p>
      <br />
      <p>
        ▫️ 게임 종료 후 라이어를 찾아 투표하며, 라이어가 정답을 맞히거나 잘못
        지목되면 라이어가 승리합니다.
      </p>
    </div>
  );
}

export default Description;
