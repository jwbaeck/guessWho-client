import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NicknameInput from "./NicknameInput";
import ErrorMessage from "../Info/ErrorMessage";
import Button from "../Button/Button";
import setUpSocket from "../../services/socketService";
import { INPUT_FORM_STYLE } from "../../utils/styleConstants";

function Form() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const socketService = setUpSocket();
  const isInputValid = () => inputValue.length >= 2;

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isInputValid()) {
      const roomNumber = 1;

      socketService.joinRoom(roomNumber);

      socketService.submitNickname(inputValue, roomNumber);
      navigate("/lobby");
    }
  };

  return (
    <form className={INPUT_FORM_STYLE} onSubmit={handleSubmit}>
      <NicknameInput value={inputValue} onChange={handleChange} />
      <ErrorMessage show={!isInputValid()} />
      <Button onClick={handleSubmit} disabled={!isInputValid()} />
    </form>
  );
}

export default Form;
