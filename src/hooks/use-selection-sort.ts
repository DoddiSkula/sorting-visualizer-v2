import { useState, useRef, useEffect, useCallback } from "react";
import usePlaybackControl from "./use-playback-control";

const useSelectionSort = (initialArray: number[], delay: number = 500) => {
  const [array, setArray] = useState<number[]>([...initialArray]);
  const [currentIndices, setCurrentIndices] = useState<{
    i: number;
    j: number;
    min: number;
  }>({ i: 0, j: 1, min: 0 });
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const iRef = useRef(0);
  const jRef = useRef(1);
  const minRef = useRef(0);

  const sortStep = useCallback(() => {
    const i = iRef.current;
    const j = jRef.current;
    const min = minRef.current;
    const arr = [...array];

    if (i >= arr.length - 1) {
      setIsSorted(true);
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

  const { isRunning, start, stop, reset } = usePlaybackControl(sortStep, delay);

  const resetVisualization = useCallback(() => {
    reset();
    setIsSorted(false);
    setArray([...initialArray]);
    setCurrentIndices({
      i: 0,
      j: 0,
      min: 0,
    });
    iRef.current = 0;
    jRef.current = 1;
    minRef.current = 0;
  }, [reset, initialArray]);

  useEffect(() => {
    if (isSorted) {
      stop();
    }
  }, [isSorted, stop]);

  useEffect(() => {
    setIsSorted(false);
    resetVisualization();
    setArray([...initialArray]);
  }, [initialArray, resetVisualization]);

  return {
    array,
    currentIndices,
    start,
    stop,
    resetVisualization,
    isRunning,
    isSorted,
  };
};

export default useSelectionSort;
