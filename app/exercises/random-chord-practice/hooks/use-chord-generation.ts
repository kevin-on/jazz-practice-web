'use client'

import { useCallback, useMemo } from 'react'
import { MusicKey } from '@/types/key'
import {
  ChordType,
  MAJOR_DIATONIC_CHORDTYPE,
  NATURAL_MINOR_DIATONIC_CHORDTYPE,
} from '@/types/chord'
import { ScaleType, MAJOR_SCALES, NATURAL_MINOR_SCALES } from '@/types/scale'
import { getRandomElement } from '@/lib/utils'

export function useChordGeneration(
  practiceMode: 'random' | 'diatonic',
  selectedRoots: MusicKey[],
  selectedChordTypes: ChordType[],
  selectedKey: MusicKey,
  selectedScaleType: ScaleType,
) {
  const scaleInfo = useMemo(() => {
    if (selectedScaleType === 'major') {
      return {
        scale: MAJOR_SCALES.find((s) => s.key === selectedKey),
        chordTypes: MAJOR_DIATONIC_CHORDTYPE,
      }
    } else if (selectedScaleType === 'natural minor') {
      return {
        scale: NATURAL_MINOR_SCALES.find((s) => s.key === selectedKey),
        chordTypes: NATURAL_MINOR_DIATONIC_CHORDTYPE,
      }
    }
    return null
  }, [selectedKey, selectedScaleType])

  const getRandomChord = useCallback(
    () => ({
      root: getRandomElement(selectedRoots),
      type: getRandomElement(selectedChordTypes),
    }),
    [selectedRoots, selectedChordTypes],
  )

  const getRandomDiatonicChord = useCallback(() => {
    if (!scaleInfo || !scaleInfo.scale) {
      throw new Error('Scale not found')
    }

    const { scale, chordTypes } = scaleInfo

    if (scale.notes.length !== chordTypes.length) {
      throw new Error('Scale and chord types do not match')
    }

    const random_index = Math.floor(Math.random() * scale.notes.length)
    return {
      root: scale.notes[random_index],
      type: chordTypes[random_index],
    }
  }, [scaleInfo])

  const generateChord = useCallback(() => {
    if (practiceMode === 'random') {
      return getRandomChord()
    } else if (practiceMode === 'diatonic') {
      return getRandomDiatonicChord()
    } else {
      throw new Error('Invalid practice mode')
    }
  }, [practiceMode, getRandomChord, getRandomDiatonicChord])

  return {
    generateChord,
  }
}
