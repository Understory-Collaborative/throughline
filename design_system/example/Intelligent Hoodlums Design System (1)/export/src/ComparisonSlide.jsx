// ComparisonSlide.jsx — "The CFL Playbook vs. The Hoodlums Way"
// Dark left (enemy) / Bone right (us) split

const ComparisonSlide = ({
  leftLabel  = 'The CFL Playbook',
  rightLabel = 'The Hoodlums Way',
  leftItems  = [
    '$40k PD day. One laminated handout.',
    'Three-day retreat. Nothing by Monday.',
    'World-class frameworks. Untested.',
    '"Best-in-breed" solutions. Off the shelf.',
    'Vendor dependency built in.',
    'Consultants who\'ve never taught Tuesday.',
  ],
  rightItems = [
    'Six teachers. Three weeks. Shipped.',
    'Work that survives Monday morning.',
    'Pressure-tested in real classrooms.',
    'Built for the context it\'ll live in.',
    'Every handoff runs without us.',
    'Practitioners. Always in the room.',
  ],
}) => (
  <div style={{
    width: '100%', height: '100%',
    display: 'flex', position: 'relative', overflow: 'hidden',
    fontFamily: "'Avocado Sans', sans-serif",
  }}>
    {/* Left panel — Ink (enemy) */}
    <div style={{
      width: '50%', background: HM.ink, position: 'relative',
      display: 'flex', flexDirection: 'column',
      padding: '100px 56px 72px 80px',
    }}>
      <Halftone opacity={0.1} color={HM.bone} size={7} />
      <Masthead />
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Label */}
        <div style={{
          fontWeight: 100, fontSize: 12, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: HM.rufous, marginBottom: 12,
        }}>{leftLabel}</div>
        <div style={{ width: 40, height: 3, background: HM.rufous, marginBottom: 32 }} />

        {leftItems.map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 20, alignItems: 'flex-start',
            padding: '14px 0', borderBottom: '1px solid rgba(242,232,213,0.1)',
          }}>
            {/* Strike / X mark */}
            <span style={{ color: HM.rufous, fontSize: 18, fontWeight: 700, flexShrink: 0, lineHeight: 1.3 }}>✕</span>
            <span style={{ fontWeight: 400, fontSize: 20, lineHeight: 1.45, color: 'rgba(242,232,213,0.6)' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Right panel — Bone (us) */}
    <div style={{
      width: '50%', background: HM.bone, position: 'relative',
      display: 'flex', flexDirection: 'column',
      padding: '100px 80px 72px 56px',
      borderLeft: `6px solid ${HM.rufous}`,
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 60 }}>
        {/* Label */}
        <div style={{
          fontWeight: 100, fontSize: 12, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: HM.tuscany, marginBottom: 12,
        }}>{rightLabel}</div>
        <div style={{ width: 40, height: 3, background: HM.prussian, marginBottom: 32 }} />

        {rightItems.map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 20, alignItems: 'flex-start',
            padding: '14px 0', borderBottom: '1px solid rgba(15,20,25,0.1)',
          }}>
            <span style={{ color: HM.prussian, fontSize: 18, fontWeight: 700, flexShrink: 0, lineHeight: 1.3 }}>→</span>
            <span style={{ fontWeight: 400, fontSize: 20, lineHeight: 1.45, color: HM.ink }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Bottom badge watermark */}
      <img src={window.__resources && window.__resources['badge']} alt=""
        style={{
          position: 'absolute', bottom: 60, right: 48,
          width: 100, height: 100, objectFit: 'contain', opacity: 0.1,
        }} />
    </div>

    {/* Bottom strip */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: HM.prussian, padding: '12px 56px',
      display: 'flex', justifyContent: 'space-between',
      fontWeight: 100, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'rgba(242,232,213,0.4)',
    }}>
      <span>The Intelligent Hoodlums</span>
      <span style={{ color: HM.tuscany }}>Name the enemy. Don't punch down.</span>
    </div>
  </div>
);

Object.assign(window, { ComparisonSlide });
