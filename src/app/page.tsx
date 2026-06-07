'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const SceneContainer = dynamic(
  () => import('@/components/canvas/SceneContainer'),
  { ssr: false, loading: () => null }
)

import Navigation from '@/components/sections/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />

      {/* Hero: fixed-height with canvas + DOM overlay */}
      <section id="hero" className="relative h-screen overflow-hidden">
        {/* 3D Canvas — absolute, behind DOM content */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-bg" />}>
            <SceneContainer />
          </Suspense>
        </div>
        {/* DOM overlay — above canvas */}
        <div className="relative z-10 h-full pointer-events-none">
          <div className="pointer-events-auto h-full">
            <HeroSection />
          </div>
        </div>
      </section>

      {/* DOM sections with consistent vertical rhythm */}
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-text-3 font-mono text-xs">
        <p>Built with Next.js, R3F & Framer Motion · mayankbuilt.com</p>
        <p className="mt-1">© {new Date().getFullYear()} Mayank Mishra</p>
      </footer>
    </main>
  )
}
