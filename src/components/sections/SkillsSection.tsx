'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TechBadge } from '@/components/ui/TechBadge'
import { SKILLS } from '@/lib/data'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -5,
    transition: { duration: 0.15 },
  },
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section
      id="skills"
      className="relative py-32 border-t border-white/[0.04] bg-[#09091a]/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          label="> mayank.skills()"
          title="The stack behind the products."
          align="center"
        />

        {/* Tab bar */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-1 bg-[#09091a] rounded-xl p-1 border border-white/[0.04]">
            {SKILLS.map((group, i) => (
              <button
                key={group.label}
                onClick={() => setActiveTab(i)}
                className={cn(
                  'relative px-5 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer',
                  activeTab === i ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                )}
              >
                {activeTab === i && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-lg bg-[#0e0e20] border border-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-mono text-xs uppercase tracking-wider">
                  {group.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Skill grid */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            >
              {SKILLS[activeTab].items.map((skill) => (
                <motion.div key={skill} variants={itemVariants}>
                  <TechBadge name={skill} variant="glow" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
