// StatsSlide.jsx — Large impact numbers on Prussian
// Used for data-forward moments: reach, outcomes, scale

const StatsSlide = ({
  chapter   = '03',
  tag       = 'The Backstory',
  headline  = 'The Numbers That\nDon\'t Lie.',
  stats = [
    { val: '12+', label: 'Years in Classrooms', caption: 'Founded 2014 · Still in the room' },
    { val: '6',   label: 'Teachers Per Cohort', caption: 'Small by design. Deep by default.' },
    { val: '3wk', label: 'Average Engagement', caption: 'Pressure-tested. Not padded.' },
    { val: '0',   label: 'Maintenance Contracts', caption: 'The handoff runs without us.' },
  ],
  note = 'PSA — if it can\'t survive a Tuesday morning at 7:42, it\'s not a strategy. It\'s a slide deck.',
}) => (
  <div style={{
    width: '100%', height: '100%',
    background: HM.prussian, position: 'relative', overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
    fontFamily: "'Avocado Sans', sans-serif",
  }}>
    <Halftone opacity={0.1} color={HM.bone} size={8} />
    <Masthead />

    {/* Left rufous stripe */}
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: HM.rufous }} />

    {/* Header */}
    <div style={{ padding: '100px 80px 48px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
      <ChapterTag color={HM.tuscany}>Chapter · {chapter} — {tag}</ChapterTag>
      <h2 style={{
        fontWeight: 700, fontSize: 72, lineHeight: 1.0,
        color: HM.bone, margin: 0, letterSpacing: '0.01em',
        whiteSpace: 'pre-line',
      }}>{headline}</h2>
      <RufousRule width={56} />
    </div>

    {/* Stats grid */}
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
      gap: 0, padding: '0 80px', flex: 1,
      position: 'relative', zIndex: 1,
      alignItems: 'center',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: '0 32px 0 0',
          borderRight: i < stats.length - 1 ? '1px solid rgba(242,232,213,0.15)' : 'none',
        }}>
          <div style={{
            fontWeight: 700, fontSize: 96, lineHeight: 1,
            color: HM.bone, letterSpacing: '-0.02em',
          }}>{s.val}</div>
          <div style={{
            fontWeight: 400, fontSize: 18, color: HM.tuscany,
            marginTop: 8, marginBottom: 10, lineHeight: 1.3,
          }}>{s.label}</div>
          <div style={{
            fontWeight: 100, fontSize: 12, letterSpacing: '0.06em',
            color: 'rgba(242,232,213,0.45)', lineHeight: 1.5,
          }}>{s.caption}</div>
        </div>
      ))}
    </div>

    {/* Crew Talk caption strip */}
    <div style={{
      margin: '0 80px 72px',
      borderTop: '1px solid rgba(242,232,213,0.2)',
      paddingTop: 16,
      display: 'flex', gap: 24,
      fontWeight: 100, fontSize: 13, letterSpacing: '0.06em',
      position: 'relative', zIndex: 1,
    }}>
      <span style={{ color: HM.tuscany, textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>Crew Talk</span>
      <span style={{ color: 'rgba(242,232,213,0.5)', fontStyle: 'italic' }}>{note}</span>
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

Object.assign(window, { StatsSlide });
