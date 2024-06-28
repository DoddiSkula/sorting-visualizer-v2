import { useState, useCallback, useEffect } from "react";
import usePlaybackControl from "./use-playback-control";
import useSelectionSort from "./use-selection-sort";

export interface Indicies {
  highlights: number[];
  evaluations: number[];
}

const useSorting = (initialArray: number[], delay: number) => {
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [array, setArray] = useState<number[]>([...initialArray]);
  const [currentIndices, setCurrentIndices] = useState<Indicies>({
    highlights: [],
    evaluations: [],
  });

  const { sortStep, resetState } = useSelectionSort(
    array,
    setArray,
    setIsSorted,
    setCurrentIndices
  );

  const { isRunning, start, stop, reset } = usePlaybackControl(sortStep, delay);

  const resetVisualization = useCallback(() => {
    reset();
    resetState();
    setIsSorted(false);
    setArray([...initialArray]);
    setCurrentIndices({
      highlights: [],
      evaluations: [],
    });
  }, [reset, resetState, initialArray]);

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
