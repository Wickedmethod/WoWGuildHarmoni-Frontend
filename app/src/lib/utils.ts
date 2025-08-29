import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generic state updater helper compatible with TanStack Updater pattern
export type Updater<T> = T | ((old: T) => T);
export function valueUpdater<T>(updater: Updater<T>, target: { value: T }) {
  target.value = typeof updater === 'function' ? (updater as (old: T) => T)(target.value) : updater;
}
