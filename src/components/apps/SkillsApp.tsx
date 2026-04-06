import { useState, useEffect, useRef } from 'react'

type LineType = 'prompt' | 'header' | 'category' | 'skill' | 'success' | 'gap'

interface Line {
  type: LineType
  text?: string
}

const LINES: Line[] = [
  { type: 'prompt', text: 'ting --skills --verbose' },
  { type: 'gap' },
  { type: 'header', text: '╔══════════════════════════════════════╗' },
  { type: 'header', text: '║        TING TANG  ·  SKILLS MAP      ║' },
  { type: 'header', text: '╚══════════════════════════════════════╝' },
  { type: 'gap' },
  { type: 'category', text: '▶  FRONT-END' },
  { type: 'skill', text: '   ✦ HTML · CSS · JavaScript · TypeScript' },
  { type: 'skill', text: '   ✦ React.js · Next.js · React Native · Flutter' },
  { type: 'gap' },
  { type: 'category', text: '▶  BACK-END' },
  { type: 'skill', text: '   ✦ .NET (C#) · Node.js · Python' },
  { type: 'skill', text: '   ✦ REST APIs · GraphQL · WebSocket · SSE' },
  { type: 'gap' },
  { type: 'category', text: '▶  DATABASE' },
  { type: 'skill', text: '   ✦ PostgreSQL · MySQL · MongoDB' },
  { type: 'gap' },
  { type: 'category', text: '▶  CLOUD & DEVOPS' },
  { type: 'skill', text: '   ✦ AWS · Azure · Docker · CI/CD' },
  { type: 'skill', text: '   ✦ GitHub Actions · Azure DevOps · Git' },
  { type: 'gap' },
  { type: 'category', text: '▶  ARCHITECTURE & AI' },
  { type: 'skill', text: '   ✦ Clean Architecture · CQRS · MediatR · EF Core' },
  { type: 'skill', text: '   ✦ LLMs · OpenAI API · Real-time Systems' },
  { type: 'gap' },
  { type: 'success', text: '✓  Skills loaded successfully  [8 years exp]' },
  { type: 'prompt', text: '_' },
]

const LINE_COLORS: Record<LineType, string> = {
  prompt:   '#5ac8fa',
  header:   '#febc2e',
  category: '#30d158',
  skill:    '#e0e0e0',
  success:  '#30d158',
  gap:      '',
}

export default function SkillsApp() {
  const [visible, setVisible] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible >= LINES.length) return
    const delay = LINES[visible]?.type === 'gap' ? 60 : 55
    const id = setTimeout(() => setVisible(v => v + 1), delay)
    return () => clearTimeout(id)
  }, [visible])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visible])

  return (
    <div className="h-full bg-[#1a1a1a] px-6 py-5 overflow-y-auto font-mono">
      <div className="min-h-full">
        {LINES.slice(0, visible).map((line, i) => (
          <div
            key={i}
            className="text-[13px] leading-[1.7] whitespace-pre"
            style={{ color: LINE_COLORS[line.type] || '#e0e0e0' }}
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
