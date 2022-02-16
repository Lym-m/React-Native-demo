import {useState, useEffect, useRef} from 'react';

export default function useCountdown(total) {
  const [isStart, setIsStart] = useState(false);
  const [second, setSecond] = useState(total);
  const timer = useRef();

  useEffect(() => {
    if (isStart) {
      timer.current = setInterval(() => {
        setSecond(second => {
          if (second <= 0 && timer.current) {
            clearInterval(timer.current);
            timer.current = undefined;
            setIsStart(false);
            return total;
          }
          return second - 1;
        });
      }, 1000);
    } else if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  }, [isStart, total]);
  return {
    isStart,
    second,
    startCountdown() {
      setIsStart(true);
    },
    stopCountdown() {
      setIsStart(false);
    },
  };
}
