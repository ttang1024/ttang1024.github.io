import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CloseIcon, MinimizeIcon, ExpandIcon, CompressIcon } from '../icons'

interface WindowProps {
  title: string
  icon: string
  children: React.ReactNode
  width: number
  height: number
  defaultPos: { x: number; y: number }
  zIndex: number
  animOrigin?: { x: number; y: number }
  isTablet?: boolean
  zoomTopInset?: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  onZoomChange?: (zoomed: boolean) => void
}

const CONTAINER_TOP = 32
const MIN_W = 320
const MIN_H = 200

type ResizeDir = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'



export default function Window({
  title, children,
  width, height, defaultPos,
  zIndex, animOrigin,
  isTablet = false, zoomTopInset = 0,
  onClose, onMinimize, onFocus, onZoomChange,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(defaultPos ?? { x: 100, y: 80 })
  const sizeRef = useRef({ width, height })
  const isDragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)

  const enterOffset = animOrigin ? {
    x: animOrigin.x - (defaultPos.x + width / 2),
    y: animOrigin.y - (CONTAINER_TOP + defaultPos.y + height / 2),
  } : { x: 0, y: 0 }

  const getLeaveOffset = () => {
    if (!animOrigin || !windowRef.current) return enterOffset
    const r = windowRef.current.getBoundingClientRect()
    return {
      x: animOrigin.x - (r.left + r.width / 2),
      y: animOrigin.y - (r.top + r.height / 2),
    }
  }

  const [leaveOffset, setLeaveOffset] = useState(enterOffset)

  const handleMinimize = () => {
    setLeaveOffset(getLeaveOffset())
    setVisible(false)
    setTimeout(onMinimize, 320)
  }

  const handleZoom = () => {
    onFocus()
    setIsZoomed(z => {
      const next = !z
      onZoomChange?.(next)
      return next
    })
  }

  const handleTitlebarMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    if ((e.target as Element).closest('.traffic-lights')) return
    if (isZoomed || isTablet) return
    e.preventDefault()
    onFocus()
    isDragging.current = true
    dragOffset.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    }

    const onMove = (ev: MouseEvent) => {
      if (!isDragging.current) return
      const x = Math.max(0, ev.clientX - dragOffset.current.x)
      const y = Math.max(28, ev.clientY - dragOffset.current.y)
      posRef.current = { x, y }
      if (windowRef.current) {
        windowRef.current.style.left = x + 'px'
        windowRef.current.style.top = y + 'px'
      }
    }

    const onUp = () => {
      isDragging.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const handleResizeMouseDown = (e: React.MouseEvent, dir: ResizeDir) => {
    if (e.button !== 0 || isZoomed) return
    e.preventDefault()
    e.stopPropagation()
    onFocus()

    const startX = e.clientX
    const startY = e.clientY
    const startLeft = posRef.current.x
    const startTop = posRef.current.y
    const startW = sizeRef.current.width
    const startH = sizeRef.current.height

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY

      let left = startLeft
      let top = startTop
      let w = startW
      let h = startH

      if (dir.includes('e')) w = Math.max(MIN_W, startW + dx)
      if (dir.includes('s')) h = Math.max(MIN_H, startH + dy)
      if (dir.includes('w')) {
        w = Math.max(MIN_W, startW - dx)
        left = startLeft + startW - w
      }
      if (dir.includes('n')) {
        h = Math.max(MIN_H, startH - dy)
        top = startTop + startH - h
      }

      posRef.current = { x: left, y: top }
      sizeRef.current = { width: w, height: h }

      if (windowRef.current) {
        windowRef.current.style.left = left + 'px'
        windowRef.current.style.top = top + 'px'
        windowRef.current.style.width = w + 'px'
        windowRef.current.style.height = h + 'px'
      }
    }

    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const hasOrigin = !!animOrigin

  const layoutStyle: React.CSSProperties = isZoomed
    ? { position: 'fixed', left: 0, top: zoomTopInset, right: 0, bottom: 0, zIndex: 9999 }
    : isTablet
      ? { position: 'absolute', left: '4%', top: '3%', width: '92%', height: '90%', zIndex }
      : { position: 'absolute', left: posRef.current.x, top: posRef.current.y, width: sizeRef.current.width, height: sizeRef.current.height, zIndex }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={windowRef}
          className={`flex flex-col overflow-hidden shadow-2xl ${isZoomed ? 'rounded-none' : 'rounded-xl'}`}
          style={layoutStyle}
          onMouseDown={onFocus}
          layout
          initial={hasOrigin ? { opacity: 0, scale: 0.08, x: enterOffset.x, y: enterOffset.y } : false}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            scale: 0.08,
            x: leaveOffset.x,
            y: leaveOffset.y,
            transition: {
              duration: 0.26,
              ease: [0.4, 0, 1, 1],
              opacity: { duration: 0.18, ease: 'easeIn' },
            },
          }}
          transition={{
            layout: { type: 'spring', stiffness: 340, damping: 30 },
            type: 'spring',
            stiffness: 320,
            damping: 28,
            mass: 0.8,
            opacity: { type: 'tween', duration: 0.22, ease: 'easeOut' },
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center h-9 px-3 gap-2 select-none cursor-default shrink-0 backdrop-blur-xl bg-white/80 border-b border-black/10"
            onMouseDown={handleTitlebarMouseDown}
          >
            <div className="traffic-lights group flex items-center gap-1.5">
              <button
                className="relative w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10 flex items-center justify-center text-[#7e0b09]"
                onMouseDown={e => e.stopPropagation()}
                onClick={onClose}
                title="Close"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100"><CloseIcon /></span>
              </button>
              <button
                className="relative w-3 h-3 rounded-full bg-[#febc2e] border border-black/10 flex items-center justify-center text-[#7d5000]"
                onMouseDown={e => e.stopPropagation()}
                onClick={handleMinimize}
                title="Minimize"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100"><MinimizeIcon /></span>
              </button>
              <button
                className="relative w-3 h-3 rounded-full bg-[#28c840] border border-black/10 flex items-center justify-center text-[#0a5119]"
                onMouseDown={e => e.stopPropagation()}
                onClick={handleZoom}
                title={isZoomed ? 'Restore' : 'Zoom'}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                  {isZoomed ? <CompressIcon /> : <ExpandIcon />}
                </span>
              </button>
            </div>
            <span className="flex-1 text-center text-[13px] font-semibold text-[#1d1d1f] -ml-12 pointer-events-none">
              {title}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>

          {/* Resize handles — only when not zoomed and not tablet */}
          {!isZoomed && !isTablet && <>
            {/* Edges */}
            <div className="absolute top-0 left-3 right-3 h-1 cursor-n-resize z-50" onMouseDown={e => handleResizeMouseDown(e, 'n')} />
            <div className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize z-50" onMouseDown={e => handleResizeMouseDown(e, 's')} />
            <div className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize z-50" onMouseDown={e => handleResizeMouseDown(e, 'w')} />
            <div className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize z-50" onMouseDown={e => handleResizeMouseDown(e, 'e')} />
            {/* Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-50" onMouseDown={e => handleResizeMouseDown(e, 'nw')} />
            <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-50" onMouseDown={e => handleResizeMouseDown(e, 'ne')} />
            <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-50" onMouseDown={e => handleResizeMouseDown(e, 'sw')} />
            <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50" onMouseDown={e => handleResizeMouseDown(e, 'se')} />
          </>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
