import { useState, useEffect, useCallback } from 'react'

interface Highlight {
  icon: string
  title: string
  desc: string
}

interface Job {
  company: string
  location: string
  period: string
  bullets: string[]
  tech: string[]
  color: string
  logo?: string        // image path — omit for personal projects
  emoji?: string       // fallback icon for personal projects
  screenshots: string[]
  highlights?: Highlight[]
  githubUrl?: string
}

const JOBS: Job[] = [
  {
    company: 'AI Study Platform',
    location: 'Personal Project',
    period: 'Present',
    bullets: [
      'Transforms PDFs, Word docs, YouTube videos, web articles, and audio into structured study materials.',
      'Integrated OpenAI APIs with real-time SSE streaming for instant generation of summaries, mind maps, flashcards, and quizzes.',
      'Scalable .NET 10 backend using Clean Architecture, CQRS with MediatR, Repository pattern, and EF Core.',
    ],
    tech: ['React.js', 'Next.js', 'TypeScript', '.NET 10', 'MediatR', 'EF Core', 'PostgreSQL', 'SSE', 'OpenAI API'],
    color: '#a855f7',
    emoji: '🚀',
    screenshots: [],
    highlights: [
      { icon: '🤖', title: 'AI Content Processing', desc: 'LLM APIs with SSE streaming to generate summaries, mind maps, flashcards, quizzes, and glossary terms.' },
      { icon: '🏗️', title: 'Clean Architecture', desc: '.NET 10 backend with CQRS, MediatR, Repository pattern, and EF Core.' },
      { icon: '☁️', title: 'Cloud Infrastructure', desc: 'Scalable content processing pipelines supporting concurrent users.' },
      { icon: '⚡', title: 'Real-time Streaming', desc: 'SSE-based streaming for instant AI responses without page reloads.' },
    ],
    githubUrl: 'https://github.com/ttang1024',
  },
  {
    company: 'Weitu AI HK Limited',
    location: 'Hong Kong, China',
    period: 'May 2024 – Oct 2024',
    bullets: [
      'Led frontend architecture from 0→1 using React and modern web technologies.',
      'Built and launched AI-powered Chrome Extension (video summarization, chat, mind maps).',
      'Implemented real-time streaming (SSE) to significantly improve AI response experience.',
      'Contributed to rapid user growth, reaching 30K+ users within 3 months.',
      'Improved product visibility through SEO-driven frontend optimization.',
    ],
    tech: ['React.js', 'TypeScript', 'Chrome Extension APIs', 'SSE', 'AI APIs', 'MySQL'],
    color: '#22c55e',
    logo: '/images/experience/weitu_logo.png',
    screenshots: [
      '/images/experience/weitu1.png',
      '/images/experience/weitu2.png',
      '/images/experience/weitu3.png',
      '/images/experience/weitu4.png',
    ],
  },
  {
    company: 'Shanghai Shantai Health Technology',
    location: 'Shanghai, China',
    period: 'Aug 2022 – Mar 2024',
    bullets: [
      'Designed and developed a low-code platform that significantly accelerated internal product development.',
      'Built digital therapy and electronic health record systems used in clinical workflows.',
      'Developed gyroscope-based scoliosis measurement tool improving clinical usability.',
      'Delivered cross-platform applications reducing code duplication and improving maintainability.',
    ],
    tech: ['React.js', 'Node.js', 'React Native', 'MySQL'],
    color: '#3b82f6',
    logo: '/images/experience/shantai_logo.png',
    screenshots: [
      '/images/experience/shantai1.png',
      '/images/experience/shantai2.png',
      '/images/experience/shantai3.png',
      '/images/experience/shantai4.png',
    ],
  },
  {
    company: 'Ele.me (Alibaba Group)',
    location: 'Shanghai, China',
    period: 'Mar 2021 – Jul 2022',
    bullets: [
      'Developed financial systems (wallet, credit card features) supporting large-scale users.',
      'Built full-stack features for Local Life platform, enhancing user experience.',
      'Delivered personalised campaign experiences, increasing engagement and conversions.',
    ],
    tech: ['React.js', 'Node.js', 'Serverless', 'MySQL'],
    color: '#3b82f6',
    logo: '/images/experience/ele_logo.png',
    screenshots: [
      '/images/experience/ele1.png',
      '/images/experience/ele2.png',
      '/images/experience/ele3.png',
    ],
  },
  {
    company: 'Ping An Health',
    location: 'Shanghai, China',
    period: 'May 2018 – Mar 2021',
    bullets: [
      'Optimized system performance, reducing thread blocking by 70%, API calls by 65%, load time by 40%.',
      'Built internal observability platform improving debugging efficiency and monitoring capabilities.',
      'Developed core telehealth and prescription systems supporting critical healthcare workflows.',
    ],
    tech: ['React.js', 'WebSocket', 'WebRTC', 'GraphQL', 'Node.js', 'MySQL'],
    color: '#ff6b6b',
    logo: '/images/experience/pingan_logo.png',
    screenshots: [
      '/images/experience/pingan.png',
    ],
  },
]

