import React from 'react';

type UseTimerHook = [number, () => void, () => void];

const useTimer = (): UseTimerHook => {
  const [time, setTime] = React.useState(Date.now());
  const [startTime, setStartTime] = React.useState(Date.now());
  const timer = React.useRef<any>();

  React.useEffect(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setTime(Date.now() - startTime), 1);

    return () => clearInterval(timer.current);
  }, [setTime, startTime, timer]);

  const start = () => setStartTime(Date.now());
  const stop = () => clearInterval(timer.current);

  return [time, start, stop];
};

export default useTimer;
