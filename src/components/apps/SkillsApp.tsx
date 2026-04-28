import { useState, useEffect, useRef } from 'react'
import { skillLineColors, skillLines } from '../../data'

export default function SkillsApp() {
  const [visible, setVisible] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible >= skillLines.length) return
    const delay = skillLines[visible]?.type === 'gap' ? 60 : 55
    const id = setTimeout(() => setVisible(v => v + 1), delay)
    return () => clearTimeout(id)
  }, [visible])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visible])

  return (
    <div className="h-full bg-[#1a1a1a] px-6 py-5 overflow-y-auto font-mono">
      <div className="min-h-full">
        {skillLines.slice(0, visible).map((line, i) => (
          <div
            key={i}
            className="text-[13px] leading-[1.7] whitespace-pre"
            style={{ color: skillLineColors[line.type] || '#e0e0e0' }}
          >
            {line.type === 'gap' ? '\u00A0'
              : line.type === 'prompt'
                ? <><span className="text-[#5ac8fa] font-bold">❯ </span>{line.text}</>
                : line.text
            }
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
