'use client'

import { Chord } from '@/types/chord'
import { ChordTypeAbbreviations } from '@/types/chord'
import { Skeleton } from '@/components/ui/skeleton'
import { memo } from 'react'

interface ChordDisplayProps {
  currentChord: Chord | null
  nextChord: Chord | null
  onTogglePlay: () => void
}

const ChordDisplay = memo(function ChordDisplay({
  currentChord,
  nextChord,
  onTogglePlay,
}: ChordDisplayProps) {
  return (
    <div className="flex flex-col items-center" onClick={onTogglePlay}>
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
  )
})

export default ChordDisplay
