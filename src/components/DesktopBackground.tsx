export default function DesktopBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient — shifts slowly like Sonoma */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(-45deg, #050d1a, #0d1b3e, #1a0a3e, #2d1b69, #0e3a5e, #3b0f6e, #0a1830)',
          backgroundSize: '400% 400%',
          animation: 'sonoma-shift 18s ease infinite',
        }}
      />

      {/* Aurora orb 1 — cyan/teal, top-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: '65vw',
          height: '65vw',
          top: '-20vw',
          left: '-15vw',
          background: 'radial-gradient(circle, rgba(14,180,180,0.28) 0%, rgba(20,100,160,0.14) 50%, transparent 70%)',
          filter: 'blur(48px)',
          animation: 'orb-drift-1 22s ease-in-out infinite',
        }}
      />

      {/* Aurora orb 2 — violet/purple, bottom-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: '70vw',
          height: '70vw',
          bottom: '-25vw',
          right: '-20vw',
          background: 'radial-gradient(circle, rgba(120,40,200,0.32) 0%, rgba(80,20,140,0.16) 50%, transparent 70%)',
          filter: 'blur(56px)',
          animation: 'orb-drift-2 26s ease-in-out infinite',
        }}
      />

      {/* Aurora orb 3 — warm magenta accent, center */}
      <div
        className="absolute rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          top: '20%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(180,30,120,0.18) 0%, rgba(100,20,160,0.10) 50%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'orb-drift-3 30s ease-in-out infinite',
        }}
      />

      {/* Subtle noise overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  )
}
