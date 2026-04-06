import { MapPin, Mail, Phone } from 'lucide-react'

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

interface ContactRowProps {
  icon: React.ReactNode
  text: string
  link?: string
}

function ContactRow({ icon, text, link }: ContactRowProps) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0 text-white/70">{icon}</span>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11.5px] text-[#5ac8fa] leading-[1.4] break-all"
        >
          {text}
        </a>
      ) : (
        <span className="text-[11.5px] text-white/75 leading-[1.4] break-all">{text}</span>
      )}
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-7">
      <h2 className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#007aff] mb-2.5 pb-1.5 border-b-[1.5px] border-[#e8e8e8]">
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function AboutApp() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-[230px] shrink-0 p-7 flex flex-col items-center overflow-y-auto"
        style={{ background: 'linear-gradient(160deg, #1e3a5f 0%, #0f2340 100%)' }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-[26px] font-bold text-white mb-3.5"
          style={{
            background: 'linear-gradient(135deg, #5ac8fa, #007aff)',
            boxShadow: '0 4px 16px rgba(0,122,255,0.4)',
          }}
        >
          TT
        </div>
        <h1 className="text-[18px] font-bold text-white text-center mb-1.5">Ting Tang</h1>
        <p className="text-[11.5px] text-white/65 text-center leading-[1.5]">
          Full Stack Developer<br />React / .NET
        </p>

        <div className="w-full h-px bg-white/12 my-4" />

        <div className="w-full flex flex-col gap-2.5">
          <ContactRow icon={<MapPin size={13} />} text="Hamilton, New Zealand" />
          <ContactRow icon={<Mail size={13} />} text="tangtingtt12@gmail.com" link="mailto:tangtingtt12@gmail.com" />
          <ContactRow icon={<Phone size={13} />} text="+64 20 477 6871" link="tel:+6420477 6871" />
          <ContactRow icon={<GithubIcon />} text="github.com/ttang1024" link="https://github.com/ttang1024" />
          <ContactRow icon={<LinkedinIcon />} text="linkedin.com/in/ting-tang" link="https://www.linkedin.com/in/ting-tang-24b0b4355/" />
        </div>

        <div className="w-full h-px bg-white/12 my-4" />

        <div className="bg-[#30d158]/20 border border-[#30d158]/40 rounded-full px-3 py-1 text-[11.5px] text-[#30d158] font-semibold mb-1.5">
          Open to Work 🟢
        </div>
        <p className="text-[10.5px] text-white/45 text-center leading-[1.5]">
          NZ Student Visa<br />Post-study OWV Nov 2026
        </p>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto p-7 bg-[#fafafa]">
        <Section title="Summary">
          <p className="text-[13px] text-[#3a3a3a] leading-[1.7]">
            Full Stack Developer with <strong>8 years of experience</strong> (6 years front-end,
            2 years full-stack) across AI and healthcare domains. Specialized in{' '}
            <strong>React, Next.js, and .NET</strong> ecosystems, with strong experience
            building 0→1 products and scaling systems to 30K+ users. Skilled in
            end-to-end development including architecture design, cloud deployment,
            and AI integration.
          </p>
        </Section>

        <Section title="Core Highlights">
          <ul className="list-none p-0 flex flex-col gap-2">
            {[
              'Built and scaled AI platform to 30K+ users within 3 months.',
              'Reduced system load time by 40% and API calls by 65%.',
              'Expert in React, Next.js, TypeScript, and .NET (Clean Architecture, CQRS, MediatR).',
              'Hands-on experience with LLMs, streaming (SSE), real-time systems.',
              'Proven track record in healthcare systems and large-scale platforms (Alibaba ecosystem).',
            ].map((h, i) => (
              <li key={i} className="text-[13px] text-[#3a3a3a] leading-[1.6] flex gap-2">
                <span className="text-[#007aff] shrink-0 mt-0.5">▸</span>
                {h}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  )
}
