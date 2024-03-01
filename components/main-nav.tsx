'use client'

import { usePathname } from 'next/navigation'
import { Music } from 'lucide-react'
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

export default function MainNav() {
  const pathname = usePathname()
  return (
    <NavigationMenu>
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Music className="h-6 w-6" />
        <span className="font-bold">Jazz Practice</span>
      </Link>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/exercises" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'transition-colors hover:text-foreground/80',
                pathname === '/exercises'
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              Exercises
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'transition-colors hover:text-foreground/80',
                pathname === '/about'
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'transition-colors hover:text-foreground/80',
                pathname === '/contact'
                  ? 'text-foreground'
                  : 'text-foreground/60',
              )}
            >
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
