import { useState, useEffect, useRef } from 'react'
import { Wifi, Battery, Search, X } from 'lucide-react'
import type { AppId } from '../App'
import { AppleLogo } from '../icons'
import { ALL_APPS, APP_EMOJIS, createMenuBarMenus } from './menuBarConfig'
import type { MenuItemDef } from './menuBarConfig'

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

// ── Props ────────────────────────────────────────────────────────────────────
interface MenuBarProps {
  activeAppTitle: string
  activeAppId?: AppId
  openApps?: { id: AppId; title: string }[]
  autoHidden?: boolean
  revealed?: boolean
  onRevealChange?: (revealed: boolean) => void
  onOpenApp?: (id: AppId) => void
  onMinimizeActive?: () => void
  onCloseActive?: () => void
}

export default function MenuBar({
  activeAppTitle,
  activeAppId,
  openApps = [],
  autoHidden = false,
  revealed = true,
  onRevealChange,
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

  const { appleItems, appItems, leftMenus } = createMenuBarMenus({
    activeAppTitle,
    activeAppId,
    openApps,
    onOpenApp,
    onMinimizeActive,
    onCloseActive,
  })

  const searchResults = query.trim()
    ? ALL_APPS.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <>
      {/* ── Menu bar ── */}
      <div
        ref={menuBarRef}
        className={`fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-3 text-sm font-medium z-[10000] text-white/90 transition-[transform,opacity] duration-200 ${autoHidden && !revealed ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
        onMouseEnter={() => autoHidden && onRevealChange?.(true)}
        onMouseLeave={() => autoHidden && onRevealChange?.(false)}
      >
        {/* Left */}
        <div className="flex items-center gap-0.5">
          {/* Apple */}
          <div className="relative">
            <button
              className={`cursor-default px-2 py-0.5 rounded transition-colors ${openMenu === 'apple' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => toggle('apple')}
            >
              <AppleLogo size={15} color="white" />
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
          {leftMenus.map(({ id, label, items }) => (
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
                    ['Status', 'Charging ⚡'],
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
