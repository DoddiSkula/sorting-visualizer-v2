import { SortReturn } from "@/types";

export const mergeSort = (initialArray: number[]): SortReturn => {
  const array = [...initialArray];
  const snapshots: number[][] = [];
  const highlights: number[][] = [];

  const mergeSortHelper = (left: number, right: number): number[] => {
    if (left === right) return [array[left]];

    const mid = Math.floor((left + right) / 2);

    const leftArray = mergeSortHelper(left, mid);
    const rightArray = mergeSortHelper(mid + 1, right);

    return merge(leftArray, rightArray, left);
  };

  const merge = (
    leftArray: number[],
    rightArray: number[],
    left: number
  ): number[] => {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    let curIndex = left;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      if (leftArray[leftIndex] < rightArray[rightIndex]) {
        array[curIndex] = leftArray[leftIndex++];
      } else {
        array[curIndex] = rightArray[rightIndex++];
      }
      result.push(array[curIndex]);
      highlights.push([curIndex]);
      snapshots.push([...array]);
      curIndex++;
    }

    while (leftIndex < leftArray.length) {
      array[curIndex] = leftArray[leftIndex++];
      result.push(array[curIndex]);
      highlights.push([curIndex]);
      snapshots.push([...array]);
      curIndex++;
    }

    while (rightIndex < rightArray.length) {
      array[curIndex] = rightArray[rightIndex++];
      result.push(array[curIndex]);
      highlights.push([curIndex]);
      snapshots.push([...array]);
      curIndex++;
    }

    return result;
  };

  mergeSortHelper(0, array.length - 1);

  return { array, snapshots, highlights };
};
