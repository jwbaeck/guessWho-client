import { useState } from "react";
import { useNavigate } from "react-router-dom";
import setUpSocket from "../../services/socketService";
import NicknameInput from "./NicknameInput";
import ErrorMessage from "../Info/ErrorMessage";
import Button from "../Button/Button";
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
      socketService.submitNickname(inputValue);
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
