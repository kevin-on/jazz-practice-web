import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomElement = <T>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)]
}
