import { useState, useRef, useEffect, useCallback } from "react";

const usePlaybackControl = (callback: () => void, delay: number) => {
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [intervalRef, stop]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(callback, delay);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, delay, callback]);

  return { isRunning, start, stop, reset };
};

export default usePlaybackControl;
