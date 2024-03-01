import { ScrollArea } from '@/components/ui/scroll-area'

export default function ExercisesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ScrollArea className="h-full py-6">{children}</ScrollArea>
}
