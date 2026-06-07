'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { MetricCounter } from '@/components/ui/MetricCounter'
import { STATS } from '@/lib/data'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 border-t border-white/[0.04] overflow-hidden"
    >
      {/* Background treatment */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}

          >
            <SectionHeader
              label="> mayank.about()"
              title="From 0 to Senior in 15 months. Shipping since."
            />

            <div className="space-y-5 text-slate-400 leading-relaxed">
              <p>
                I think in systems — not just components.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 font-semibold">
                  End-to-end ownership
                </span>{' '}
                is my default mode: from database schema to deploy pipeline to pixel-perfect UI.
                Every feature I ship is a system boundary I own.
              </p>
              <p>
                What makes me different? I designed the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 font-semibold">
                  multi-tenant architecture for KAVACH AI
                </span>{' '}
                — a distributed platform spanning Next.js, Spring Boot, Electron, and Expo.
                I went from intern to senior in a record 15 months because I didn&apos;t wait
                for permission to solve hard problems.
              </p>
              <p>
                Currently focused on{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-semibold">
                  AI-first product engineering
                </span>{' '}
                and targeting SDE-2 / Senior Frontend roles at product companies where engineering
                velocity and product taste both matter.
              </p>
            </div>
          </motion.div>

          {/* Right column: Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}

            className="grid grid-cols-2 gap-4 content-start"
          >
            {STATS.map((stat) => (
              <MetricCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                description={stat.description}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
