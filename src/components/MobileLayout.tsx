import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Wifi, Battery, ChevronLeft } from 'lucide-react'
import type { AppId, AppConfig } from '../App'

const ICON_GRADIENT: Record<AppId, string> = {
  about: 'from-blue-400 to-blue-600',
  skills: 'from-gray-600 to-gray-900',
  experience: 'from-amber-400 to-orange-500',
  education: 'from-pink-400 to-rose-600',
  contact: 'from-sky-400 to-cyan-500',
}

const ICON_EMOJI: Record<AppId, string> = {
  about: '🧑‍💻',
  skills: '⌨️',
  experience: '💼',
  education: '🎓',
  contact: '✉️',
}

interface Props {
  apps: Record<AppId, AppConfig>
  appComponents: Record<AppId, React.ReactNode>
}

export default function MobileLayout({ apps, appComponents }: Props) {
  const [openApp, setOpenApp] = useState<AppId | null>(null)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const fmt = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  const appIds = Object.keys(apps) as AppId[]

  return (
    <div className="w-full h-full flex flex-col overflow-hidden select-none">

      {/* ── iOS Status Bar ── */}
      <div className="flex items-center justify-between px-6 pt-4 pb-1 text-white font-semibold z-10 shrink-0">
        <span className="text-[16px]">{fmt(time)}</span>
        <div className="flex items-center gap-1.5 text-white">
          <Wifi size={15} />
          <Battery size={20} />
        </div>
      </div>

      {/* ── Springboard ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-x-6 gap-y-7 px-8 pb-8 pt-10">
          {appIds.map(id => (
            <motion.button
              key={id}
              className="flex flex-col items-center gap-2"
              whileTap={{ scale: 0.88 }}
              onClick={() => setOpenApp(id)}
            >
              <div
                className={`w-[72px] h-[72px] rounded-[18px] bg-gradient-to-br ${ICON_GRADIENT[id]} flex items-center justify-center text-[32px] shadow-lg`}
              >
                {ICON_EMOJI[id]}
              </div>
              <span className="text-white text-[12px] font-medium text-center leading-tight drop-shadow">
                {apps[id].title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── App Sheet (slides up) ── */}
      <AnimatePresence>
        {openApp && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col bg-[#f2f2f7] overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.9 }}
          >
            {/* Sheet nav bar */}
            <div className="flex items-center h-14 px-2 border-b border-black/[0.08] bg-white/80 backdrop-blur-xl shrink-0">
              <button
                className="flex items-center gap-0.5 text-[#007aff] text-[16px] font-normal px-2 py-2"
                onClick={() => setOpenApp(null)}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
                Home
              </button>
              <span className="flex-1 text-center font-semibold text-[17px] text-[#1c1c1e] pr-20">
                {ICON_EMOJI[openApp]}&nbsp;{apps[openApp].title}
              </span>
            </div>

            {/* Sheet content */}
            <div className="flex-1 overflow-hidden">
              {appComponents[openApp]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
