import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomElement = <T>(list: T[]): T => {
  if (list.length === 0) {
    throw new Error('Cannot get random element from empty array')
  }
  return list[Math.floor(Math.random() * list.length)]
}
