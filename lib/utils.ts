import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomElement = (list: any[]) => {
  return list[Math.floor(Math.random() * list.length)]
}
