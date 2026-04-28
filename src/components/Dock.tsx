import { useState } from 'react'
import { motion } from 'motion/react'
import type { AppId, AppConfig, WindowState } from '../App'

interface DockProps {
  apps: Record<AppId, AppConfig>
  windowStates: Record<AppId, WindowState>
  onOpen: (id: AppId) => void
}

const DOCK_ICON_STYLES: Record<AppId, string> = {
  about:      'from-blue-400 to-blue-600',
  skills:     'from-gray-600 to-gray-900',
  experience: 'from-amber-400 to-orange-500',
  education:  'from-pink-400 to-rose-600',
  contact:    'from-sky-400 to-cyan-500',
}

const DOCK_EMOJIS: Record<AppId, string> = {
  about:      '🧑‍💻',
  skills:     '⌨️',
  experience: '💼',
  education:  '🎓',
  contact:    '✉️',
}

export default function Dock({ apps, windowStates, onOpen }: DockProps) {
  const [bouncing, setBouncing] = useState<AppId | null>(null)

  const handleClick = (id: AppId) => {
    setBouncing(id)
    onOpen(id)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-2 z-[9999] pointer-events-none">
      <div className="flex items-end gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl pointer-events-auto">
        {(Object.entries(apps) as [AppId, AppConfig][]).map(([id, app]) => {
          const state = windowStates[id]
          const isOpen = state?.open && !state?.minimized
          return (
            <div
              key={id}
              data-dock-icon={id}
              className="relative flex flex-col items-center gap-1 cursor-pointer group"
              onClick={() => handleClick(id)}
            >
              {/* Tooltip */}
              <span className="absolute -top-12 px-2 py-1 backdrop-blur-md bg-white/80 text-gray-800 text-xs font-medium rounded-md shadow opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-150 pointer-events-none">
                {app.title}
              </span>

              {/* Icon */}
              <motion.div
                className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${DOCK_ICON_STYLES[id]} flex items-center justify-center text-[20px] md:text-[28px] leading-none shadow-md`}
                whileHover={{ scale: 1.25, y: -8 }}
                whileTap={{ scale: 0.92 }}
                animate={bouncing === id ? {
                  y: [0, -18, 0, -9, 0],
                  transition: {
                    duration: 0.55,
                    times: [0, 0.3, 0.55, 0.75, 1],
                    ease: 'easeOut',
                    onComplete: () => setBouncing(null),
                  },
                } : { y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                {DOCK_EMOJIS[id]}
              </motion.div>

              {/* Dot */}
              <motion.span
                className="w-1 h-1 rounded-full bg-white/80"
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
