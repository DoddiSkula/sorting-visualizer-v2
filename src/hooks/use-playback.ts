import { useState, useRef, useEffect, useCallback } from "react";

const usePlayback = (arraySize: number, fps: number) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (arraySize > 0) {
      setIsPlaying(true);
      setIsPaused(false);
    }
  }, [arraySize]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setIndex(0);
  }, []);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(true);
  }, []);

  const reset = useCallback(() => {
    setIndex(0);
    setIsPlaying(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        setIndex((prevIndex) => {
          if (prevIndex >= arraySize - 1) {
            stop();
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, 1000 / fps);
      intervalRef.current = intervalId;

      return () => {
        clearInterval(intervalId);
        intervalRef.current = null;
      };
    }
  }, [isPlaying, fps, arraySize, stop]);

  return { index, isPlaying, isPaused, start, stop, pause, reset };
};

export default usePlayback;
