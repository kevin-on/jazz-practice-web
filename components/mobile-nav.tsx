'use client'

import { Menu, Music } from 'lucide-react'
import { menuItems } from '@/config/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent
        side="left"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
        className="text-lg"
      >
        <Link
          href="/"
          className="mb-4 flex items-center"
          onClick={() => {
            setOpen(false)
          }}
        >
          <Music className="mr-2 h-4 w-4" />
          <span className="font-bold">Jazz Practice</span>
        </Link>
        <ScrollArea>
          <div className="flex flex-col space-y-3">
            {menuItems.map(({ title, href }) => (
              <Link
                href={href}
                key={href}
                onClick={() => {
                  setOpen(false)
                }}
              >
                {title}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
