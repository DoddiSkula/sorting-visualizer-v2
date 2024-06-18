import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shuffles an array of integers in place.
 * @param array - The array of integers to shuffle.
 * @returns The shuffled array.
 */
export function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generates an array with values from 1 to N and optionally shuffles it.
 * @param N - The number of elements in the array.
 * @param shuffle - Optional boolean to determine if the array should be shuffled.
 * @returns An array with values from 1 to N, optionally shuffled.
 */
export function generateArray(N: number, shuffle: boolean = true): number[] {
  const array: number[] = [];
  for (let i = 1; i <= N; i++) {
    array.push(i);
  }

  if (shuffle) {
    return shuffleArray(array);
  }

  return array;
}
