'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail, Code2, Briefcase } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GradientButton } from '@/components/ui/GradientButton'
import { PERSON } from '@/lib/data'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const inputClass = cn(
  'w-full bg-[rgba(9,9,26,0.8)] border border-white/[0.06] rounded-lg',
  'px-4 py-3 text-sm text-slate-100 placeholder-slate-600',
  'transition-all duration-200',
  'focus:outline-none focus:border-[rgba(99,102,241,0.55)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]',
  'hover:border-white/[0.1]'
)

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormState('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    setFormState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setFormState('success')
    } catch (err) {
      setFormState('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }, [name, email, subject, message])

  return (
    <section
      id="contact"
      className="relative py-32 border-t border-white/[0.04] bg-[#09091a]/30"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(99,102,241,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 lg:px-8">
        <SectionHeader
          label="> contact.init()"
          title="Let's build something exceptional."
          subtitle="Open to Senior Frontend / SDE-2 roles at product-focused companies."
          align="center"
        />

        <AnimatePresence mode="wait">
          {formState === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-4 py-16 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Message sent!
              </h3>
              <p className="text-slate-400 max-w-sm">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
              <GradientButton
                variant="glass"
                size="sm"
                onClick={() => {
                  setFormState('idle')
                  setName('')
                  setEmail('')
                  setSubject('')
                  setMessage('')
                }}
              >
                Send another
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Let's talk about..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Tell me about the role or project..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(inputClass, 'resize-none')}
                />
              </div>

              {formState === 'error' && errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-3"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMessage}
                </motion.div>
              )}

              <GradientButton
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                loading={formState === 'loading'}
                disabled={formState === 'loading'}
                className="w-full"
              >
                <Send className="w-4 h-4" />
                Send Message
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alternative contact links */}
        <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-white/[0.04]">
          <a
            href={`mailto:${PERSON.email}`}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            {PERSON.email}
          </a>
          <a
            href={PERSON.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors duration-200"
          >
            <Code2 className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={PERSON.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors duration-200"
          >
            <Briefcase className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
