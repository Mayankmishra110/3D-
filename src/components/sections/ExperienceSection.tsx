'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { EXPERIENCE } from '@/lib/data'

// Map the generic EXPERIENCE to the shape the UI expects
const experiences = EXPERIENCE.map((exp, i) => ({
  id: i,
  period: exp.period,
  title: exp.title,
  company: exp.company,
  location: exp.location,
  type: exp.type,
  description: exp.description,
  achievements: exp.highlights,
  stack: exp.tech,
  accentColor: ['#6366f1', '#06b6d4', '#8b5cf6', '#10b981'][i % 4]
}))

// ─── Single experience card ───────────────────────────────
function ExperienceCard({
  exp,
  index,
  totalCount,
}: {
  exp: typeof experiences[0]
  index: number
  totalCount: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative flex gap-8 pb-16" ref={cardRef}>

      {/* ── Timeline dot ── */}
      <div className="relative flex flex-col items-center" style={{ minWidth: '20px' }}>
        <motion.div
          className="w-3 h-3 rounded-full border-2 mt-1 z-10"
          style={{ borderColor: exp.accentColor, backgroundColor: 'transparent' }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1, backgroundColor: exp.accentColor }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
        />
      </div>

      {/* ── Card ── */}
      <motion.div
        className="flex-1"
        style={{ perspective: '800px' }}
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{
          delay: index * 0.08,
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        {/* Glass card */}
        <div
          className="glass rounded-2xl p-6 border"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {/* Period badge */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-mono px-3 py-1 rounded-full border"
              style={{
                borderColor: exp.accentColor + '40',
                color: exp.accentColor,
                backgroundColor: exp.accentColor + '10',
              }}
            >
              📅 {exp.period}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>

          {/* Company */}
          <div className="flex items-center gap-2 mb-1">
            <span style={{ color: exp.accentColor }} className="text-sm font-medium">
              🏢 {exp.company}
            </span>
          </div>

          {/* Location + type */}
          <p className="text-xs text-gray-500 font-mono mb-4">
            📍 {exp.location} &nbsp; {exp.type}
          </p>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            {exp.description}
          </p>

          {/* Achievement bullets — stagger in */}
          <ul className="space-y-2 mb-5">
            {exp.achievements.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-300"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
              >
                <span style={{ color: exp.accentColor }} className="mt-0.5 text-xs">▸</span>
                {item}
              </motion.li>
            ))}
          </ul>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2">
            {exp.stack.map((tech) => (
              <motion.span
                key={tech}
                className="text-xs px-3 py-1 rounded-full border text-gray-400"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                whileHover={{
                  borderColor: exp.accentColor + '60',
                  color: exp.accentColor,
                  transition: { duration: 0.15 },
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })

  // Smooth the scroll progress for the line draw
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  })

  // The line's scaleY goes from 0 → 1 as you scroll through
  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1])

  // The dot's Y position tracks along the line
  // (these pixel values depend on your section height — adjust as needed)
  const dotY = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12"
    >
      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-16">
        <p className="text-xs font-mono text-indigo-400 mb-4 tracking-widest">
          &gt; MAYANK.EXPERIENCE()
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          A trajectory, not just a timeline.
        </h2>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative flex gap-8">

          {/* ══ SCROLL-DRAW TIMELINE LINE ═══════════════════
              The outer container is full height (relative).
              The inner motion.div scales from top, drawing
              the line exactly as you scroll.
          ══════════════════════════════════════════════════ */}
          <div
            className="relative hidden md:block"
            style={{ width: '2px', minHeight: '100%', flexShrink: 0 }}
          >
            {/* Track (faint background line) */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />

            {/* Animated fill line */}
            <motion.div
              ref={lineRef}
              className="absolute top-0 left-0 right-0 rounded-full origin-top"
              style={{
                background: 'linear-gradient(to bottom, #6366f1, #06b6d4)',
                scaleY: lineScaleY,
                height: '100%',
              }}
            />

            {/* Sliding dot indicator */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{
                top: dotY,
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                boxShadow: '0 0 8px #6366f180',
                marginTop: '-6px',
              }}
            />
          </div>

          {/* ── Experience cards column ── */}
          <div className="flex-1 space-y-0">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={i}
                totalCount={experiences.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
