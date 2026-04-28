import { MapPin, Mail, Phone } from 'lucide-react'
import { aboutHighlights, profileData, sidebarContactData } from '../../data'
import { GithubIcon, LinkedinIcon } from '../../icons'

interface ContactRowProps {
  icon: React.ReactNode
  text: string
  link?: string
}

function ContactRow({ icon, text, link }: ContactRowProps) {
  const contentClass = "min-w-0 text-[11.5px] leading-[1.35] break-words"

  return (
    <div className="flex min-w-0 items-start gap-2.5 rounded-2xl bg-white/[0.08] px-3 py-2 ring-1 ring-white/[0.08]">
      <span className="mt-0.5 shrink-0 text-white/72">{icon}</span>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${contentClass} text-white transition-colors hover:text-white/80`}
        >
          {text}
        </a>
      ) : (
        <span className={`${contentClass} text-white`}>{text}</span>
      )}
    </div>
  )
}

const sidebarIconMap = {
  location: <MapPin size={13} />,
  email: <Mail size={13} />,
  phone: <Phone size={13} />,
  github: <GithubIcon size={13} />,
  linkedin: <LinkedinIcon size={13} />,
}

interface SectionProps {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-7">
      <h2 className="mb-2.5 border-b-[1.5px] border-[#e5e5ea] pb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#059669]">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function AboutApp() {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#f5f5f7] sm:flex-row sm:overflow-hidden">
      {/* Sidebar */}
      <div
        className="relative w-full shrink-0 p-5 flex flex-col items-center overflow-hidden sm:w-[246px] sm:p-6 sm:overflow-y-auto"
        style={{ background: 'linear-gradient(165deg, #1d3557 0%, #0b1f3a 55%, #071426 100%)' }}
      >
        <div className="pointer-events-none absolute h-32 w-32 rounded-full bg-[#64d2ff]/20 blur-3xl" />
        <h1 className="text-center text-[20px] font-semibold leading-tight text-white">{profileData.name}</h1>
        <p className="mt-1.5 text-center text-[12px] font-medium leading-[1.45] text-white/64">
          {profileData.title}<br />{profileData.focus}
        </p>

        <div className="my-4 h-px w-full bg-white/12" />

        <div className="w-full flex flex-col gap-2">
          {sidebarContactData.map(contact => (
            <ContactRow
              key={contact.text}
              icon={sidebarIconMap[contact.icon]}
              text={contact.text}
              link={contact.link}
            />
          ))}
        </div>

        <div className="my-4 h-px w-full bg-white/12" />

        <div className="mb-2 rounded-full border border-[#30d158]/35 bg-[#30d158]/14 px-3 py-1 text-[11.5px] font-semibold text-[#32d74b]">
          {profileData.status}
        </div>
        <p className="text-center text-[10.5px] font-medium leading-[1.5] text-white/46">
          {profileData.sidebarFocus.map(line => (
            <span key={line}>
              {line}<br />
            </span>
          ))}
        </p>
      </div>

      {/* Main */}
      <div className="min-w-0 flex-1 bg-[#fafafa] p-6 sm:overflow-y-auto sm:p-7">
        <Section title="Summary">
          <p className="text-[13px] leading-[1.7] text-[#3a3a3a]">
            {profileData.summary}
          </p>
        </Section>

        <Section title="Core Highlights">
          <ul className="list-none p-0 flex flex-col gap-2">
            {aboutHighlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-[1.6] text-[#3a3a3a]">
                <span className="mt-0.5 shrink-0 text-[#059669]">▸</span>
                {h}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  )
}
