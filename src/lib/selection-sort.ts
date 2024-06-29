export const selectionSort = (initialArray: number[]) => {
  const array = [...initialArray];
  const snapshots: number[][] = [];
  const indices: { highlights: number[][]; evaluations: number[][] } = {
    highlights: [],
    evaluations: [],
  };

  for (let i = 0; i < array.length; i++) {
    let min = i;
    snapshots.push([...array]);
    indices.highlights.push([i]);
    indices.evaluations.push([]);
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
      snapshots.push([...array]);
      indices.highlights.push([i]);
      indices.evaluations.push([j]);
    }
    if (i !== min) {
      [array[i], array[min]] = [array[min], array[i]];
      snapshots.push([...array]);
      indices.highlights.push([i]);
      indices.evaluations.push([]);
    }
  }
  return { array, snapshots, indices };
};
