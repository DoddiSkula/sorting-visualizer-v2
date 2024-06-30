import { SortReturn } from "@/types";

export const selectionSort = (initialArray: number[]): SortReturn => {
  const array = [...initialArray];
  const snapshots: number[][] = [];
  const highlights: number[][] = [];

  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
      snapshots.push([...array]);
      highlights.push([j]);
    }
    if (i !== min) {
      [array[i], array[min]] = [array[min], array[i]];
      snapshots.push([...array]);
      highlights.push([i]);
    }
  }
  return { array, snapshots, highlights };
};
