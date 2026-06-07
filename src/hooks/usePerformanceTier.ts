'use client'

import { useMemo } from 'react'
import type { PerformanceTier } from '@/types'

export function usePerformanceTier(): PerformanceTier {
  return useMemo((): PerformanceTier => {
    if (typeof window === 'undefined') return 'high'
    const cores = navigator.hardwareConcurrency ?? 4
    const dpr = window.devicePixelRatio ?? 1
    const isMobile = /Mobi|Android/i.test(navigator.userAgent)
    if (cores < 4 || dpr > 2.5 || isMobile) return 'low'
    return 'high'
  }, [])
}
