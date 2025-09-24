'use client'

import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Check } from 'lucide-react'
import { MusicKey, GENERAL_MUSIC_KEYS } from '@/types/key'
import { ChordType, TRIAD_CHORDTYPES, SEVENTH_CHORDTYPES } from '@/types/chord'
import { memo } from 'react'

interface RandomModeSettingsProps {
  tempo: number
  setTempo: (tempo: number) => void
  isMetronomeMuted: boolean
  setIsMetronomeMuted: (muted: boolean) => void
  selectedRoots: MusicKey[]
  setSelectedRoots: (roots: MusicKey[]) => void
  selectedChordTypes: ChordType[]
  setSelectedChordTypes: (chordTypes: ChordType[]) => void
}

const RandomModeSettings = memo(function RandomModeSettings({
  tempo,
  setTempo,
  isMetronomeMuted,
  setIsMetronomeMuted,
  selectedRoots,
  setSelectedRoots,
  selectedChordTypes,
  setSelectedChordTypes,
}: RandomModeSettingsProps) {
  return (
    <>
      <Separator orientation="horizontal" className="mb-4" />
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="font-semibold">Tempo</div>
          <div>{tempo} BPM</div>
        </div>
        <Slider
          value={[tempo]}
          onValueChange={([value]) => {
            setTempo(value)
          }}
          max={200}
          min={30}
          step={1}
        />
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="flex items-center justify-between">
        <div className="font-semibold">Metronome Sound</div>
        <Switch
          checked={!isMetronomeMuted}
          onCheckedChange={(check) => {
            setIsMetronomeMuted(!check)
          }}
        />
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div>
        <div className="mb-3 font-semibold">Roots</div>
        <ToggleGroup
          type="multiple"
          variant="outline"
          className="grid grid-cols-4 sm:grid-cols-6"
          value={selectedRoots}
          onValueChange={(value) => {
            if (value.length > 0) {
              setSelectedRoots(value as MusicKey[])
            }
          }}
        >
          {GENERAL_MUSIC_KEYS.map((note) => (
            <ToggleGroupItem
              key={note}
              value={note}
              className="text-sm font-semibold"
            >
              {note}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div>
        <div className="mb-3 font-semibold">Chords</div>
        <div className="grid grid-cols-2 items-start gap-4">
          <ToggleGroup
            type="multiple"
            variant="outline"
            className="flex flex-col"
            value={selectedChordTypes.filter((chord) =>
              TRIAD_CHORDTYPES.includes(chord),
            )}
            onValueChange={(value) => {
              setSelectedChordTypes(
                (value as ChordType[]).concat(
                  selectedChordTypes.filter(
                    (chord) => !TRIAD_CHORDTYPES.includes(chord),
                  ),
                ),
              )
            }}
          >
            {TRIAD_CHORDTYPES.map((chord) => (
              <ToggleGroupItem
                key={chord}
                value={chord}
                className="relative w-full font-semibold"
              >
                <div className="flex">{chord}</div>
                {selectedChordTypes.includes(chord) && (
                  <Check className="absolute right-4 h-5 w-5" />
                )}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ToggleGroup
            type="multiple"
            variant="outline"
            className="flex flex-col"
            value={selectedChordTypes.filter((chord) =>
              SEVENTH_CHORDTYPES.includes(chord),
            )}
            onValueChange={(value) => {
              setSelectedChordTypes(
                (value as ChordType[]).concat(
                  selectedChordTypes.filter(
                    (chord) => !SEVENTH_CHORDTYPES.includes(chord),
                  ),
                ),
              )
            }}
          >
            {SEVENTH_CHORDTYPES.map((chord) => (
              <ToggleGroupItem
                key={chord}
                value={chord}
                className="relative w-full font-semibold"
              >
                <div className="flex">{chord}</div>
                {selectedChordTypes.includes(chord) && (
                  <Check className="absolute right-4 h-5 w-5" />
                )}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </>
  )
})

export default RandomModeSettings
