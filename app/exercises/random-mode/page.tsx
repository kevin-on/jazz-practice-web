'use client'

import React, { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from '@/components/ui/carousel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MODES } from '@/types/mode'
import { GENERAL_MUSIC_KEYS } from '../../../types/key'
import { Button } from '../../../components/ui/button'
import { Dice3 } from 'lucide-react'

export default function RandomModePage() {
  const [modeApi, setModeApi] = useState<CarouselApi>()
  const [keyApi, setKeyApi] = useState<CarouselApi>()
  const [numberApi, setNumberApi] = useState<CarouselApi>()

  const setRandomMode = () => {
    modeApi?.scrollTo(Math.floor(Math.random() * MODES.length))
  }

  const setRandomKey = () => {
    keyApi?.scrollTo(Math.floor(Math.random() * GENERAL_MUSIC_KEYS.length))
  }

  const setRandomNumber = () => {
    numberApi?.scrollTo(Math.floor(Math.random() * 20))
  }

  const setRandom = () => {
    setRandomMode()
    setRandomKey()
    setRandomNumber()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold sm:text-3xl">Random Mode Practice</div>
      <Accordion type="single" collapsible className="my-6 w-full max-w-sm">
        <AccordionItem value="how-to-play" className="border-t px-4">
          <AccordionTrigger>How to play</AccordionTrigger>
          <AccordionContent>
            <ol className="flex list-decimal flex-col gap-2 pl-5">
              <li>
                Move your index finger to the indicated fret, and find your root
                note in the four fret span under your fingers.
              </li>
              <li>
                Build the required scale from there, playing up to the high E
                string, all the way down to the low E string, and then back to
                the root.
              </li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col items-center gap-2">
        <Carousel
          className="relative h-32 w-full max-w-[240px] sm:h-40 sm:max-w-xs"
          opts={{
            loop: true,
          }}
          setApi={setModeApi}
        >
          <div className="absolute left-0 top-0 text-lg font-semibold sm:text-xl">
            Mode
          </div>
          <CarouselContent className="py-8">
            {MODES.map((mode, index) => (
              <CarouselItem key={index}>
                <div className="flex items-center justify-center p-3 sm:p-6">
                  <h2 className="text-4xl font-bold">{mode}</h2>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Carousel
          className="relative h-32 w-full max-w-[240px] sm:h-40 sm:max-w-xs"
          opts={{
            loop: true,
          }}
          setApi={setKeyApi}
        >
          <div className="absolute left-0 top-0 text-lg font-semibold sm:text-xl">
            Key
          </div>
          <CarouselContent className="py-8">
            {GENERAL_MUSIC_KEYS.map((key, index) => (
              <CarouselItem key={index}>
                <div className="flex items-center justify-center p-3 sm:p-6">
                  <h2 className="text-4xl font-bold">{key}</h2>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Carousel
          className="relative h-32 w-full max-w-[240px] sm:h-40 sm:max-w-xs"
          opts={{
            loop: true,
          }}
          setApi={setNumberApi}
        >
          <div className="absolute left-0 top-0 text-lg font-semibold sm:text-xl">
            Starting Fret
          </div>
          <CarouselContent className="py-8">
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex items-center justify-center p-3 sm:p-6">
                  <h2 className="text-4xl font-bold">{index}</h2>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Button onClick={setRandom} className="flex items-center gap-2 py-6">
        <Dice3 />
        <div className="text-lg font-semibold">Roll Dice</div>
      </Button>
    </div>
  )
}
