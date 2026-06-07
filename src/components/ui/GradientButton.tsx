'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import type { ReactNode, MouseEvent } from 'react'

interface GradientButtonProps {
  children: ReactNode
  href?: string
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  variant?: 'primary' | 'glass' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  target?: string
  rel?: string
  className?: string
}

export function GradientButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  target,
  rel,
  className,
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
  }

  const variantClasses = {
    primary: cn(
      'relative font-semibold text-white overflow-hidden',
      'bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500',
      'bg-[length:200%_100%] bg-[position:0%_center]',
      'hover:bg-[position:100%_center] hover:brightness-110',
      'active:scale-[0.97]',
      'shadow-[0_0_24px_rgba(99,102,241,0.25)]',
      'hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]',
      'transition-all duration-300'
    ),
    glass: cn(
      'font-medium text-slate-300',
      'bg-[rgba(9,9,26,0.6)] backdrop-blur-xl',
      'border border-white/[0.06]',
      'hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]',
      'hover:text-white',
      'transition-all duration-300'
    ),
    ghost: cn(
      'font-medium text-slate-400',
      'bg-transparent border-none',
      'hover:text-white',
      'transition-all duration-200'
    ),
  }

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2',
    'cursor-pointer select-none',
    sizeClasses[size],
    variantClasses[variant],
    disabled && 'opacity-50 pointer-events-none',
    className
  )

  const content = (
    <>
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
      {children}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        onClick={onClick as (e: MouseEvent<HTMLAnchorElement>) => void}
        whileHover={{ scale: variant === 'primary' ? 1.02 : 1.0 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick as (e: MouseEvent<HTMLButtonElement>) => void}
      disabled={disabled || loading}
      whileHover={{ scale: variant === 'primary' ? 1.02 : 1.0 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      {content}
    </motion.button>
  )
}
