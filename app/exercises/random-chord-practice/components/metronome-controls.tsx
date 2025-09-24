'use client'

import { Button } from '@/components/ui/button'
import { Circle, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { memo } from 'react'

interface MetronomeControlsProps {
  isPlaying: boolean
  beat: number
  onTogglePlay: () => void
}

const MetronomeControls = memo(function MetronomeControls({
  isPlaying,
  beat,
  onTogglePlay,
}: MetronomeControlsProps) {
  return (
    <div className="flex flex-col items-center">
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
      <Button className="h-12 w-36" onClick={onTogglePlay}>
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
    </div>
  )
})

export default MetronomeControls
