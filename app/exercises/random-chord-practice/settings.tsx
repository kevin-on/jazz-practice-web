'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RandomModeSettings from './components/random-mode-settings'
import DiatonicModeSettings from './components/diatonic-mode-settings'

import { MusicKey } from '@/types/key'
import { ChordType } from '@/types/chord'
import { ScaleType } from '@/types/scale'

export default function SettingsDrawer({
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
  onOpenChange,
}: {
  practiceMode: 'random' | 'diatonic'
  setPracticeMode: (mode: 'random' | 'diatonic') => void
  tempo: number
  setTempo: (tempo: number) => void
  isMetronomeMuted: boolean
  setIsMetronomeMuted: (muted: boolean) => void
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
                <RandomModeSettings
                  tempo={tempo}
                  setTempo={setTempo}
                  isMetronomeMuted={isMetronomeMuted}
                  setIsMetronomeMuted={setIsMetronomeMuted}
                  selectedRoots={selectedRoots}
                  setSelectedRoots={setSelectedRoots}
                  selectedChordTypes={selectedChordTypes}
                  setSelectedChordTypes={setSelectedChordTypes}
                />
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </TabsContent>
              <TabsContent value="diatonic">
                <DiatonicModeSettings
                  tempo={tempo}
                  setTempo={setTempo}
                  selectedKey={selectedKey}
                  setSelectedKey={setSelectedKey}
                  selectedScaleType={selectedScaleType}
                  setSelectedScaleType={setSelectedScaleType}
                />
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
