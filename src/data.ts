import { mergeSort } from "@/lib/merge-sort";
import { selectionSort } from "@/lib/selection-sort";

export const sortOptions = [
  {
    label: "Selection sort",
    value: "selectionSort",
    sortFn: selectionSort,
  },
  {
    label: "Merge sort",
    value: "mergeSort",
    sortFn: mergeSort,
  },
];
