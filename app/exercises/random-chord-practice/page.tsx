'use client'

import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import SettingsDrawer from './settings'
import { useEffect, useRef, useState } from 'react'
import { GENERAL_MUSIC_KEYS, MusicKey } from '@/types/key'
import { ChordType, EVERY_CHORDTYPES, Chord } from '@/types/chord'
import { getRandomElement } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ChordTypeAbbreviations } from '@/types/chord'
import useLocalStorageState from '@/lib/useLocalStorageState'
import { usePathname } from 'next/navigation'

export default function RandomChordPracticePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const wasPlayingRef = useRef(isPlaying)

  const pathname = usePathname()
  const [tempo, setTempo] = useLocalStorageState<number>(
    `${pathname}:tempo`,
    90,
  )
  const [selectedRoots, setSelectedRoots] = useLocalStorageState<MusicKey[]>(
    `${pathname}:selectedRoots`,
    GENERAL_MUSIC_KEYS,
  )
  const [selectedChordTypes, setSelectedChordTypes] = useLocalStorageState<
    ChordType[]
  >(`${pathname}:selectedChordTypes`, EVERY_CHORDTYPES)

  const [currentChord, setCurrentChord] = useState<Chord | null>(null)
  const [nextChord, setNextChord] = useState<Chord | null>(null)
  const nextChordRef = useRef(nextChord)

  useEffect(() => {
    nextChordRef.current = nextChord
  }, [nextChord])

  useEffect(() => {
    setCurrentChord({
      root: getRandomElement(selectedRoots),
      type: getRandomElement(selectedChordTypes),
    })
    setNextChord({
      root: getRandomElement(selectedRoots),
      type: getRandomElement(selectedChordTypes),
    })
  }, [])

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(
        () => {
          setCurrentChord(nextChordRef.current)
          setNextChord({
            root: getRandomElement(selectedRoots),
            type: getRandomElement(selectedChordTypes),
          })
        },
        (60 / tempo) * 1000 * 4,
      )
      return () => clearInterval(intervalId)
    }
  }, [isPlaying, tempo, selectedRoots, selectedChordTypes])

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
        <div className="text-3xl font-bold">Random chord practice</div>
        <div className="flex flex-col items-center py-12">
          <div
            className="flex flex-col items-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {currentChord ? (
              <div className="mb-12 text-8xl font-semibold tracking-tight">
                {currentChord.root + ChordTypeAbbreviations[currentChord.type]}
              </div>
            ) : (
              <Skeleton className="mb-12 h-24 w-48" />
            )}
            <div className="mb-4 text-2xl">Up Next...</div>
            {nextChord ? (
              <div className="mb-12 text-6xl font-semibold tracking-tight">
                {nextChord.root + ChordTypeAbbreviations[nextChord.type]}
              </div>
            ) : (
              <Skeleton className="mb-12 h-16 w-32" />
            )}
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
              tempo={tempo}
              setTempo={setTempo}
              selectedRoots={selectedRoots}
              setSelectedRoots={setSelectedRoots}
              selectedChordTypes={selectedChordTypes}
              setSelectedChordTypes={setSelectedChordTypes}
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
