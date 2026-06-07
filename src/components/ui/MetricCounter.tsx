'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useMotionValue, useSpring, motion } from 'framer-motion'
import { formatNumber } from '@/lib/utils'
import { GlassCard } from './GlassCard'

interface MetricCounterProps {
  value: number
  suffix: string
  label: string
  description: string
}

export function MetricCounter({ value, suffix, label, description }: MetricCounterProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 55, damping: 22 })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (inView) {
      motionValue.set(value)
    }
  }, [inView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = formatNumber(Math.round(latest))
      }
    })
    return unsubscribe
  }, [springValue])

  return (
    <div ref={ref}>
      <GlassCard
        hover
        className="p-6 group"
      >
        <div className="flex items-baseline gap-1">
          <span
            ref={displayRef}
            className="font-display text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            0
          </span>
          {suffix && (
            <span className="font-mono text-2xl text-cyan-500 font-medium">
              {suffix}
            </span>
          )}
        </div>
        <p className="text-slate-100 font-semibold mt-2 text-sm">{label}</p>
        <p className="text-slate-600 text-xs font-mono mt-1">{description}</p>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-indigo-500/5 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
      </GlassCard>
    </div>
  )
}
