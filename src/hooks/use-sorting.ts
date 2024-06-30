import { sortOptions } from "@/data";
import usePlayback from "@/hooks/use-playback";
import { useMemo } from "react";

const useSorting = (
  initialArray: number[],
  selectedSort: string,
  speedMultiplier: number
) => {
  const sort = useMemo(() => {
    const sortFn = sortOptions.find(
      (option) => option.value === selectedSort
    )?.sortFn;
    if (sortFn) return sortFn(initialArray);
  }, [initialArray, selectedSort]);

  const playback = usePlayback(
    sort ? sort?.snapshots?.length : 0,
    30 * speedMultiplier
  );

  const arraySnapshot = useMemo(
    () => sort?.snapshots[playback.index] || [],
    [playback.index, sort]
  );

  const highlights = useMemo(
    () => sort?.highlights[playback.index] || [],
    [playback.index, sort]
  );

  return { sort, arraySnapshot, highlights, playback };
};

export default useSorting;
