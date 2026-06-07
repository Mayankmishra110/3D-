'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  accentColor?: string
  onClick?: () => void
}

export function GlassCard({
  children,
  className,
  hover = false,
  accentColor,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.06] backdrop-blur-xl',
        'bg-[rgba(9,9,26,0.6)]',
        'transition-all duration-300',
        hover && 'cursor-pointer hover:border-[rgba(99,102,241,0.35)] hover:shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_24px_64px_rgba(99,102,241,0.08),inset_0_1px_0_rgba(255,255,255,0.04)]',
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onClick}
      style={{ willChange: hover ? 'transform' : 'auto' }}
    >
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, ${accentColor} 0%, transparent 100%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
