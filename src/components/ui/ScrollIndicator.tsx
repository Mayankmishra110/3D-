'use client'

import { motion } from 'framer-motion'

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <span className="font-mono text-xs text-slate-600 uppercase tracking-[0.15em]">
        scroll
      </span>
      <motion.svg
        width="16"
        height="24"
        viewBox="0 0 16 24"
        fill="none"
        className="text-slate-600"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <path
          d="M8 4V18M8 18L2 12M8 18L14 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  )
}
