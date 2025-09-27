'use client'

import { Dispatch, SetStateAction } from 'react'
import { MusicKey } from '@/types/key'
import { Interval } from '@/types/interval'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'
import { Check } from 'lucide-react'

type ItemWithActive<T> = { value: T; active: boolean }

function QuizStart({
  onStart,
  disabled,
}: {
  onStart: React.MouseEventHandler
  disabled: boolean
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Interval Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center text-muted-foreground">
          Choose the right key for each question.
        </div>

        <div className="space-y-2 rounded-md border bg-muted/20 p-4">
          <div className="font-semibold">Example</div>
          <div className="space-y-1 text-sm">
            <div>Q) Major 6th of E♭?</div>
            <div>A) C</div>
          </div>
        </div>

        <Button
          onClick={onStart}
          disabled={disabled}
          size="lg"
          className="w-full"
        >
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  )
}

function RootSettings({
  roots,
  setRoots,
}: {
  roots: ItemWithActive<MusicKey>[]
  setRoots: Dispatch<SetStateAction<ItemWithActive<MusicKey>[]>>
}) {
  const toggleRoot = (rootValue: MusicKey) => {
    setRoots((prev) =>
      prev.map((root) =>
        root.value === rootValue ? { ...root, active: !root.active } : root,
      ),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Root Keys</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {roots.map((root) => (
            <Toggle
              key={root.value}
              pressed={root.active}
              onPressedChange={() => toggleRoot(root.value)}
              className="h-10 font-semibold"
              variant="outline"
            >
              {root.value}
            </Toggle>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function IntervalsSettings({
  intervals,
  setIntervals,
}: {
  intervals: ItemWithActive<Interval>[]
  setIntervals: Dispatch<SetStateAction<ItemWithActive<Interval>[]>>
}) {
  const toggleInterval = (intervalValue: Interval) => {
    setIntervals((prev) =>
      prev.map((interval) =>
        interval.value === intervalValue
          ? { ...interval, active: !interval.active }
          : interval,
      ),
    )
  }

  const isDiatonic = (interval: Interval) =>
    interval.includes('major') ||
    interval.includes('perfect') ||
    interval.includes('minor')

  const diatonicIntervals = intervals.filter((interval) =>
    isDiatonic(interval.value),
  )
  const nonDiatonicIntervals = intervals.filter(
    (interval) => !isDiatonic(interval.value),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Intervals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="mb-3 font-semibold">Diatonic</h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {diatonicIntervals.map((interval) => (
              <Toggle
                key={interval.value}
                pressed={interval.active}
                onPressedChange={() => toggleInterval(interval.value)}
                className="relative h-10 justify-start"
                variant="outline"
              >
                {interval.value}
                {interval.active && (
                  <Check className="absolute right-4 h-5 w-5" />
                )}
              </Toggle>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Non-diatonic</h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {nonDiatonicIntervals.map((interval) => (
              <Toggle
                key={interval.value}
                pressed={interval.active}
                onPressedChange={() => toggleInterval(interval.value)}
                className="relative h-10 justify-start"
                variant="outline"
              >
                {interval.value
                  .replace('diminished', 'dim')
                  .replace('augmented', 'aug')}
                {interval.active && (
                  <Check className="absolute right-4 h-5 w-5" />
                )}
              </Toggle>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function QuizSettings({
  roots,
  setRoots,
  intervals,
  setIntervals,
  onStart,
}: {
  roots: ItemWithActive<MusicKey>[]
  setRoots: Dispatch<SetStateAction<ItemWithActive<MusicKey>[]>>
  intervals: ItemWithActive<Interval>[]
  setIntervals: Dispatch<SetStateAction<ItemWithActive<Interval>[]>>
  onStart: React.MouseEventHandler
}) {
  const hasActiveRoots = roots.some((root) => root.active)
  const hasActiveIntervals = intervals.some((interval) => interval.active)
  const canStart = hasActiveRoots && hasActiveIntervals

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <QuizStart onStart={onStart} disabled={!canStart} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quiz Settings</h2>
        <RootSettings roots={roots} setRoots={setRoots} />
        <IntervalsSettings intervals={intervals} setIntervals={setIntervals} />
      </div>
    </div>
  )
}
