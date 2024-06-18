import { useState, useRef, useEffect, useCallback } from "react";
import usePlaybackControl from "./usePlaybackControl";

const useSelectionSort = (initialArray: number[], delay: number = 500) => {
  const [array, setArray] = useState<number[]>([...initialArray]);
  const [currentIndices, setCurrentIndices] = useState<{
    i: number;
    j: number;
    min: number;
  }>({ i: 0, j: 1, min: 0 });
  const [sorted, setSorted] = useState<boolean>(false);

  const iRef = useRef(0);
  const jRef = useRef(1);
  const minRef = useRef(0);

  const sortStep = useCallback(() => {
    const i = iRef.current;
    const j = jRef.current;
    const min = minRef.current;
    const arr = [...array];

    if (i >= arr.length - 1) {
      setSorted(true);
      return;
    }

    if (j >= arr.length) {
      if (i !== min) {
        [arr[i], arr[min]] = [arr[min], arr[i]];
        setArray([...arr]);
      }
      iRef.current++;
      minRef.current = iRef.current;
      jRef.current = iRef.current + 1;
    } else {
      if (arr[j] < arr[min]) {
        minRef.current = j;
      }
      jRef.current++;
    }

    setCurrentIndices({
      i: iRef.current,
      j: jRef.current,
      min: minRef.current,
    });
  }, [array]);

  const { isRunning, isPaused, start, stop, pause, resume } =
    usePlaybackControl(sortStep, delay);

  useEffect(() => {
    if (sorted) {
      stop();
    }
  }, [sorted, stop]);

  useEffect(() => {
    setArray([...initialArray]);
    setCurrentIndices({
      i: 0,
      j: 0,
      min: 0,
    });
    iRef.current = 0;
    jRef.current = 0;
    minRef.current = 0;
  }, [initialArray]);

  return {
    array,
    currentIndices,
    start,
    stop,
    pause,
    resume,
    isRunning,
    isPaused,
    sorted,
  };
};

export default useSelectionSort;
