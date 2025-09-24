'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function isValidJson(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

function safeJsonParse<T>(str: string, defaultValue: T): T {
  try {
    if (!str || typeof str !== 'string') return defaultValue
    if (!isValidJson(str)) return defaultValue
    const parsed = JSON.parse(str)
    // Basic type validation - ensure parsed value has same type as defaultValue
    if (typeof parsed !== typeof defaultValue) return defaultValue
    return parsed
  } catch {
    return defaultValue
  }
}

export default function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const storedValue = localStorage.getItem(key)
      if (!storedValue) return defaultValue
      return safeJsonParse(storedValue, defaultValue)
    } catch {
      // If localStorage access fails, return default value
      return defaultValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // Silently fail if localStorage is not available or quota exceeded
      console.warn(`Failed to save to localStorage with key: ${key}`)
    }
  }, [key, state])

  return [state, setState]
}
