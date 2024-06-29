import { useState, useRef, useEffect, useCallback } from "react";

type UsePlaybackReturn = {
  index: number;
  isPlaying: boolean;
  isPaused: boolean;
  start: () => void;
  stop: () => void;
  pause: () => void;
  reset: () => void;
};

const usePlayback = (arraySize: number, fps: number): UsePlaybackReturn => {
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
    setIndex(0); // Reset the index to 0 when stopping
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
            stop(); // Stop the playback if index exceeds arraySize - 1
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
