'use client'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft, Circle, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import SettingsDrawer from './settings'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GENERAL_MUSIC_KEYS, MusicKey } from '@/types/key'
import {
  ChordType,
  EVERY_CHORDTYPES,
  Chord,
  MAJOR_DIATONIC_CHORDTYPE,
  NATURAL_MINOR_DIATONIC_CHORDTYPE,
} from '@/types/chord'
import { getRandomElement } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ChordTypeAbbreviations } from '@/types/chord'
import useLocalStorageState from '@/lib/useLocalStorageState'
import { usePathname } from 'next/navigation'
import { MAJOR_SCALES, NATURAL_MINOR_SCALES, ScaleType } from '@/types/scale'

export default function RandomChordPracticePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [beat, setBeat] = useState(0)
  // const audioRefs = [0, 1, 2, 3].map(() => useRef(new Audio('/metronome.mp3')))
  const wasPlayingRef = useRef(isPlaying)

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

  const [currentChord, setCurrentChord] = useState<Chord | null>(null)
  const [nextChord, setNextChord] = useState<Chord | null>(null)
  const nextChordRef = useRef(nextChord)

  const getRandomChord = useCallback(
    () => ({
      root: getRandomElement(selectedRoots),
      type: getRandomElement(selectedChordTypes),
    }),
    [selectedRoots, selectedChordTypes],
  )

  const getRandomDiatonicChord = useCallback(() => {
    if (selectedScaleType === 'major') {
      const scale = MAJOR_SCALES.find((s) => s.key === selectedKey)
      const chordTypes = MAJOR_DIATONIC_CHORDTYPE
      if (!scale) {
        throw new Error('Scale not found')
      }
      if (scale.notes.length != chordTypes.length) {
        throw new Error('Scale and chord types do not match')
      }
      const random_index = Math.floor(Math.random() * scale.notes.length)
      return {
        root: scale.notes[random_index],
        type: chordTypes[random_index],
      }
    } else if (selectedScaleType === 'natural minor') {
      const scale = NATURAL_MINOR_SCALES.find((s) => s.key === selectedKey)
      const chordTypes = NATURAL_MINOR_DIATONIC_CHORDTYPE
      if (!scale) {
        throw new Error('Scale not found')
      }
      if (scale.notes.length != chordTypes.length) {
        throw new Error('Scale and chord types do not match')
      }
      const random_index = Math.floor(Math.random() * scale.notes.length)
      return {
        root: scale.notes[random_index],
        type: chordTypes[random_index],
      }
    } else {
      throw new Error('Invalid scale type')
    }
  }, [selectedKey, selectedScaleType])

  const generateChord = useCallback(() => {
    if (practiceMode === 'random') {
      return getRandomChord()
    } else if (practiceMode === 'diatonic') {
      return getRandomDiatonicChord()
    } else {
      throw new Error('Invalid practice mode')
    }
  }, [practiceMode, getRandomChord, getRandomDiatonicChord])

  useEffect(() => {
    nextChordRef.current = nextChord
  }, [nextChord])

  useEffect(() => {
    setCurrentChord(generateChord())
    setNextChord(generateChord)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(
        () => {
          setBeat((beat) => (beat + 1) % 4)
          // TODO: Fix metronome audio. Metronome audio is not playing in the correct timing due to loading delay.
          // if (audioRefs[beat].current && !isMetronomeMuted) {
          //   audioRefs[beat].current.currentTime = 0
          //   audioRefs[beat].current.play()
          // }
        },
        (60 / tempo) * 1000,
      )
      return () => clearInterval(intervalId)
    }
  }, [isPlaying, tempo, generateChord])

  useEffect(() => {
    if (isPlaying && beat === 0) {
      setCurrentChord(nextChordRef.current)
      let newChord = null
      // Try to generate a new chord that is different from the current one
      for (let i = 0; i < 3; i++) {
        newChord = generateChord()
        if (
          newChord.root != nextChordRef.current?.root ||
          newChord.type != nextChordRef.current?.type
        ) {
          break
        }
      }
      setNextChord(newChord)
    }
  }, [isPlaying, beat, generateChord])

  return (
    <div className="relative flex flex-col sm:py-6">
      <div>
        <Link
          className={cn(buttonVariants({ variant: 'ghost' }), 'pl-2 pr-4')}
          href="/exercises"
        >
          <ChevronLeft className="h-6 w-6" />
          Back to Exercises
        </Link>
      </div>
      <div className="px-4 py-2">
        <div className="text-2xl font-bold">Random chord practice</div>
        <div className="flex flex-col items-center py-12">
          <div
            className="flex flex-col items-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {currentChord ? (
              <div className="mb-4 text-7xl font-semibold tracking-tight sm:mb-8 sm:text-9xl">
                {currentChord.root + ChordTypeAbbreviations[currentChord.type]}
              </div>
            ) : (
              <Skeleton className="mb-4 h-24 w-48 sm:mb-8" />
            )}
            <div className="mb-4 text-2xl sm:text-3xl">Up Next...</div>
            {nextChord ? (
              <div className="text-6xl font-semibold tracking-tight sm:mb-8 sm:text-8xl">
                {nextChord.root + ChordTypeAbbreviations[nextChord.type]}
              </div>
            ) : (
              <Skeleton className="h-16 w-32" />
            )}
          </div>
          <div className="flex items-center justify-between gap-8 py-12 sm:mb-12 sm:gap-16">
            {[0, 1, 2, 3].map((i) => (
              <Circle
                key={i}
                className={cn(
                  'h-12 w-12 fill-secondary-foreground sm:h-16 sm:w-16',
                  {
                    'fill-primary-foreground': i === beat,
                  },
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button
              className="h-12 w-36"
              onClick={() => {
                setIsPlaying(!isPlaying)
              }}
            >
              {isPlaying ? (
                <div className="flex items-center gap-1">
                  <Pause className="h-6 w-6" />
                  <div className="text-lg">Pause</div>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Play className="h-6 w-6" />
                  <div className="text-lg">Play</div>
                </div>
              )}
            </Button>
            <SettingsDrawer
              practiceMode={practiceMode}
              setPracticeMode={setPracticeMode}
              tempo={tempo}
              setTempo={setTempo}
              isMetronomeMuted={isMetronomeMuted}
              setIsMetronomeMuted={setIsMetronomeMuted}
              selectedRoots={selectedRoots}
              setSelectedRoots={setSelectedRoots}
              selectedChordTypes={selectedChordTypes}
              setSelectedChordTypes={setSelectedChordTypes}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              selectedScaleType={selectedScaleType}
              setSelectedScaleType={setSelectedScaleType}
              onOpenChange={(open) => {
                if (open) {
                  wasPlayingRef.current = isPlaying
                  setIsPlaying(false)
                } else {
                  setIsPlaying(wasPlayingRef.current)
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
