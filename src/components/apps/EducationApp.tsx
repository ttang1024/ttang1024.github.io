interface EduCardProps {
  degree: string
  school: string
  location: string
  period: string
  status: string
  statusColor: string
  logoSrc: string
  iconBg: string
  details: string[]
}

function EduCard({ degree, school, location, period, status, statusColor, logoSrc, iconBg, details }: EduCardProps) {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-5 mb-4 flex gap-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
      <div className="shrink-0">
        <div
          className="w-[52px] h-[52px] rounded-xl flex items-center justify-center overflow-hidden p-1.5"
          style={{ background: iconBg }}
        >
          <img src={logoSrc} alt={school} className="w-full h-full object-contain" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
          <div>
            <h2 className="text-[16px] font-bold text-[#1d1d1f] mb-0.5">{degree}</h2>
            <p className="text-[13px] text-[#444] font-medium mb-0.5">{school}</p>
            <p className="text-xs text-[#888]">{location}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-xl border"
              style={{
                background: statusColor + '1a',
                color: statusColor,
                borderColor: statusColor + '44',
              }}
            >
              {status}
            </span>
            <span className="text-xs text-[#888] font-medium">{period}</span>
          </div>
        </div>
        <ul className="list-none p-0 flex flex-col gap-1.5">
          {details.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-[12.5px] text-[#555] leading-[1.55]">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                style={{ background: statusColor }}
              />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function EducationApp() {
  return (
    <div className="h-full overflow-y-auto px-7 py-6 bg-[#fafafa]">
      <h1 className="text-[22px] font-bold text-[#1d1d1f] mb-6 pb-3.5 border-b-[1.5px] border-[#e8e8e8]">
        Education
      </h1>

      <EduCard
        degree="Master of Information Technology"
        school="University of Waikato"
        location="Hamilton, New Zealand"
        period="Expected Nov 2026"
        status="In Progress"
        statusColor="#007aff"
        logoSrc="/images/education/waikato.svg"
        iconBg="linear-gradient(145deg, #e8f4ff, #cce4ff)"
        details={[
          'Currently pursuing advanced studies in Information Technology.',
          'Expected to graduate November 2026.',
          'Eligible for 3-year Post-study Open Work Visa upon graduation.',
        ]}
      />

      <EduCard
        degree="Bachelor of Statistics"
        school="Anhui University of Finance and Economics"
        location="Anhui, China"
        period="2013"
        status="Completed"
        statusColor="#30d158"
        logoSrc="/images/education/aufe.jpeg"
        iconBg="linear-gradient(145deg, #fff0f0, #ffe0e0)"
        details={[
          'Strong foundation in statistical analysis and mathematical reasoning.',
          'Analytical skills directly applied to performance optimization and data-driven development.',
        ]}
      />

      <div
        className="rounded-xl p-[18px_20px] mt-1 border border-[#bdd7f5]"
        style={{ background: 'linear-gradient(135deg, #e8f4ff, #f0f8ff)' }}
      >
        <div className="flex gap-3.5 items-start">
          <span className="text-[28px] shrink-0">🌏</span>
          <div>
            <h3 className="text-[14px] font-bold text-[#1d4ed8] mb-1.5">
              Work Rights — New Zealand
            </h3>
            <p className="text-[12.5px] text-[#334] leading-[1.6]">
              Currently on <strong>Student Visa</strong>. Upon graduation in November 2026,
              eligible for a <strong>3-year Post-study Open Work Visa</strong> — full work rights
              across any employer in New Zealand.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
