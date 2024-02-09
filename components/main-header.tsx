import MainNav from './main-nav'
import { ModeToggle } from './mode-toggle'

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40">
      <div className="flex h-14 items-center justify-between">
        <MainNav />
        <ModeToggle />
      </div>
    </header>
  )
}
