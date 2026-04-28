import { educationData } from '../../data'

type EduCardProps = (typeof educationData)[number]

function EduCard({ degree, school, location, period, status, statusColor, logoSrc, papers }: EduCardProps) {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-xl p-5 mb-4 flex gap-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
      <div className="shrink-0">
        <div
          className="w-[52px] h-[52px] rounded-xl flex items-center justify-center overflow-hidden"
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

        {papers.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#efefef]">
            <div className="flex flex-wrap gap-1.5">
              {papers.map(paper => (
                <span
                  key={paper}
                  className="text-[11px] px-2 py-0.5 rounded-xl border border-[#d8d8d8] text-[#555] bg-[#f7f7f7] font-medium"
                >
                  {paper.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
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

      {educationData.map(education => (
        <EduCard key={`${education.school}-${education.degree}`} {...education} />
      ))}

    </div>
  )
}
