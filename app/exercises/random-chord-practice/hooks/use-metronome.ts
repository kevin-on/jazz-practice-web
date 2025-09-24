'use client'

import { useState, useEffect, useRef } from 'react'
import { Chord } from '@/types/chord'
import synthClickService from '../synth-click-service'

export function useMetronome(
  tempo: number,
  isMetronomeMuted: boolean,
  generateChord: () => Chord,
) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [beat, setBeat] = useState(0)
  const [currentChord, setCurrentChord] = useState<Chord | null>(null)
  const [nextChord, setNextChord] = useState<Chord | null>(null)
  const nextChordRef = useRef(nextChord)

  useEffect(() => {
    nextChordRef.current = nextChord
  }, [nextChord])

  useEffect(() => {
    setCurrentChord(generateChord())
    setNextChord(generateChord())
  }, [])

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(
        () => {
          setBeat((beat) => (beat + 1) % 4)
        },
        (60 / tempo) * 1000,
      )
      return () => clearInterval(intervalId)
    }
  }, [isPlaying, tempo])

  useEffect(() => {
    if (!isPlaying) {
      return
    }
    if (!isMetronomeMuted) {
      synthClickService.play()
    }
    if (beat === 0) {
      setCurrentChord(nextChordRef.current)
      let newChord = null
      for (let i = 0; i < 3; i++) {
        newChord = generateChord()
        if (
          newChord.root !== nextChordRef.current?.root ||
          newChord.type !== nextChordRef.current?.type
        ) {
          break
        }
      }
      setNextChord(newChord)
    }
  }, [isPlaying, beat, generateChord, isMetronomeMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return {
    isPlaying,
    beat,
    currentChord,
    nextChord,
    setIsPlaying,
    togglePlay,
  }
}
