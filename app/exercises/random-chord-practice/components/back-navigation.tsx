'use client'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { memo } from 'react'

const BackNavigation = memo(function BackNavigation() {
  return (
    <div>
      <Link
        className={cn(buttonVariants({ variant: 'ghost' }), 'pl-2 pr-4')}
        href="/exercises"
      >
        <ChevronLeft className="h-6 w-6" />
        Back to Exercises
      </Link>
    </div>
  )
})

export default BackNavigation
