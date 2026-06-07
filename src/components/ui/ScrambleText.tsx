'use client'

import { useEffect, useState, useRef } from 'react'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

interface ScrambleTextProps {
  text: string
  delay?: number     // ms before animation starts
  speed?: number     // ms per frame (lower = faster)
  className?: string
  onComplete?: () => void
}

export function ScrambleText({
  text,
  delay = 0,
  speed = 30,
  className,
  onComplete,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState('')
  const iterationsRef = useRef(0)
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Start with scrambled version of same length
    setDisplay(
      text.split('').map(() =>
        SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      ).join('')
    )

    timeoutRef.current = setTimeout(() => {
      iterationsRef.current = 0

      frameRef.current = setInterval(() => {
        const iterations = iterationsRef.current

        setDisplay(
          text.split('').map((char, i) => {
            // Spaces and special chars reveal instantly
            if (char === ' ') return ' '

            // Already-revealed characters stay fixed
            if (i < Math.floor(iterations)) return char

            // Still-scrambling characters show random chars
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          }).join('')
        )

        // Advance by a fraction — controls how smooth the reveal feels
        // Higher = faster reveal per frame
        iterationsRef.current += 0.35

        if (iterationsRef.current >= text.length) {
          clearInterval(frameRef.current!)
          setDisplay(text) // ensure final state is exact
          onComplete?.()
        }
      }, speed)
    }, delay)

    return () => {
      clearInterval(frameRef.current!)
      clearTimeout(timeoutRef.current!)
    }
  }, [text, delay, speed, onComplete])

  return (
    <span
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }} // prevents layout shift during scramble
      aria-label={text} // screen readers get the real text
    >
      {display}
    </span>
  )
}

interface ScrambleHeadingProps {
  firstName: string
  lastName: string
  className?: string
}

export function ScrambleHeading({ firstName, lastName, className }: ScrambleHeadingProps) {
  const [firstDone, setFirstDone] = useState(false)

  return (
    <span className={className}>
      <ScrambleText
        text={firstName}
        delay={300}
        onComplete={() => setFirstDone(true)}
      />
      {' '}
      {/* Last name starts after first name finishes — feels like typing */}
      <ScrambleText
        text={lastName}
        delay={firstDone ? 0 : 800}
      />
    </span>
  )
}
