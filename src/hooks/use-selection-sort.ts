import { useRef, useCallback } from "react";
import { Indicies } from "./use-sorting";

const useSelectionSort = (
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setIsSorted: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentIndices: React.Dispatch<React.SetStateAction<Indicies>>
) => {
  const iRef = useRef(0);
  const jRef = useRef(1);
  const minRef = useRef(0);

  const resetState = useCallback(() => {
    iRef.current = 0;
    jRef.current = 1;
    minRef.current = 0;
  }, []);

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
      highlights: [iRef.current, minRef.current],
      evaluations: [jRef.current],
    });
  }, [array, setArray, setCurrentIndices, setIsSorted]);

  return { sortStep, resetState };
};

export default useSelectionSort;
