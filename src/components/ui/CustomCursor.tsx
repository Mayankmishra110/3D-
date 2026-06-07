'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  // The dot follows mouse instantly
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  // The ring follows with a spring lag — this creates the "trailing" feel
  const ringX = useSpring(dotX, { stiffness: 120, damping: 18, mass: 0.5 })
  const ringY = useSpring(dotY, { stiffness: 120, damping: 18, mass: 0.5 })

  const [variant, setVariant] = useState<'default' | 'hover' | 'click' | 'text'>('default')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Offset by half the element size to center it on cursor
      dotX.set(e.clientX - 4)
      dotY.set(e.clientY - 4)
      ringX.set(e.clientX - 20)
      ringY.set(e.clientY - 20)
      if (!isVisible) setIsVisible(true)
    }

    const onEnterLink = () => setVariant('hover')
    const onLeaveLink = () => setVariant('default')
    const onMouseDown = () => setVariant('click')
    const onMouseUp = () => setVariant('hover')
    const onLeaveWindow = () => setIsVisible(false)
    const onEnterWindow = () => setIsVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onLeaveWindow)
    document.addEventListener('mouseenter', onEnterWindow)

    // Apply hover variant to all interactive elements
    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
    const interactiveEls = document.querySelectorAll(interactiveSelectors)

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onLeaveWindow)
      document.removeEventListener('mouseenter', onEnterWindow)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [dotX, dotY, ringX, ringY, isVisible])

  // Ring size/color based on variant
  const ringVariants = {
    default: { width: 40, height: 40, borderColor: 'rgba(99, 102, 241, 0.5)', backgroundColor: 'transparent', scale: 1 },
    hover:   { width: 56, height: 56, borderColor: 'rgba(6, 182, 212, 0.8)',   backgroundColor: 'rgba(6, 182, 212, 0.06)', scale: 1 },
    click:   { width: 32, height: 32, borderColor: 'rgba(99, 102, 241, 1)',     backgroundColor: 'rgba(99, 102, 241, 0.15)', scale: 0.9 },
    text:    { width: 4,  height: 32, borderColor: 'rgba(255, 255, 255, 0.8)', backgroundColor: 'rgba(255,255,255,0.8)', scale: 1 },
  }

  if (typeof window === 'undefined') return null

  return (
    <>
      {/* Outer ring — laggy spring follower */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          borderRadius: '50%',
          border: '1.5px solid',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: 'difference',
        }}
        animate={variant}
        variants={ringVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {/* Inner dot — instant follower */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: variant === 'hover' ? '#06b6d4' : '#6366f1',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: variant === 'click' ? 0.6 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
    </>
  )
}
