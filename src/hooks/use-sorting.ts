import usePlayback from "@/hooks/use-playback";
import { selectionSort } from "@/lib/selection-sort";
import { useMemo } from "react";

const useSorting = (initialArray: number[], fps: number = 120) => {
  const sort = useMemo(() => selectionSort(initialArray), [initialArray]);
  const playback = usePlayback(sort.snapshots.length, fps);

  const arraySnapshot = useMemo(
    () => sort.snapshots[playback.index] || [],
    [playback.index, sort.snapshots]
  );

  const evaluations = useMemo(
    () => sort.indices.evaluations[playback.index] || [],
    [playback.index, sort.indices.evaluations]
  );

  const highlights = useMemo(
    () => sort.indices.highlights[playback.index] || [],
    [playback.index, sort.indices.highlights]
  );

  return { sort, arraySnapshot, evaluations, highlights, playback };
};

export default useSorting;
