'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Code2, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { TechBadge } from '@/components/ui/TechBadge'
import { PROJECTS } from '@/lib/data'
import type { Project } from '@/types'
import { useCallback } from 'react'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const normalX = (e.clientX - rect.left) / rect.width - 0.5
      const normalY = (e.clientY - rect.top) / rect.height - 0.5
      x.set(normalX)
      y.set(normalY)
    },
    [x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      className={
        project.size === 'large'
          ? 'col-span-4 lg:col-span-2'
          : 'col-span-4 md:col-span-2 lg:col-span-2'
      }
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}

      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <GlassCard
        hover
        accentColor={project.accentColor}
        className={project.size === 'large' ? 'min-h-[400px]' : 'min-h-[320px]'}
      >
        <div className="p-7 flex flex-col h-full">
          {/* Category badge */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-slate-600 text-sm font-mono mt-1">
                {project.tagline}
              </p>
            </div>
            <span
              className="shrink-0 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}33`,
                backgroundColor: `${project.accentColor}10`,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed mt-2 line-clamp-3 flex-grow">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.highlights.map((highlight) => (
              <span
                key={highlight}
                className="text-xs font-mono px-2 py-0.5 rounded-full"
                style={{
                  color: project.accentColor,
                  backgroundColor: `${project.accentColor}15`,
                }}
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((t) => (
              <TechBadge key={t} name={t} variant="outline" />
            ))}
          </div>

          {/* Footer links */}
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.04]">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors duration-200"
                aria-label={`${project.title} GitHub`}
              >
                <Code2 className="w-[18px] h-[18px]" />
              </a>
            ) : (
              <span className="text-slate-700 cursor-not-allowed">
                <Code2 className="w-[18px] h-[18px]" />
              </span>
            )}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors duration-200"
                aria-label={`${project.title} Live`}
              >
                <ExternalLink className="w-[18px] h-[18px]" />
              </a>
            ) : (
              <span className="text-slate-700 cursor-not-allowed">
                <ExternalLink className="w-[18px] h-[18px]" />
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          label="> mayank.projects()"
          title="Products people actually use."
          subtitle="From B2B SaaS platforms to App Store apps — every project ships to production."
        />

        <div className="grid grid-cols-4 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
