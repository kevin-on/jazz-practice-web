'use client'

import { usePathname } from 'next/navigation'
import { GENERAL_MUSIC_KEYS, MusicKey } from '@/types/key'
import { ChordType, EVERY_CHORDTYPES } from '@/types/chord'
import { ScaleType } from '@/types/scale'
import useLocalStorageState from '@/lib/useLocalStorageState'

export function usePracticeSettings() {
  const pathname = usePathname()

  const [practiceMode, setPracticeMode] = useLocalStorageState<
    'random' | 'diatonic'
  >(`${pathname}:practiceMode`, 'random')

  const [tempo, setTempo] = useLocalStorageState<number>(
    `${pathname}:tempo`,
    90,
  )

  const [isMetronomeMuted, setIsMetronomeMuted] = useLocalStorageState<boolean>(
    `${pathname}:isMetronomeMuted`,
    false,
  )

  const [selectedRoots, setSelectedRoots] = useLocalStorageState<MusicKey[]>(
    `${pathname}:selectedRoots`,
    GENERAL_MUSIC_KEYS,
  )

  const [selectedChordTypes, setSelectedChordTypes] = useLocalStorageState<
    ChordType[]
  >(`${pathname}:selectedChordTypes`, EVERY_CHORDTYPES)

  const [selectedKey, setSelectedKey] = useLocalStorageState<MusicKey>(
    `${pathname}:selectedKey`,
    'C',
  )

  const [selectedScaleType, setSelectedScaleType] =
    useLocalStorageState<ScaleType>(`${pathname}:selectedScaleType`, 'major')

  return {
    practiceMode,
    setPracticeMode,
    tempo,
    setTempo,
    isMetronomeMuted,
    setIsMetronomeMuted,
    selectedRoots,
    setSelectedRoots,
    selectedChordTypes,
    setSelectedChordTypes,
    selectedKey,
    setSelectedKey,
    selectedScaleType,
    setSelectedScaleType,
  }
}
