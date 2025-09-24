'use client'

import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MusicKey, GENERAL_MUSIC_KEYS } from '@/types/key'
import { ScaleType } from '@/types/scale'
import { memo } from 'react'

interface DiatonicModeSettingsProps {
  tempo: number
  setTempo: (tempo: number) => void
  selectedKey: MusicKey
  setSelectedKey: (key: MusicKey) => void
  selectedScaleType: ScaleType
  setSelectedScaleType: (scaleType: ScaleType) => void
}

const DiatonicModeSettings = memo(function DiatonicModeSettings({
  tempo,
  setTempo,
  selectedKey,
  setSelectedKey,
  selectedScaleType,
  setSelectedScaleType,
}: DiatonicModeSettingsProps) {
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
      <Separator orientation="horizontal" className="my-4" />
      <div>
        <div className="mb-3 font-semibold">Scale type</div>
        <Tabs
          value={selectedScaleType}
          onValueChange={(value) => {
            setSelectedScaleType(value as ScaleType)
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="major">Major</TabsTrigger>
            <TabsTrigger value="natural minor">Minor</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  )
})

export default DiatonicModeSettings
