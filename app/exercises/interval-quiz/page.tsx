'use client'

import { useState, useEffect, useRef } from 'react'
import { MusicKey, GENERAL_MUSIC_KEYS, EVERY_MUSIC_KEYS } from '@/types/key'
import { Interval, EVERY_INTERVALS } from '@/types/interval'
import { calculateKeyFromInterval, getRandomElement } from '@/lib/music-utils'
import useLocalStorageState from '@/lib/useLocalStorageState'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import QuizSettings from './components/quiz-settings'

type IntervalQuiz = {
  root: MusicKey
  interval: Interval
  invert: boolean
  answer: MusicKey | MusicKey[]
}

type QuizResult = {
  total: number
  correct: number
  totalResponseTime: number
}

const getRandomQuiz = (
  activeRoots: MusicKey[],
  activeIntervals: Interval[],
): IntervalQuiz => {
  const root = getRandomElement(activeRoots)
  const interval = getRandomElement(activeIntervals)
  return {
    root: root,
    interval: interval,
    invert: false,
    answer: calculateKeyFromInterval(root, interval),
  }
}

export default function IntervalQuizPage() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [intervals, setIntervals] = useLocalStorageState(
    'intervalQuiz:intervals',
    EVERY_INTERVALS.map((interval) => ({ value: interval, active: true })),
  )
  const [roots, setRoots] = useLocalStorageState(
    'intervalQuiz:roots',
    GENERAL_MUSIC_KEYS.map((root) => ({ value: root, active: true })),
  )
  const [quiz, setQuiz] = useState<IntervalQuiz>({} as IntervalQuiz)
  const [result, setResult] = useState<QuizResult>({
    total: 0,
    correct: 0,
    totalResponseTime: 0.0,
  })
  const [guess, setGuess] = useState<MusicKey | null>(null)
  const quizStartTime = useRef<number>(new Date().getTime())

  const handleSubmit = (selectedKey: MusicKey) => {
    setGuess(selectedKey)
  }

  useEffect(() => {
    if (quizStarted) {
      setQuiz(
        getRandomQuiz(
          roots.filter((root) => root.active).map((root) => root.value),
          intervals
            .filter((interval) => interval.active)
            .map((interval) => interval.value),
        ),
      )
      setResult({ total: 0, correct: 0, totalResponseTime: 0.0 })
      quizStartTime.current = new Date().getTime()
    }
  }, [quizStarted, roots, intervals])

  useEffect(() => {
    if (guess) {
      const isCorrect = Array.isArray(quiz.answer)
        ? quiz.answer.includes(guess)
        : quiz.answer === guess

      setResult((prev) => ({
        total: prev.total + 1,
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        totalResponseTime:
          prev.totalResponseTime +
          (new Date().getTime() - quizStartTime.current),
      }))

      const intervalId = setTimeout(() => {
        setGuess(null)
        setQuiz(
          getRandomQuiz(
            roots.filter((root) => root.active).map((root) => root.value),
            intervals
              .filter((interval) => interval.active)
              .map((interval) => interval.value),
          ),
        )
        quizStartTime.current = new Date().getTime()
      }, 1000)

      return () => {
        clearTimeout(intervalId)
      }
    }
  }, [guess, quiz.answer, roots, intervals])

  if (!quizStarted) {
    return (
      <QuizSettings
        roots={roots}
        setRoots={setRoots}
        intervals={intervals}
        setIntervals={setIntervals}
        onStart={() => setQuizStarted(true)}
      />
    )
  }

  const getButtonStyle = (key: MusicKey) => {
    if (!guess) {
      return { variant: 'default' as const, className: '' }
    }

    const isCorrectAnswer = Array.isArray(quiz.answer)
      ? quiz.answer.includes(key)
      : quiz.answer === key

    if (isCorrectAnswer) {
      return {
        variant: 'default' as const,
        className: 'bg-green-600 hover:bg-green-700 text-white',
      }
    }
    if (guess === key) {
      return {
        variant: 'destructive' as const,
        className: 'bg-red-600 hover:bg-red-700 text-white',
      }
    }
    return { variant: 'secondary' as const, className: 'opacity-50' }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 p-4">
      {/* Quiz Question */}
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <div className="text-4xl font-semibold">{quiz.interval}</div>
          <div className="text-2xl">of</div>
          <div className="text-4xl font-semibold">{quiz.root}</div>
        </CardContent>
      </Card>

      {/* Answer Options */}
      <div className="grid w-full grid-cols-4 gap-2 sm:grid-cols-6">
        {EVERY_MUSIC_KEYS.map((key) => {
          const buttonStyle = getButtonStyle(key)
          return (
            <Button
              key={key}
              variant={buttonStyle.variant}
              className={`h-12 text-lg font-semibold ${buttonStyle.className} ${
                guess ? 'pointer-events-none' : ''
              }`}
              onClick={() => handleSubmit(key)}
            >
              {key}
            </Button>
          )
        })}
      </div>

      {/* Score Display */}
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-2 pt-6">
          <div className="text-xl">
            Score: {result.correct} / {result.total}
          </div>
          <div className="text-lg text-muted-foreground">
            Average time:{' '}
            {result.total === 0
              ? '-'
              : (result.totalResponseTime / result.total / 1000).toFixed(2)}
            s
          </div>
        </CardContent>
      </Card>

      {/* Stop Quiz Button */}
      <Button
        variant="outline"
        size="lg"
        onClick={() => setQuizStarted(false)}
        className="px-10"
      >
        Stop Quiz
      </Button>
    </div>
  )
}
