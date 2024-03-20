import VoteDescription from "./VoteDescription";
import VoteTable from "./VoteTable";
import VotingButton from "./VotingButton";

function VotingForm() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <VoteDescription />
      <div className="w-full flex justify-center">
        <VoteTable />
      </div>
      <div className="w-full flex justify-center mt-5">
        <VotingButton />
      </div>
    </div>
  );
}

export default VotingForm;
