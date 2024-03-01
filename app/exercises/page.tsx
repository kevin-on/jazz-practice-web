import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Random Chord Practice',
    href: '/exercises/random-chord-practice',
    description: 'Practice random chords',
  },
  {
    title: 'Interval Quiz',
    href: '/exercises/interval-quiz',
    description: 'Practice intervals',
  },
  {
    title: 'Random Chord Practice',
    href: '/exercises/random-chord-practice',
    description: 'Practice random chords',
  },
  {
    title: 'Interval Quiz',
    href: '/exercises/interval-quiz',
    description: 'Practice intervals',
  },
  {
    title: 'Random Chord Practice',
    href: '/exercises/random-chord-practice',
    description: 'Practice random chords',
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
              <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  )
}
