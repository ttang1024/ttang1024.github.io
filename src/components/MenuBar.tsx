import { useState, useEffect, useRef } from 'react'
import { Wifi, Battery, Search, X } from 'lucide-react'
import type { AppId } from '../App'

function AppleLogo() {
  return (
    <svg width="15" height="15" viewBox="0 0 814 1000" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.5 269-317.5 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 30.8 0 133.6 2.6 198.4 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  )
}

// ── Menu item types ──────────────────────────────────────────────────────────
type MenuItemDef =
  | { kind: 'item'; label: string; shortcut?: string; disabled?: boolean; danger?: boolean; action?: () => void }
  | { kind: 'sep' }

// ── Reusable dropdown panel ──────────────────────────────────────────────────
function DropdownPanel({ items, close, minWidth = 200 }: { items: MenuItemDef[]; close: () => void; minWidth?: number }) {
  return (
    <div
      className="absolute top-[calc(100%+2px)] left-0 bg-[#e8e8e8]/95 backdrop-blur-2xl border border-black/[0.13] shadow-2xl rounded-lg py-1 z-[10001]"
      style={{ minWidth }}
    >
      {items.map((item, i) =>
        item.kind === 'sep'
          ? <div key={i} className="h-px bg-black/[0.1] my-[3px] mx-2" />
          : <button
              key={i}
              disabled={item.disabled}
              onClick={() => { if (!item.disabled) { item.action?.(); close() } }}
              className={[
                'group w-full text-left flex items-center justify-between pl-4 pr-3 py-[3px] text-[13px] rounded mx-1 select-none transition-none',
                item.disabled
                  ? 'text-black/30 cursor-default pointer-events-none'
                  : item.danger
                    ? 'text-[#ff3b30] hover:bg-[#007aff] hover:text-white cursor-default'
                    : 'text-[#1c1c1e] hover:bg-[#007aff] hover:text-white cursor-default',
              ].join(' ')}
              style={{ width: 'calc(100% - 8px)' }}
            >
              <span>{item.label}</span>
              {item.shortcut && (
                <span className="ml-6 text-[11px] opacity-50 group-hover:opacity-80 shrink-0">{item.shortcut}</span>
              )}
            </button>
      )}
    </div>
  )
}

// ── App emoji map (for Spotlight) ────────────────────────────────────────────
const APP_EMOJIS: Record<AppId, string> = {
  about: '🧑‍💻',
  skills: '⌨️',
  experience: '💼',
  education: '🎓',
  contact: '✉️',
}

const ALL_APPS: { id: AppId; label: string }[] = [
  { id: 'about',      label: 'About Me' },
  { id: 'skills',     label: 'Terminal' },
  { id: 'experience', label: 'Experience & Projects' },
  { id: 'education',  label: 'Education' },
  { id: 'contact',    label: 'Contact' },
]

// ── Props ────────────────────────────────────────────────────────────────────
interface MenuBarProps {
  activeAppTitle: string
  activeAppId?: AppId
  openApps?: { id: AppId; title: string }[]
  onOpenApp?: (id: AppId) => void
  onMinimizeActive?: () => void
  onCloseActive?: () => void
}

