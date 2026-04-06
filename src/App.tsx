import { useState, useCallback } from 'react'
import BootScreen from './components/BootScreen'
import DesktopBackground from './components/DesktopBackground'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import Window from './components/Window'
import MobileLayout from './components/MobileLayout'
import AboutApp from './components/apps/AboutApp'
import SkillsApp from './components/apps/SkillsApp'
import ExperienceApp from './components/apps/ExperienceApp'
import EducationApp from './components/apps/EducationApp'
import ContactApp from './components/apps/ContactApp'
import { useBreakpoint } from './hooks/useBreakpoint'

export type AppId = 'about' | 'skills' | 'experience' | 'education' | 'contact'

export interface AppConfig {
  id: AppId
  title: string
  icon: string
  width: number
  height: number
  defaultPos: { x: number; y: number }
}

export interface WindowState {
  open: boolean
  minimized: boolean
}

export const APPS: Record<AppId, AppConfig> = {
  about: {
    id: 'about',
    title: 'About Me',
    icon: '🧑‍💻',
    width: 700,
    height: 500,
    defaultPos: { x: 80, y: 60 },
  },
  skills: {
    id: 'skills',
    title: 'Terminal',
    icon: '⬛',
    width: 640,
    height: 460,
    defaultPos: { x: 160, y: 80 },
  },
  experience: {
    id: 'experience',
    title: 'Experience',
    icon: '💼',
    width: 720,
    height: 540,
    defaultPos: { x: 100, y: 50 },
  },
  education: {
    id: 'education',
    title: 'Education',
    icon: '🎓',
    width: 560,
    height: 420,
    defaultPos: { x: 200, y: 90 },
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    icon: '✉️',
    width: 520,
    height: 420,
    defaultPos: { x: 220, y: 100 },
  },
}

const APP_COMPONENTS: Record<AppId, React.ReactNode> = {
  about: <AboutApp />,
  skills: <SkillsApp />,
  experience: <ExperienceApp />,
  education: <EducationApp />,
  contact: <ContactApp />,
}

const INITIAL_WINDOW_STATES: Record<AppId, WindowState> = {
  about: { open: true, minimized: false },
  skills: { open: false, minimized: false },
  experience: { open: false, minimized: false },
  education: { open: false, minimized: false },
  contact: { open: false, minimized: false },
}

export default function App() {
  const breakpoint = useBreakpoint()
  const [booted, setBooted] = useState(false)
  const [windowStates, setWindowStates] = useState<Record<AppId, WindowState>>(INITIAL_WINDOW_STATES)
  const [topZ, setTopZ] = useState(10)
  const [zIndexMap, setZIndexMap] = useState<Partial<Record<AppId, number>>>({ about: 10 })
  const [activeApp, setActiveApp] = useState<AppId>('about')
  const [animOrigins, setAnimOrigins] = useState<Partial<Record<AppId, { x: number; y: number }>>>({})

  const bringToFront = useCallback((appId: AppId) => {
    setTopZ(z => {
      const newZ = z + 1
      setZIndexMap(prev => ({ ...prev, [appId]: newZ }))
      return newZ
    })
    setActiveApp(appId)
  }, [])

  const openApp = useCallback((appId: AppId) => {
    const el = document.querySelector(`[data-dock-icon="${appId}"]`)
    if (el) {
      const r = el.getBoundingClientRect()
      setAnimOrigins(prev => ({ ...prev, [appId]: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }))
    }
    setWindowStates(prev => ({
      ...prev,
      [appId]: { open: true, minimized: false },
    }))
    bringToFront(appId)
  }, [bringToFront])

  const closeApp = useCallback((appId: AppId) => {
    setWindowStates(prev => ({
      ...prev,
      [appId]: { ...prev[appId], open: false },
    }))
  }, [])

  const minimizeApp = useCallback((appId: AppId) => {
    setWindowStates(prev => ({
      ...prev,
      [appId]: { ...prev[appId], minimized: true },
    }))
  }, [])

  // ── iPhone ──────────────────────────────────────────────────────────────────
  if (breakpoint === 'mobile') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-black">
        <DesktopBackground />
        <MobileLayout apps={APPS} appComponents={APP_COMPONENTS} />
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
      </div>
    )
  }

  // ── iPad + Desktop ───────────────────────────────────────────────────────────
  const isTablet = breakpoint === 'tablet'

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <DesktopBackground />
      <MenuBar
        activeAppTitle={APPS[activeApp]?.title ?? 'Finder'}
        activeAppId={activeApp}
        openApps={(Object.entries(windowStates) as [AppId, WindowState][])
          .filter(([, s]) => s.open && !s.minimized)
          .map(([id]) => ({ id, title: APPS[id].title }))}
        onOpenApp={openApp}
        onMinimizeActive={() => minimizeApp(activeApp)}
        onCloseActive={() => closeApp(activeApp)}
      />

      <div className="absolute inset-0 top-8">
        {(Object.entries(windowStates) as [AppId, WindowState][]).map(([appId, state]) => {
          if (!state.open || state.minimized) return null
          const app = APPS[appId]

          // Desktop: 3/4 screen width, centered in available area
          const desktopW = Math.round(window.innerWidth * 0.75)
          const availH = window.innerHeight - 32 /* menubar */ - 80 /* dock */
          const desktopH = Math.min(Math.round(availH * 0.85), 720)
          const desktopX = Math.round((window.innerWidth - desktopW) / 2)
          const desktopY = Math.round((availH - desktopH) / 2)

          return (
            <Window
              key={appId}
              title={app.title}
              icon={app.icon}
              width={isTablet ? app.width : desktopW}
              height={isTablet ? app.height : desktopH}
              defaultPos={isTablet ? app.defaultPos : { x: desktopX, y: desktopY }}
              zIndex={zIndexMap[appId] ?? 1}
              animOrigin={animOrigins[appId]}
              isTablet={isTablet}
              onClose={() => closeApp(appId)}
              onMinimize={() => minimizeApp(appId)}
              onFocus={() => bringToFront(appId)}
            >
              {APP_COMPONENTS[appId]}
            </Window>
          )
        })}
      </div>

      <Dock apps={APPS} windowStates={windowStates} onOpen={openApp} />
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
    </div>
  )
}
