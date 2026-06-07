'use client'

import { useState, useEffect, useCallback } from 'react'
import { clamp } from '@/lib/utils'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.body.scrollHeight - window.innerHeight
    if (docHeight <= 0) {
      setProgress(0)
      return
    }
    setProgress(clamp(scrollTop / docHeight, 0, 1))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return progress
}
