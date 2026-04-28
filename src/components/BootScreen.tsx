import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AppleLogo } from '../icons'

interface Props {
  onDone: () => void
}

export default function BootScreen({ onDone }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Start fade-out after logo + progress bar animation completes
    const t = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {/* Apple logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          >
            <AppleLogo size={80} color="white" />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mt-14 w-44 h-[3px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.2 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'rgba(255,255,255,0.75)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.15, 0, 0.55, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
