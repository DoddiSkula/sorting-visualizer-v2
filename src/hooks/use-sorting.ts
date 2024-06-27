import { useState, useCallback, useEffect } from "react";
import usePlaybackControl from "./use-playback-control";
import useSelectionSort from "./use-selection-sort";

const useSorting = (initialArray: number[], delay: number = 500) => {
  const [array, setArray] = useState<number[]>([...initialArray]);
  const [currentIndices, setCurrentIndices] = useState<Record<string, number>>(
    {}
  );
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const selectionSort = useSelectionSort(
    isSorted,
    array,
    setArray,
    setIsSorted,
    setCurrentIndices
  );

  const { isRunning, start, stop, reset } = usePlaybackControl(
    selectionSort,
    delay
  );

  const resetVisualization = useCallback(() => {
    reset();
    setIsSorted(false);
    setArray([...initialArray]);
    setCurrentIndices({});
  }, [reset, initialArray]);

  useEffect(() => {
    if (isSorted) {
      stop();
    }
  }, [isSorted, stop]);

  useEffect(() => {
    resetVisualization();
  }, [initialArray, resetVisualization]);

  return {
    array,
    currentIndices,
    isSorted,
    isRunning,
    start,
    stop,
    resetVisualization,
    setArray,
    setCurrentIndices,
    setIsSorted,
  };
};

export default useSorting;
