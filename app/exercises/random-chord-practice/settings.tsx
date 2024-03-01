'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Check, Settings } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ScrollArea } from '@/components/ui/scroll-area'

import { GENERAL_MUSIC_KEYS, MusicKey } from '@/types/key'
import { ChordType, SEVENTH_CHORDTYPES, TRIAD_CHORDTYPES } from '@/types/chord'

export default function SettingsDrawer({
  tempo,
  setTempo,
  selectedRoots,
  setSelectedRoots,
  selectedChordTypes,
  setSelectedChordTypes,
  onOpenChange,
}: {
  tempo: number
  setTempo: (tempo: number) => void
  selectedRoots: MusicKey[]
  setSelectedRoots: (roots: MusicKey[]) => void
  selectedChordTypes: ChordType[]
  setSelectedChordTypes: (chordTypes: ChordType[]) => void
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <Drawer onOpenChange={onOpenChange}>
      <DrawerTrigger>
        <Button variant="outline" className="flex h-12 w-36 items-center gap-2">
          <Settings className="h-6 w-6" />
          <div className="text-lg">Settings</div>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="max-h-[70vh] overflow-auto">
          <div className="mx-auto w-full max-w-xl">
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
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
              <Separator orientation="horizontal" className="my-4" />
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