interface LightboxState {
  srcs: string[]
  idx: number
}

export default function ExperienceApp() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const open = (srcs: string[], idx: number) => setLightbox({ srcs, idx })
  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() => setLightbox(lb => lb && lb.idx > 0 ? { ...lb, idx: lb.idx - 1 } : lb), [])
  const next = useCallback(() => setLightbox(lb => lb && lb.idx < lb.srcs.length - 1 ? { ...lb, idx: lb.idx + 1 } : lb), [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, prev, next, close])

  return (
    <div className="h-full relative overflow-hidden">

      {/* Scrollable content */}
      <div className="h-full overflow-y-auto bg-[#fafafa] px-7 py-6">

        {/* ── Work Experience ── */}
        <div className="flex items-baseline gap-3 mb-7 pb-3.5 border-b-[1.5px] border-[#e8e8e8]">
          <h1 className="text-[22px] font-bold text-[#1d1d1f]">Experience & Projects</h1>
          <span className="text-xs text-[#888] font-medium">8 years total</span>
        </div>

        <div className="flex flex-col">
          {JOBS.map((job, i) => (
            <div key={i} className="flex">
              <div className="flex flex-col items-center w-7 shrink-0 pt-1.5">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: job.color, boxShadow: '0 0 0 3px rgba(255,255,255,0.8), 0 0 0 4px rgba(0,0,0,0.08)' }}
                />
                {i < JOBS.length - 1 && <div className="flex-1 w-0.5 bg-[#e0e0e0] mt-1 min-h-5" />}
              </div>

              <div className="flex-1 bg-white rounded-xl px-4 py-3.5 mb-4 ml-2 border border-[#ebebeb] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">

                {/* Header */}
                <div className="flex justify-between items-start mb-2.5 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-lg overflow-hidden border border-black/[0.06] shrink-0 flex items-center justify-center bg-white text-[20px]"
                      style={job.emoji ? { background: `linear-gradient(145deg, ${job.color}33, ${job.color}66)` } : undefined}
                    >
                      {job.logo
                        ? <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                        : job.emoji}
                    </div>
                    <div>
                      <h2 className="text-[14.5px] font-bold mb-0.5 leading-tight" style={{ color: job.color }}>{job.company}</h2>
                      <p className="text-xs text-[#888]">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    {job.githubUrl && (
                      <a href={job.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-white px-2.5 py-1 rounded-lg hover:opacity-90 transition-opacity"
                        style={{ background: job.color }}>
                        GitHub →
                      </a>
                    )}
                    <span className="text-xs text-[#888] font-medium whitespace-nowrap">{job.period}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="list-none p-0 flex flex-col gap-1.5 mb-3">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="text-[12.5px] text-[#3a3a3a] leading-[1.55] flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: job.color }} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Highlights grid (personal projects) */}
                {job.highlights && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {job.highlights.map((h, k) => (
                      <div key={k} className="bg-[#fafafa] border border-[#ebebeb] rounded-xl p-2.5 flex gap-2">
                        <span className="text-[18px] shrink-0 leading-[1.2]">{h.icon}</span>
                        <div>
                          <h4 className="text-[11.5px] font-semibold text-[#1d1d1f] mb-0.5">{h.title}</h4>
                          <p className="text-[10.5px] text-[#666] leading-[1.5]">{h.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {job.tech.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-xl border font-medium" style={{ borderColor: job.color + '55', color: job.color }}>{t}</span>
                  ))}
                </div>

                {/* Screenshots */}
                {job.screenshots.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-0.5">
                    {job.screenshots.map((src, k) => (
                      <button key={k} onClick={() => open(job.screenshots, k)} className="shrink-0 rounded-lg overflow-hidden border border-[#e0e0e0] hover:border-[#aaa] transition-colors focus:outline-none">
                        <img src={src} alt={`${job.company} screenshot ${k + 1}`} className="h-[80px] w-auto object-cover block hover:opacity-90 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm" onClick={close}>
          <img
            src={lightbox.srcs[lightbox.idx]}
            alt="Screenshot"
            className="max-w-[82%] max-h-[80%] rounded-xl shadow-2xl object-contain select-none"
            onClick={e => e.stopPropagation()}
          />
          <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center text-sm hover:bg-black/60 transition-colors" onClick={close}>✕</button>
          {lightbox.idx > 0 && (
            <button className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors" onClick={e => { e.stopPropagation(); prev() }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="10,3 5,8 10,13" /></svg>
            </button>
          )}
          {lightbox.idx < lightbox.srcs.length - 1 && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors" onClick={e => { e.stopPropagation(); next() }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,3 11,8 6,13" /></svg>
            </button>
          )}
          {lightbox.srcs.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {lightbox.srcs.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setLightbox(lb => lb ? { ...lb, idx: i } : lb) }} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === lightbox.idx ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
