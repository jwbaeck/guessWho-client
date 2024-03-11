import PropTypes from "prop-types";

function ErrorMessage({ show }) {
  return (
    <p
      className={`text-warn-700 mb-2 text-lg ${show ? "visible" : "invisible"}`}
      style={{ visibility: show ? "visible" : "hidden" }}
    >
      닉네임을 2글자 이상 입력해주세요.
    </p>
  );
}

ErrorMessage.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ErrorMessage;
