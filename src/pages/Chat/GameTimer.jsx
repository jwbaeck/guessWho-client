import { useState, useEffect } from "react";
import { FcAlarmClock } from "react-icons/fc";
import PropTypes from "prop-types";
import { GAME_TIMER_STYLE } from "../../utils/styleConstants";

function GameTimer({ startTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const updateTimeLeft = () => {
      const currentTime = new Date();
      const gameStartTime = new Date(startTime);
      const timeDiffer = gameStartTime - currentTime;

      setTimeLeft(Math.max(Math.floor(timeDiffer / 1000), 0));
    };

    updateTimeLeft();

    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  if (timeLeft === null) {
    return null;
  }

  return (
    <div className={GAME_TIMER_STYLE}>
      <FcAlarmClock size={50} />
      <span>
        0{Math.floor(timeLeft / 60)}:{`0${timeLeft % 60}`.slice(-2)}
      </span>
    </div>
  );
}

GameTimer.propTypes = {
  startTime: PropTypes.func.isRequired,
  onTimeUp: PropTypes.func.isRequired,
};

export default GameTimer;
