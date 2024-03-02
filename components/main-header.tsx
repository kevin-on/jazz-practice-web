import Link from 'next/link'
import MainNav from './main-nav'
import { ModeToggle } from './mode-toggle'
import { Music } from 'lucide-react'
import DropdownNav from './dropdown-nav'

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="flex h-14 items-center justify-between">
        <div className="hidden items-center sm:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Music className="h-6 w-6" />
            <span className="font-bold">Jazz Practice</span>
          </Link>
          <MainNav />
        </div>
        <div className="sm:hidden">
          <DropdownNav />
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
