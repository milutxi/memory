import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./CountDown.css";

//values in milliseconds
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const CountDown = forwardRef(({ duration, onExpire }, ref) => {
  const [time, setTime] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useImperativeHandle(ref, () => ({
    stop: () => {
      setIsActive(false);
    },
    reset: (newDuration) => {
      setTime(newDuration);
      setIsActive(true);
    },
  }));

  useEffect(() => {
    if (!isActive) return;

    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 100) {
          onExpire && onExpire();
          setIsActive(false); //still show me the timer
          return 0;
        }
        return prevTime - 100;
      });
    }, 100);

    //clean up
    return () => {
      clearInterval(timerId);
    };
  }, [isActive, onExpire]);

  const getFormattedTime = (time) => {
    const days = Math.floor(time / DAY);
    const hours = Math.floor((time % DAY) / HOUR);
    const minutes = Math.floor((time % HOUR) / MINUTE);
    const seconds = Math.floor((time % MINUTE) / SECOND);
    const milliseconds = time % SECOND;

    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  };

  const formattedTime = getFormattedTime(time);

  return (
    <div className="wrap">
      <div className="content">
        <div className="box">
          <div className="value" data-testid="minutes">{formattedTime.minutes}</div>
          <div className="label">Min.</div>
        </div>
        <div></div>
        <div className="box">
          <div className="value" data-testid="seconds">{formattedTime.seconds}</div>
          <div className="label">Seconds</div>
        </div>
        <div className="box">
          <div className="value" data-testid="millisec">{formattedTime.milliseconds}</div>
          <div className="label">Millisec.</div>
        </div>
      </div>
    </div>
  );
});

// CountDown.defaultProps = {
//   duration: 60*1000,
// };

export default CountDown;
