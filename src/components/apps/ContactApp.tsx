import { Mail, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type IconComponent = LucideIcon | React.FC<{ size?: number; color?: string; strokeWidth?: number }>

function GithubIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function LinkedinIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

interface ContactInfo {
  Icon: IconComponent
  label: string
  value: string
  href: string | null
  color: string
  bg: string
  iconColor: string
}

const CONTACTS: ContactInfo[] = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'tangtingtt12@gmail.com',
    href: 'mailto:tangtingtt12@gmail.com',
    color: '#007aff',
    bg: '#e8f2ff',
    iconColor: '#007aff',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '+64 20 477 6871',
    href: 'tel:+6420477 6871',
    color: '#30d158',
    bg: '#e6f9ec',
    iconColor: '#30d158',
  },
  {
    Icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/ttang1024',
    href: 'https://github.com/ttang1024',
    color: '#1d1d1f',
    bg: '#f2f2f2',
    iconColor: '#1d1d1f',
  },
  {
    Icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ting-tang',
    href: 'https://www.linkedin.com/in/ting-tang-24b0b4355/',
    color: '#0a66c2',
    bg: '#e8f0fb',
    iconColor: '#0a66c2',
  },
]

function ContactCard({ Icon, label, value, href, color, bg, iconColor }: ContactInfo) {
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
        {[
          { label: 'From:', value: 'Ting Tang <tangtingtt12@gmail.com>' },
          { label: 'To:', value: 'you@company.com' },
        ].map(row => (
          <div key={row.label} className="flex gap-2 items-baseline">
            <span className="text-xs text-[#888] font-semibold w-14 shrink-0">{row.label}</span>
            <span className="text-[13px] text-[#555]">{row.value}</span>
          </div>
        ))}
        <div className="flex gap-2 items-baseline">
          <span className="text-xs text-[#888] font-semibold w-14 shrink-0">Subject:</span>
          <span className="text-[13px] font-semibold text-[#1d1d1f]">
            Let's build something great together 🚀
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <p className="text-[14px] text-[#1d1d1f] font-medium mb-3">Hi there,</p>
        <p className="text-[13.5px] text-[#3a3a3a] leading-[1.7] mb-3.5">
          I'm <strong>Ting Tang</strong>, a Full Stack Developer with 8 years of experience
          building AI-powered products and scalable platforms. I'm currently based in
          Hamilton, New Zealand and open to exciting opportunities.
        </p>
        <p className="text-[13.5px] text-[#3a3a3a] leading-[1.7] mb-3.5">
          Whether you're looking for a developer to lead your front-end, architect a full-stack
          system, or integrate AI into your product — I'd love to chat.
        </p>

        <div className="grid grid-cols-2 gap-2.5 my-5">
          {CONTACTS.map(c => (
            <ContactCard key={c.label} {...c} />
          ))}
        </div>

        <p className="text-[13.5px] text-[#3a3a3a] leading-[1.8] pt-4 border-t border-[#e8e8e8]">
          Best regards,<br />
          <strong>Ting Tang</strong><br />
          <span className="text-[#888] text-xs">Full Stack Developer (React / .NET)</span>
        </p>
      </div>
    </div>
  )
}
