'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TechBadgeProps {
  name: string
  variant?: 'default' | 'outline' | 'glow'
}

export function TechBadge({ name, variant = 'default' }: TechBadgeProps) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 border',
        variant === 'default' && 'bg-[#0e0e20]/80 text-slate-400 border-white/[0.06] hover:border-indigo-500/40 hover:text-white',
        variant === 'outline' && 'bg-transparent text-slate-400 border-white/[0.06] hover:border-indigo-500/30 hover:text-white',
        variant === 'glow' && 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:border-indigo-500/40 hover:text-white'
      )}
      whileHover={{ scale: 1.05, borderColor: 'rgba(99,102,241,0.5)' }}
      transition={{ duration: 0.15 }}
    >
      {name}
    </motion.span>
  )
}