export default function MenuBar({
  activeAppTitle,
  activeAppId,
  openApps = [],
  onOpenApp,
  onMinimizeActive,
  onCloseActive,
}: MenuBarProps) {
  const [time, setTime] = useState(new Date())
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [spotlight, setSpotlight] = useState(false)
  const [query, setQuery] = useState('')
  const menuBarRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Clock
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!openMenu) return
    const handler = (e: MouseEvent) => {
      if (!menuBarRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openMenu])

  // Spotlight focus + cleanup
  useEffect(() => {
    if (spotlight) {
      setTimeout(() => searchRef.current?.focus(), 40)
    } else {
      setQuery('')
    }
  }, [spotlight])

  useEffect(() => {
    if (!spotlight) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSpotlight(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [spotlight])

  const toggle = (id: string) => setOpenMenu(prev => prev === id ? null : id)
  const close = () => setOpenMenu(null)

  const fmt = (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  // ── Menu definitions ───────────────────────────────────────────────────────
  const appleItems: MenuItemDef[] = [
    { kind: 'item', label: 'About This Mac', action: () => onOpenApp?.('about') },
    { kind: 'sep' },
    { kind: 'item', label: 'System Settings…', disabled: true },
    { kind: 'item', label: 'App Store…',        disabled: true },
    { kind: 'sep' },
    { kind: 'item', label: 'Recent Items',      disabled: true },
    { kind: 'sep' },
    { kind: 'item', label: 'Force Quit…',       disabled: true, shortcut: '⌥⌘⎋' },
    { kind: 'sep' },
    { kind: 'item', label: 'Sleep',             disabled: true },
    { kind: 'item', label: 'Restart…',          disabled: true },
    { kind: 'item', label: 'Shut Down…',        disabled: true },
    { kind: 'sep' },
    { kind: 'item', label: 'Lock Screen',       disabled: true, shortcut: '⌃⌘Q' },
    { kind: 'item', label: 'Log Out…',          disabled: true, shortcut: '⇧⌘Q' },
  ]

  const appItems: MenuItemDef[] = [
    { kind: 'item', label: `About ${activeAppTitle}`, action: () => activeAppId && onOpenApp?.(activeAppId) },
    { kind: 'sep' },
    { kind: 'item', label: 'Services',                disabled: true },
    { kind: 'sep' },
    { kind: 'item', label: `Hide ${activeAppTitle}`,  shortcut: '⌘H', action: onMinimizeActive },
    { kind: 'item', label: 'Hide Others',             shortcut: '⌥⌘H', disabled: true },
    { kind: 'item', label: 'Show All',                disabled: true },
    { kind: 'sep' },
    { kind: 'item', label: `Quit ${activeAppTitle}`,  shortcut: '⌘Q', action: onCloseActive, danger: true },
  ]

  const fileItems: MenuItemDef[] = [
    { kind: 'item', label: 'New Window', disabled: true, shortcut: '⌘N' },
    { kind: 'item', label: 'New Tab',    disabled: true, shortcut: '⌘T' },
    { kind: 'sep' },
    { kind: 'item', label: 'Close Window', shortcut: '⌘W', action: onCloseActive },
    { kind: 'sep' },
    { kind: 'item', label: 'Get Info',   disabled: true, shortcut: '⌘I' },
    { kind: 'sep' },
    { kind: 'item', label: 'Print…',     disabled: true, shortcut: '⌘P' },
  ]

  const editItems: MenuItemDef[] = [
    { kind: 'item', label: 'Undo',       disabled: true, shortcut: '⌘Z' },
    { kind: 'item', label: 'Redo',       disabled: true, shortcut: '⇧⌘Z' },
    { kind: 'sep' },
    { kind: 'item', label: 'Cut',        disabled: true, shortcut: '⌘X' },
    { kind: 'item', label: 'Copy',       disabled: true, shortcut: '⌘C' },
    { kind: 'item', label: 'Paste',      disabled: true, shortcut: '⌘V' },
    { kind: 'sep' },
    { kind: 'item', label: 'Select All', disabled: true, shortcut: '⌘A' },
    { kind: 'sep' },
    { kind: 'item', label: 'Find…',      disabled: true, shortcut: '⌘F' },
  ]

  const viewItems: MenuItemDef[] = [
    { kind: 'item', label: 'Show Toolbar',       disabled: true },
    { kind: 'item', label: 'Customize Toolbar…', disabled: true },
    { kind: 'sep' },
    { kind: 'item', label: 'Show Sidebar',   disabled: true, shortcut: '⌃⌘S' },
    { kind: 'sep' },
    { kind: 'item', label: 'Enter Full Screen', disabled: true, shortcut: '⌃⌘F' },
  ]

  const goItems: MenuItemDef[] = [
    { kind: 'item', label: 'About Me',   shortcut: '⌘1', action: () => onOpenApp?.('about') },
    { kind: 'item', label: 'Terminal',   shortcut: '⌘2', action: () => onOpenApp?.('skills') },
    { kind: 'item', label: 'Experience', shortcut: '⌘3', action: () => onOpenApp?.('experience') },
    { kind: 'item', label: 'Education',  shortcut: '⌘4', action: () => onOpenApp?.('education') },
    { kind: 'item', label: 'Contact',    shortcut: '⌘5', action: () => onOpenApp?.('contact') },
    { kind: 'sep' },
    { kind: 'item', label: 'GitHub ↗',   action: () => window.open('https://github.com/ttang1024', '_blank') },
    { kind: 'item', label: 'LinkedIn ↗', action: () => window.open('https://www.linkedin.com/in/ting-tang-24b0b4355/', '_blank') },
  ]

  const windowItems: MenuItemDef[] = [
    { kind: 'item', label: 'Minimize',          shortcut: '⌘M', action: onMinimizeActive },
    { kind: 'item', label: 'Zoom',              disabled: true },
    { kind: 'sep' },
    { kind: 'item', label: 'Bring All to Front', disabled: true },
    ...(openApps.length > 0 ? [
      { kind: 'sep' as const },
      ...openApps.map(a => ({
        kind: 'item' as const,
        label: a.title,
        action: () => onOpenApp?.(a.id),
      })),
    ] : []),
  ]

  const helpItems: MenuItemDef[] = [
    { kind: 'item', label: `${activeAppTitle} Help`, disabled: true, shortcut: '⌘?' },
    { kind: 'sep' },
    { kind: 'item', label: 'View Source Code ↗', action: () => window.open('https://github.com/ttang1024', '_blank') },
  ]

  const LEFT_MENUS = [
    { id: 'file',   label: 'File',   items: fileItems },
    { id: 'edit',   label: 'Edit',   items: editItems },
    { id: 'view',   label: 'View',   items: viewItems },
    { id: 'go',     label: 'Go',     items: goItems },
    { id: 'window', label: 'Window', items: windowItems },
    { id: 'help',   label: 'Help',   items: helpItems },
  ]

  const searchResults = query.trim()
    ? ALL_APPS.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <>
      {/* ── Menu bar ── */}
      <div
        ref={menuBarRef}
        className="fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-3 text-sm font-medium z-[10000] text-white/90"
      >
        {/* Left */}
        <div className="flex items-center gap-0.5">
          {/* Apple */}
          <div className="relative">
            <button
              className={`cursor-default px-2 py-0.5 rounded transition-colors ${openMenu === 'apple' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => toggle('apple')}
            >
              <AppleLogo />
            </button>
            {openMenu === 'apple' && <DropdownPanel items={appleItems} close={close} minWidth={220} />}
          </div>

          {/* Active app */}
          <div className="relative">
            <button
              className={`font-bold px-2 py-0.5 rounded cursor-default transition-colors ${openMenu === 'app' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => toggle('app')}
            >
              {activeAppTitle}
            </button>
            {openMenu === 'app' && <DropdownPanel items={appItems} close={close} minWidth={210} />}
          </div>

          {/* File / Edit / View / Go / Window / Help */}
          {LEFT_MENUS.map(({ id, label, items }) => (
            <div key={id} className="relative hidden md:block">
              <button
                className={`px-2 py-0.5 rounded cursor-default transition-colors ${openMenu === id ? 'bg-white/20' : 'hover:bg-white/10'}`}
                onClick={() => toggle(id)}
              >
                {label}
              </button>
              {openMenu === id && <DropdownPanel items={items} close={close} />}
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Battery */}
          <div className="relative">
            <button
              className={`cursor-default px-1 py-0.5 rounded transition-colors ${openMenu === 'battery' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => toggle('battery')}
            >
              <Battery size={18} />
            </button>
            {openMenu === 'battery' && (
              <div className="absolute right-0 top-[calc(100%+2px)] w-64 bg-[#e8e8e8]/95 backdrop-blur-2xl border border-black/[0.13] shadow-2xl rounded-xl p-4 z-[10001]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[13px] font-semibold text-[#1c1c1e]">Battery</span>
                  <span className="text-[13px] font-bold text-[#1c1c1e]">87%</span>
                </div>
                <div className="w-full bg-black/10 rounded-full h-1.5 mb-3 overflow-hidden">
                  <div className="bg-[#30d158] h-full rounded-full transition-all" style={{ width: '87%' }} />
                </div>
                <div className="flex flex-col gap-1.5 text-[12px]">
                  {[
                    ['Status',       'Charging ⚡'],
                    ['Power Source', 'Power Adapter'],
                    ['Time to Full', 'About 45 min'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-[#666]">{k}</span>
                      <span className="text-[#1c1c1e] font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wi-Fi */}
          <div className="relative">
            <button
              className={`cursor-default px-1 py-0.5 rounded transition-colors ${openMenu === 'wifi' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => toggle('wifi')}
            >
              <Wifi size={16} />
            </button>
            {openMenu === 'wifi' && (
              <div className="absolute right-0 top-[calc(100%+2px)] w-60 bg-[#e8e8e8]/95 backdrop-blur-2xl border border-black/[0.13] shadow-2xl rounded-xl p-4 z-[10001]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-[#1c1c1e]">Wi-Fi</span>
                  <span className="text-[11px] font-semibold text-[#30d158]">Connected</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-[#007aff]/10 border border-[#007aff]/20 rounded-lg mb-3">
                  <Wifi size={16} className="text-[#007aff] shrink-0" />
                  <div>
                    <p className="text-[12.5px] font-semibold text-[#1c1c1e]">Ting's Network</p>
                    <p className="text-[11px] text-[#888]">Secured · Excellent Signal</p>
                  </div>
                </div>
                <button
                  className="w-full text-[12px] text-[#007aff] text-center py-1 hover:bg-black/5 rounded transition-colors cursor-default"
                  onClick={close}
                >
                  Network Preferences…
                </button>
              </div>
            )}
          </div>

          {/* Spotlight */}
          <button
            className="cursor-default px-1 py-0.5 rounded hover:bg-white/10 transition-colors"
            onClick={() => { setSpotlight(true); close() }}
          >
            <Search size={16} />
          </button>

          {/* Clock */}
          <div className="flex gap-1.5 cursor-default hover:bg-white/10 px-2 py-0.5 rounded transition-colors select-none">
            <span>{fmtDate(time)}</span>
            <span>{fmt(time)}</span>
          </div>
        </div>
      </div>

      {/* ── Spotlight overlay ── */}
      {spotlight && (
        <div
          className="fixed inset-0 z-[10002] flex flex-col items-center pt-[16vh] bg-black/35 backdrop-blur-[2px]"
          onClick={() => setSpotlight(false)}
        >
          <div
            className="w-[560px] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] border border-white/15"
            style={{ background: 'rgba(30,30,30,0.88)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.08]">
              <Search size={20} className="text-white/40 shrink-0" />
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Spotlight Search"
                className="flex-1 bg-transparent text-white text-[20px] outline-none placeholder:text-white/30 font-light"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-white/35 hover:text-white/60 transition-colors">
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Results */}
            {query && searchResults.length > 0 && (
              <div className="py-2">
                <p className="text-[10.5px] font-semibold text-white/35 uppercase tracking-widest px-5 py-1.5">Applications</p>
                {searchResults.map(app => (
                  <button
                    key={app.id}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.08] transition-colors"
                    onClick={() => { onOpenApp?.(app.id); setSpotlight(false) }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center text-xl shrink-0">
                      {APP_EMOJIS[app.id]}
                    </div>
                    <span className="text-white text-[15px]">{app.label}</span>
                  </button>
                ))}
              </div>
            )}

            {query && searchResults.length === 0 && (
              <div className="px-5 py-10 text-center text-white/35 text-[14px]">
                No results for "{query}"
              </div>
            )}

            {/* Default: quick-access grid */}
            {!query && (
              <div className="p-4">
                <p className="text-[10.5px] font-semibold text-white/35 uppercase tracking-widest mb-3">Quick Access</p>
                <div className="grid grid-cols-5 gap-2">
                  {ALL_APPS.map(app => (
                    <button
                      key={app.id}
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-white/[0.08] transition-colors"
                      onClick={() => { onOpenApp?.(app.id); setSpotlight(false) }}
                    >
                      <div className="w-11 h-11 rounded-xl bg-white/[0.08] flex items-center justify-center text-2xl">
                        {APP_EMOJIS[app.id]}
                      </div>
                      <span className="text-white/60 text-[10px] text-center leading-tight">{app.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
