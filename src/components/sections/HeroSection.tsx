'use client'

import { motion } from 'framer-motion'
import { Code2, Briefcase, MessageSquare, BookOpen } from 'lucide-react'
import { PERSON } from '@/lib/data'
import { GradientButton } from '@/components/ui/GradientButton'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import { ScrambleHeading } from '@/components/ui/ScrambleText'

const socialLinks = [
  { icon: Code2, href: PERSON.github, label: 'GitHub' },
  { icon: Briefcase, href: PERSON.linkedin, label: 'LinkedIn' },
  { icon: MessageSquare, href: PERSON.twitter, label: 'Twitter' },
  { icon: Code2, href: PERSON.leetcode, label: 'LeetCode' },
  { icon: BookOpen, href: PERSON.medium, label: 'Medium' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94] as const,

    },
  }),
}

export default function HeroSection() {
  return (
    <div className="relative flex flex-col justify-center px-6 md:px-16 lg:px-24 h-full">
      <div className="max-w-3xl">
        {/* Availability chip */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              {PERSON.availability}
            </span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 font-display font-extrabold tracking-[-0.04em] bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 1.05 }}
        >
          <ScrambleHeading firstName={PERSON.name.split(' ')[0]} lastName={PERSON.name.split(' ').slice(1).join(' ')} />
        </motion.h1>

        {/* Title */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 font-mono text-cyan-500 text-lg tracking-tight"
        >
          {PERSON.title}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          custom={2.5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-1 font-mono text-sm text-slate-500 tracking-tight"
        >
          {PERSON.subtitle}
        </motion.p>

        {/* Bio */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-slate-400 text-lg leading-relaxed max-w-xl"
        >
          {PERSON.bio}
        </motion.p>

        {/* CTA row */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap gap-3"
        >
          <GradientButton
            variant="primary"
            size="lg"
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Projects
          </GradientButton>
          <GradientButton
            variant="glass"
            size="lg"
            href={PERSON.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </GradientButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 flex items-center gap-2"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all duration-200 hover:scale-110"
              aria-label={social.label}
            >
              <social.icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#02020a] to-transparent pointer-events-none" />
    </div>
  )
}
