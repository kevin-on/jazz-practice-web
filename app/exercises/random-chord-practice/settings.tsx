'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Check, Settings } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { GENERAL_MUSIC_KEYS, MusicKey } from '@/types/key'
import { ChordType, SEVENTH_CHORDTYPES, TRIAD_CHORDTYPES } from '@/types/chord'
import { ScaleType } from '@/types/scale'

function TempoSlider({
  tempo,
  setTempo,
}: {
  tempo: number
  setTempo: (tempo: number) => void
}) {
  return (
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
  )
}

function RootSelect({
  selectedRoots,
  setSelectedRoots,
}: {
  selectedRoots: MusicKey[]
  setSelectedRoots: (roots: MusicKey[]) => void
}) {
  return (
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
  )
}

function ChordTypeSelect({
  selectedChordTypes,
  setSelectedChordTypes,
}: {
  selectedChordTypes: ChordType[]
  setSelectedChordTypes: (chordTypes: ChordType[]) => void
}) {
  return (
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
  )
}

function KeySelect({
  selectedKey,
  setSelectedKey,
}: {
  selectedKey: MusicKey
  setSelectedKey: (key: MusicKey) => void
}) {
  return (
    <div>
      <div className="mb-3 font-semibold">Key</div>
      <ToggleGroup
        type="single"
        variant="outline"
        className="grid grid-cols-4 sm:grid-cols-6"
        value={selectedKey}
        onValueChange={(value) => {
          setSelectedKey(value as MusicKey)
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
  )
}

function ScaleTypeSelect({
  scaleType,
  setScaleType,
}: {
  scaleType: ScaleType
  setScaleType: (scaleType: ScaleType) => void
}) {
  return (
    <div>
      <div className="mb-3 font-semibold">Scale type</div>
      <Tabs
        value={scaleType}
        onValueChange={(value) => {
          setScaleType(value as ScaleType)
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="major">Major</TabsTrigger>
          <TabsTrigger value="natural minor">Minor</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default function SettingsDrawer({
  practiceMode,
  setPracticeMode,
  tempo,
  setTempo,
  selectedRoots,
  setSelectedRoots,
  selectedChordTypes,
  setSelectedChordTypes,
  selectedKey,
  setSelectedKey,
  selectedScaleType,
  setSelectedScaleType,
  onOpenChange,
}: {
  practiceMode: 'random' | 'diatonic'
  setPracticeMode: (mode: 'random' | 'diatonic') => void
  tempo: number
  setTempo: (tempo: number) => void
  selectedRoots: MusicKey[]
  setSelectedRoots: (roots: MusicKey[]) => void
  selectedChordTypes: ChordType[]
  setSelectedChordTypes: (chordTypes: ChordType[]) => void
  onOpenChange?: (open: boolean) => void
  selectedKey: MusicKey
  setSelectedKey: (key: MusicKey) => void
  selectedScaleType: ScaleType
  setSelectedScaleType: (scaleType: ScaleType) => void
}) {
  return (
    <Drawer onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex h-12 w-36 items-center gap-2">
          <Settings className="h-6 w-6" />
          <div className="text-lg">Settings</div>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <ScrollArea className="max-h-[70vh] overflow-auto">
          <div className="mx-auto w-full max-w-xl">
            <Tabs
              value={practiceMode}
              onValueChange={(value) => {
                setPracticeMode(value as 'random' | 'diatonic')
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">Settings</div>
                <TabsList>
                  <TabsTrigger value="random">Random</TabsTrigger>
                  <TabsTrigger value="diatonic">Diatonic</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="random">
                <Separator orientation="horizontal" className="mb-4" />
                <TempoSlider tempo={tempo} setTempo={setTempo} />
                <Separator orientation="horizontal" className="my-4" />
                <RootSelect
                  selectedRoots={selectedRoots}
                  setSelectedRoots={setSelectedRoots}
                />
                <Separator orientation="horizontal" className="my-4" />
                <ChordTypeSelect
                  selectedChordTypes={selectedChordTypes}
                  setSelectedChordTypes={setSelectedChordTypes}
                />
                <Separator orientation="horizontal" className="mt-4" />
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </TabsContent>
              <TabsContent value="diatonic">
                <Separator orientation="horizontal" className="mb-4" />
                <TempoSlider tempo={tempo} setTempo={setTempo} />
                <Separator orientation="horizontal" className="my-4" />
                <KeySelect
                  selectedKey={selectedKey}
                  setSelectedKey={setSelectedKey}
                />
                <Separator orientation="horizontal" className="my-4" />
                <ScaleTypeSelect
                  scaleType={selectedScaleType}
                  setScaleType={setSelectedScaleType}
                />
                <Separator orientation="horizontal" className="mt-4" />
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
