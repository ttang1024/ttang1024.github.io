import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Wifi, Battery, ChevronLeft } from 'lucide-react'
import type { AppId, AppConfig } from '../App'

const ICON_GRADIENT: Record<AppId, string> = {
  about: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
  skills: 'linear-gradient(135deg, #4b5563 0%, #111827 100%)',
  experience: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
  education: 'linear-gradient(135deg, #f472b6 0%, #e11d48 100%)',
  contact: 'linear-gradient(135deg, #38bdf8 0%, #06b6d4 100%)',
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
  const dockAppIds: AppId[] = ['about', 'education', 'contact']
  const homeAppIds = appIds.filter(id => !dockAppIds.includes(id))

  const renderAppIcon = (id: AppId) => (
    <motion.button
      key={id}
      className="flex flex-col items-center gap-2"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      whileTap={{ scale: 0.88 }}
      onClick={() => setOpenApp(id)}
    >
      <div
        style={{
          width: 72,
          height: 72,
          minWidth: 72,
          minHeight: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 18,
          color: '#fff',
          background: ICON_GRADIENT[id],
          boxShadow: '0 10px 18px rgba(0, 0, 0, 0.22), inset 0 0 0 1px rgba(255, 255, 255, 0.24)',
          fontSize: 34,
          lineHeight: 1,
        }}
      >
        {apps[id].icon}
      </div>
      <span className="text-white text-[12px] font-medium text-center leading-tight drop-shadow">
        {apps[id].title}
      </span>
    </motion.button>
  )

  return (
    <div className="relative z-10 w-full h-full flex flex-col overflow-hidden select-none">

      {/* ── iOS Status Bar ── */}
      <div className="flex items-center justify-between px-6 pt-4 pb-1 text-white font-semibold z-10 shrink-0">
        <span className="text-[16px]">{fmt(time)}</span>
        <div className="flex items-center gap-1.5 text-white">
          <Wifi size={15} />
          <Battery size={20} />
        </div>
      </div>

      {/* ── Springboard ── */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-x-6 gap-y-7 px-8 pb-8 pt-10">
          {homeAppIds.map(renderAppIcon)}
        </div>
      </div>

      {/* ── iPhone Dock ── */}
      <div className="relative z-10 px-5 pb-5 pt-2 shrink-0">
        <div className="grid grid-cols-3 gap-3 rounded-[28px] bg-white/20 px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.24)] ring-1 ring-white/25 backdrop-blur-2xl">
          {dockAppIds.map(renderAppIcon)}
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
                {apps[openApp].title}
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
