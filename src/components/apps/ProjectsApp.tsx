interface Highlight {
  icon: string
  title: string
  desc: string
}

interface TechItem {
  name: string
  color: string
  bg: string
}

interface Project {
  name: string
  tagline: string
  url: string
  description: string
  highlights: Highlight[]
  tech: TechItem[]
}

const PROJECT: Project = {
  name: 'AI Study Platform',
  tagline: 'Full-stack AI-powered learning platform',
  url: 'github.com/ttang1024',
  description:
    'A comprehensive AI-powered learning platform that transforms any content — PDFs, Word documents, YouTube videos, web articles, and audio — into structured study materials.',
  highlights: [
    {
      icon: '🤖',
      title: 'AI Content Processing',
      desc: 'Integrated LLM APIs (OpenAI) with real-time Server-Sent Events (SSE) streaming to generate summaries, mind maps, flashcards, quizzes, and glossary terms.',
    },
    {
      icon: '🏗️',
      title: 'Clean Architecture',
      desc: 'Scalable .NET 10 backend using Clean Architecture (Domain / Application / Infrastructure / API), CQRS with MediatR, Repository pattern, and EF Core.',
    },
    {
      icon: '☁️',
      title: 'Cloud Infrastructure',
      desc: 'Deployed on cloud with scalable content processing pipelines and real-time response capabilities supporting concurrent users.',
    },
    {
      icon: '⚡',
      title: 'Real-time Streaming',
      desc: 'SSE-based streaming for instant AI responses, delivering live generation of study materials without page reloads.',
    },
  ],
  tech: [
    { name: 'React.js',    color: '#61dafb', bg: '#e8f8ff' },
    { name: 'Next.js',     color: '#000',    bg: '#f0f0f0' },
    { name: 'TypeScript',  color: '#3178c6', bg: '#dbeafe' },
    { name: '.NET 10',     color: '#512bd4', bg: '#ede9fe' },
    { name: 'MediatR',     color: '#5b21b6', bg: '#f5f3ff' },
    { name: 'EF Core',     color: '#7c3aed', bg: '#f5f3ff' },
    { name: 'PostgreSQL',  color: '#336791', bg: '#dbeafe' },
    { name: 'SSE',         color: '#15803d', bg: '#dcfce7' },
    { name: 'OpenAI API',  color: '#10a37f', bg: '#d1fae5' },
  ],
}

export default function ProjectsApp() {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Fake browser bar */}
      <div className="h-[38px] bg-[#f0f0f0] border-b border-[#ddd] flex items-center px-3 gap-2 shrink-0">
        <div className="flex gap-1.5 w-[60px]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ccc] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ccc] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ccc] inline-block" />
        </div>
        <div className="flex-1 bg-white rounded-md px-2.5 py-0.5 flex items-center gap-1.5 border border-[#ddd] h-[26px]">
          <span className="text-[11px]">🔒</span>
          <span className="text-xs text-[#555] font-mono">{PROJECT.url}</span>
        </div>
        <div className="w-[60px]" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-7 py-6 bg-[#fafafa]">
        {/* Hero */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-[14px] flex items-center justify-center text-[28px] shrink-0"
            style={{ background: 'linear-gradient(145deg, #30d158, #34c759)' }}
          >
            🚀
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-[#1d1d1f]">{PROJECT.name}</h1>
            <p className="text-[13px] text-[#888] mt-0.5">{PROJECT.tagline}</p>
          </div>
        </div>

        <p className="text-[13.5px] text-[#3a3a3a] leading-[1.7] mb-5">{PROJECT.description}</p>

        <h2 className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#007aff] mb-3 pb-1.5 border-b-[1.5px] border-[#e8e8e8]">
          Key Features
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {PROJECT.highlights.map((h, i) => (
            <div
              key={i}
              className="bg-white border border-[#ebebeb] rounded-xl p-3.5 flex gap-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            >
              <span className="text-[22px] shrink-0 leading-[1.2]">{h.icon}</span>
              <div>
                <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-1">{h.title}</h3>
                <p className="text-[11.5px] text-[#666] leading-[1.55]">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#007aff] mb-3 pb-1.5 border-b-[1.5px] border-[#e8e8e8]">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {PROJECT.tech.map(t => (
            <span
              key={t.name}
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ color: t.color, background: t.bg }}
            >
              {t.name}
            </span>
          ))}
        </div>

        <a
          href="https://github.com/ttang1024"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#007aff] text-white px-5 py-2 rounded-lg text-[13px] font-semibold no-underline hover:opacity-90 transition-opacity"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  )
}
