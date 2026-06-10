// SectionOpenerSlide.jsx — Prussian bg, chapter tag + bold title + Rufous rule

const SectionOpenerSlide = ({ chapter = '01', title = 'The Origin', lede = '', tag = 'Founded 2014 · Las Vegas, Nevada' }) => (
  <div style={{
    width: '100%', height: '100%',
    background: HM.prussian, position: 'relative', overflow: 'hidden',
    display: 'flex', alignItems: 'center',
    fontFamily: "'Avocado Sans', sans-serif",
  }}>
    <Halftone opacity={0.1} color={HM.bone} size={7} />
    <Masthead />

    {/* Large chapter number — background watermark */}
    <div style={{
      position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
      fontWeight: 700, fontSize: 420, lineHeight: 1,
      color: 'rgba(11,37,69,0.6)', letterSpacing: '-0.05em',
      userSelect: 'none', pointerEvents: 'none',
      fontFamily: "'Avocado Sans', sans-serif",
    }}>{chapter.padStart(2, '0')}</div>

    {/* Left rufous stripe */}
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: HM.rufous }} />

    {/* Content */}
    <div style={{ padding: '0 100px 0 80px', position: 'relative', zIndex: 1, maxWidth: 820 }}>
      <ChapterTag color={HM.tuscany}>Chapter · {chapter.padStart(2, '0')} — {tag}</ChapterTag>

      <h2 style={{
        fontWeight: 700, fontSize: 96, lineHeight: 0.95,
        letterSpacing: '0.01em', color: HM.bone,
        margin: '0 0 32px',
      }}>{title}</h2>

      <RufousRule width={56} />

      {lede && (
        <p style={{
          fontWeight: 400, fontSize: 24, lineHeight: 1.6,
          color: 'rgba(242,232,213,0.7)', marginTop: 32, maxWidth: 580,
        }}>{lede}</p>
      )}
    </div>

    {/* Bottom strip */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      borderTop: '1px solid rgba(242,232,213,0.15)',
      padding: '12px 56px',
      display: 'flex', justifyContent: 'space-between',
      fontWeight: 100, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'rgba(242,232,213,0.35)',
    }}>
      <span>The Intelligent Hoodlums</span>
      <span style={{ color: HM.tuscany }}>Design · Disrupt · Deliver</span>
    </div>
  </div>
);

Object.assign(window, { SectionOpenerSlide });
