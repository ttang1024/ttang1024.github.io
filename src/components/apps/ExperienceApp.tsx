import { useState, useEffect, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import { experienceStats, JOBS } from '../../data'
import { formatProjectUrl } from '../../util'

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

  const featuredJobs = JOBS.slice(0, 2)
  const careerJobs = JOBS.slice(2)

  return (
    <div className="h-full relative overflow-hidden bg-[#f5f5f7]">

      {/* Scrollable content */}
      <div className="h-full overflow-y-auto">
        <div className="px-5 py-5 sm:px-7 sm:py-6">
          <div className="mb-5 rounded-[18px] border border-white/70 bg-white/70 px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Portfolio</p>
                <h1 className="text-[25px] font-semibold leading-tight text-[#1d1d1f] sm:text-[30px]">Experience & Projects</h1>
                <p className="mt-1.5 max-w-[540px] text-[13px] leading-[1.55] text-[#6e6e73]">
                  Frontend-focused full-stack developer with React, TypeScript, .NET, and API integration experience across AI, healthcare, finance, and consumer platforms.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:w-[270px]">
                {experienceStats.map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-black/[0.06] bg-[#fbfbfd] px-3 py-2 text-center">
                    <div className="text-[18px] font-semibold text-[#1d1d1f]">{value}</div>
                    <div className="text-[10px] font-medium text-[#86868b]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Featured Builds</h2>
            </div>
            <div className="grid gap-4">
              {featuredJobs.map(job => {
                return (
                  <article key={job.company} className="overflow-hidden rounded-[20px] border border-white/70 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
                    <div className="p-4 sm:p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                            {job.logo
                              ? <img src={job.logo} alt={job.company} className="h-full w-full object-contain" />
                              : <span className="text-[22px]">{job.emoji}</span>}
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-[18px] font-semibold leading-tight text-[#1d1d1f]">{job.company}</h3>
                            {job.title && <p className="mt-0.5 text-[12px] font-semibold text-[#424245]">{job.title}</p>}
                            <p className="text-[12px] font-medium text-[#86868b]">{job.period}</p>
                          </div>
                        </div>
                        <div className="flex shrink-0 gap-1.5">
                          {job.githubUrl && (
                            <a href={job.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-[#1d1d1f] px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#3a3a3c]">
                              GitHub
                              <ArrowRight size={12} strokeWidth={2.2} />
                            </a>
                          )}
                          {job.projectUrl && (
                            <a href={job.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#059669] transition-colors hover:text-[#005bb5] hover:underline">
                              Open
                              <ArrowRight size={12} strokeWidth={2.2} />
                            </a>
                          )}
                        </div>
                      </div>

                      {job.screenshots.length > 0 && (
                        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
                          {job.screenshots.map((src, k) => (
                            <button key={src} onClick={() => open(job.screenshots, k)} className="shrink-0 overflow-hidden rounded-xl border border-black/[0.08] bg-[#f5f5f7] transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[#059669]/30">
                              <img src={src} alt={`${job.company} screenshot ${k + 1}`} className="block h-[92px] w-auto object-cover" />
                            </button>
                          ))}
                        </div>
                      )}

                      <ul className="mb-4 flex flex-col gap-2">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex gap-2 text-[12.5px] leading-[1.55] text-[#424245]">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#059669]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {job.highlights && (
                        <div className="mb-4 grid grid-cols-2 gap-2">
                          {job.highlights.map(h => (
                            <div key={h.title} className="rounded-2xl bg-[#f5f5f7] p-3">
                              <div className="mb-1 flex items-center gap-1.5">
                                <span className="text-[16px] leading-none">{h.icon}</span>
                                <h4 className="truncate text-[11.5px] font-semibold text-[#1d1d1f]">{h.title}</h4>
                              </div>
                              <p className="text-[10.5px] leading-[1.45] text-[#6e6e73]">{h.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {job.tech.map(t => (
                          <span key={t} className="rounded-full border border-black/[0.06] bg-[#f5f5f7] px-2.5 py-1 text-[11px] font-medium text-[#424245]">{t}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">Career Timeline</h2>
            <div className="grid gap-4">
              {careerJobs.map(job => (
                <article key={job.company}>
                  <div className="rounded-[20px] border border-white/70 bg-white px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.07)] sm:px-5">
                    <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-black/[0.06] bg-white">
                          {job.logo
                            ? <img src={job.logo} alt={job.company} className="h-full w-full object-contain" />
                            : <span className="text-[21px]">{job.emoji}</span>}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[14.5px] font-semibold leading-tight text-[#1d1d1f]">{job.company}</h3>
                          {job.title && <p className="mt-1 text-[12px] font-semibold leading-tight text-[#424245]">{job.title}</p>}
                          <p className="mt-1 text-[11.5px] font-medium text-[#86868b]">{job.location}</p>
                          <p className="mt-0.5 text-[11.5px] font-medium text-[#86868b]">{job.period}</p>
                          {job.githubUrl && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {job.githubUrl && (
                                <a href={job.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-[#1d1d1f] px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#3a3a3c]">
                                  GitHub
                                  <ArrowRight size={12} strokeWidth={2.2} />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <ul className="mb-3 flex flex-col gap-1.5">
                          {job.bullets.map((b, j) => (
                            <li key={j} className="flex gap-2 text-[12.5px] leading-[1.55] text-[#424245]">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8e8e93]" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {job.tech.map(t => (
                            <span key={t} className="rounded-full bg-[#f5f5f7] px-2.5 py-1 text-[11px] font-medium text-[#424245]">{t}</span>
                          ))}
                        </div>

                        {job.screenshots.length > 0 && (
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {job.screenshots.map((src, k) => (
                              <button key={src} onClick={() => open(job.screenshots, k)} className="shrink-0 overflow-hidden rounded-xl border border-black/[0.08] bg-[#f5f5f7] transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[#059669]/30">
                                <img src={src} alt={`${job.company} screenshot ${k + 1}`} className="block h-[78px] w-auto object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                        {job.projectUrl && (
                          <a href={job.projectUrl} target="_blank" rel="noopener noreferrer" title={job.projectUrl} className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-lg bg-[#f5f5f7] px-2.5 py-1.5 text-[11.5px] font-medium text-[#059669] transition-colors hover:bg-[#e8f2ff] hover:text-[#005bb5]">
                            <span className="shrink-0 text-[#6e6e73]">Link:</span>
                            <span className="min-w-0 truncate">{formatProjectUrl(job.projectUrl)}</span>
                            <ArrowRight size={12} strokeWidth={2.2} className="shrink-0" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
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
