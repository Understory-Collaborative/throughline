// TwoColumnSlide.jsx — Two content columns: title left, rich body right
// Good for proposals, deliverables lists, or service breakdowns

const TwoColumnSlide = ({
  chapter  = '07',
  tag      = 'The Three Pillars',
  title    = 'What We\nActually Build.',
  leftBody = 'Not binders. Not laminated frameworks. Not a three-day retreat that leaves teachers with one handout and a pen.',
  sections = [
    {
      label: 'Curriculum Design',
      items: ['Unit maps', 'Lesson frameworks', 'Assessment architecture', 'Scope & sequence'],
    },
    {
      label: 'Professional Learning',
      items: ['Workshop facilitation', 'Coaching protocols', 'PLC structure', 'Observation tools'],
    },
    {
      label: 'Produced Artifacts',
      items: ['Slide decks', 'Playbooks', 'Micro-courses', 'Video modules'],
    },
  ],
}) => (
  <div style={{
    width: '100%', height: '100%',
    background: HM.bone, position: 'relative', overflow: 'hidden',
    display: 'flex',
    fontFamily: "'Avocado Sans', sans-serif",
  }}>
    <Masthead light />

    {/* Left rufous stripe */}
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: HM.rufous }} />

    {/* Left column */}
    <div style={{
      width: '38%', padding: '100px 48px 80px 80px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      borderRight: '1px solid rgba(15,20,25,0.12)',
    }}>
      <ChapterTag color={HM.tuscany}>Chapter · {chapter} — {tag}</ChapterTag>
      <h2 style={{
        fontWeight: 700, fontSize: 60, lineHeight: 1.05,
        color: HM.ink, margin: '0 0 28px', letterSpacing: '0.01em',
        whiteSpace: 'pre-line',
      }}>{title}</h2>
      <RufousRule width={48} />
      <p style={{
        fontWeight: 400, fontSize: 20, lineHeight: 1.65,
        color: 'rgba(15,20,25,0.65)', marginTop: 32,
      }}>{leftBody}</p>

      {/* Badge watermark */}
      <img src={window.__resources && window.__resources['badge']} alt=""
        style={{ width: 120, height: 120, objectFit: 'contain', opacity: 0.07, marginTop: 40 }} />
    </div>

    {/* Right column — sections */}
    <div style={{
      flex: 1, padding: '100px 80px 80px 56px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      gap: 32,
    }}>
      {sections.map((sec, i) => (
        <div key={i}>
          {/* Section label */}
          <div style={{
            fontWeight: 100, fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: HM.tuscany, marginBottom: 10,
          }}>{sec.label}</div>
          {/* Items row */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {sec.items.map((item, j) => (
              <div key={j} style={{
                fontWeight: 400, fontSize: 18, color: HM.ink,
                border: `1px solid ${HM.ink}`,
                padding: '6px 16px',
                boxShadow: '2px 2px 0 rgba(15,20,25,0.15)',
              }}>{item}</div>
            ))}
          </div>
          {i < sections.length - 1 && (
            <div style={{ height: 1, background: 'rgba(15,20,25,0.1)', marginTop: 28 }} />
          )}
        </div>
      ))}
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
      <span style={{ color: HM.tuscany }}>Work that gets used. Not shelved.</span>
    </div>
  </div>
);

Object.assign(window, { TwoColumnSlide });
