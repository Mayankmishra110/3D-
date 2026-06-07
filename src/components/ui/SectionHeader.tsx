'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn('mb-16', align === 'center' && 'text-center')}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}

    >
      <p className="font-mono text-indigo-500 text-sm uppercase tracking-widest mb-3">
        {label}
      </p>
      <h2
        className="font-display font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          letterSpacing: '-0.03em',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-slate-400 mt-4 max-w-xl text-lg leading-relaxed',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
