'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { menuItems } from '@/config/navigation'

export default function MainNav() {
  const pathname = usePathname()
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map(({ title, href }) => (
          <NavigationMenuItem key={href}>
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'transition-colors hover:text-foreground/80',
                  pathname.startsWith(href)
                    ? 'text-foreground'
                    : 'text-foreground/60',
                )}
              >
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
