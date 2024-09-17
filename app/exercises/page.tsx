import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Random Chord Practice',
    href: '/exercises/random-chord-practice',
    description: 'Practice random chords',
  },
  {
    title: 'Random Mode Practice',
    href: '/exercises/random-mode',
    description: 'Practice random modes',
  },
  {
    title: 'Interval Quiz',
    href: '/exercises/interval-quiz',
    description: 'Practice intervals',
  },
]

export default function ExercisesPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {components.map((component) => (
        <a href={component.href} key={component.href}>
          <Card className="hover:bg-accent">
            <CardHeader>
              <CardTitle>{component.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>{component.description}</div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  )
}
