import { Mail, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { contactCardData, contactHeaderRows, contactMailData, profileData } from '../../data'
import { GithubIcon, LinkedinIcon } from '../../icons'

type ContactInfo = (typeof contactCardData)[number]

type IconComponent = LucideIcon | React.FC<{ size?: number; color?: string; strokeWidth?: number }>

const contactIconMap: Record<ContactInfo['icon'], IconComponent> = {
  email: Mail,
  phone: Phone,
  github: GithubIcon,
  linkedin: LinkedinIcon,
}

function ContactCard({ icon, label, value, href, color, bg, iconColor }: ContactInfo) {
  const Icon = contactIconMap[icon]
  const inner = (
    <div
      className="rounded-xl px-3.5 py-3 flex items-center gap-3 border border-black/[0.06] transition-transform hover:scale-[1.02]"
      style={{ background: bg }}
    >
      <span className="shrink-0">
        <Icon size={20} color={iconColor} strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.05em] mb-0.5" style={{ color }}>
          {label}
        </p>
        <p className="text-[12.5px] font-medium truncate" style={{ color: href ? color : '#555' }}>
          {value}
        </p>
      </div>
    </div>
  )

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
      {inner}
    </a>
  ) : inner
}

export default function ContactApp() {
  return (
    <div className="h-full overflow-y-auto bg-[#fafafa] flex flex-col">
      {/* Mail-style header */}
      <div className="bg-white border-b border-[#e0e0e0] px-5 py-3.5 flex flex-col gap-1.5 shrink-0">
        {contactHeaderRows.map(row => (
          <div key={row.label} className="flex gap-2 items-baseline">
            <span className="text-xs text-[#888] font-semibold w-14 shrink-0">{row.label}</span>
            <span className="text-[13px] text-[#555]">{row.value}</span>
          </div>
        ))}
        <div className="flex gap-2 items-baseline">
          <span className="text-xs text-[#888] font-semibold w-14 shrink-0">Subject:</span>
          <span className="text-[13px] font-semibold text-[#1d1d1f]">
            {contactMailData.subject}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <p className="text-[14px] text-[#1d1d1f] font-medium mb-3">{contactMailData.greeting}</p>
        <p className="text-[13.5px] text-[#3a3a3a] leading-[1.7] mb-3.5">
          {contactMailData.intro}
        </p>
        <p className="text-[13.5px] text-[#3a3a3a] leading-[1.7] mb-3.5">
          {contactMailData.body}
        </p>

        <div className="grid grid-cols-2 gap-2.5 my-5">
          {contactCardData.map(c => (
            <ContactCard key={c.label} {...c} />
          ))}
        </div>

        <p className="text-[13.5px] text-[#3a3a3a] leading-[1.8] pt-4 border-t border-[#e8e8e8]">
          Best regards,<br />
          <strong>{profileData.name}</strong><br />
          <span className="text-[#888] text-xs">{contactMailData.signatureTitle}</span>
        </p>
      </div>
    </div>
  )
}
