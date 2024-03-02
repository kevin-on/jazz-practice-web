'use client'

import { Menu } from 'lucide-react'
import { menuItems } from './main-nav'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export default function DropdownNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
        align="end"
        className="w-36"
      >
        {menuItems.map(({ title, href }) => (
          <Link href={href} key={href}>
            <DropdownMenuItem>
              <div className="text-lg">{title}</div>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
