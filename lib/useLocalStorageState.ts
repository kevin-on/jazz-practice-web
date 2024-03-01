'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : defaultValue
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
