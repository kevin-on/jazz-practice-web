'use client'

import SettingsDrawer from './settings'
import { useRef, useCallback } from 'react'
import { usePracticeSettings } from './hooks/use-practice-settings'
import { useChordGeneration } from './hooks/use-chord-generation'
import { useMetronome } from './hooks/use-metronome'
import ChordDisplay from './components/chord-display'
import MetronomeControls from './components/metronome-controls'
import BackNavigation from './components/back-navigation'

export default function RandomChordPracticePage() {
  const wasPlayingRef = useRef(false)

  const {
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
  } = usePracticeSettings()

  const { generateChord } = useChordGeneration(
    practiceMode,
    selectedRoots,
    selectedChordTypes,
    selectedKey,
    selectedScaleType,
  )

  const { isPlaying, beat, currentChord, nextChord, setIsPlaying, togglePlay } =
    useMetronome(tempo, isMetronomeMuted, generateChord)

  const handleSettingsOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        wasPlayingRef.current = isPlaying
        setIsPlaying(false)
      } else {
        setIsPlaying(wasPlayingRef.current)
      }
    },
    [isPlaying, setIsPlaying],
  )

  return (
    <div className="relative flex flex-col sm:py-6">
      <BackNavigation />
      <div className="px-4 py-2">
        <div className="text-2xl font-bold">Random chord practice</div>
        <div className="flex flex-col items-center py-12">
          <ChordDisplay
            currentChord={currentChord}
            nextChord={nextChord}
            onTogglePlay={togglePlay}
          />
          <MetronomeControls
            isPlaying={isPlaying}
            beat={beat}
            onTogglePlay={togglePlay}
          />
          <div className="mt-4">
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
              onOpenChange={handleSettingsOpenChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
