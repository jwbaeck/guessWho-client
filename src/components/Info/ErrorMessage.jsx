import PropTypes from "prop-types";

function ErrorMessage({ show }) {
  return (
    <p
      className={`text-warn-700 text-lg font-bold ${show ? "visible" : "invisible"} mt-3 mb-3`}
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
