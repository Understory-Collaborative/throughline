// CaseStudySlide.jsx — Split panel: dark left stats / bone right body

const CaseStudySlide = ({
  label     = 'Case Study · 2024',
  school    = 'Ridgewood MS',
  district  = 'Clark County School District',
  teachers  = 6,
  weeks     = 3,
  outcome   = 'Shipped. Used. Renewed.',
  body      = 'Everything we make is pressure-tested by people who\'ve taught it, in classrooms that didn\'t cooperate, at schools where Tuesday is the hardest day.',
}) => (
  <div style={{
    width: '100%', height: '100%',
    display: 'flex', position: 'relative', overflow: 'hidden',
    fontFamily: "'Avocado Sans', sans-serif",
  }}>
    {/* Left panel — Prussian */}
    <div style={{
      width: '42%', background: HM.prussian, position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '100px 56px 60px 80px',
    }}>
      <Halftone opacity={0.1} color={HM.bone} size={7} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ChapterTag color={HM.tuscany}>{label}</ChapterTag>
        <h2 style={{
          fontWeight: 700, fontSize: 52, lineHeight: 1.0,
          color: HM.bone, margin: '0 0 8px', letterSpacing: '0.01em',
        }}>{school}</h2>
        <div style={{
          fontWeight: 100, fontSize: 13, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: HM.cadet, marginBottom: 40,
        }}>{district}</div>

        <RufousRule width={40} />

        {/* Stats */}
        <div style={{ display: 'flex', gap: 40, marginTop: 40 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 72, color: HM.bone, lineHeight: 1, letterSpacing: '0.01em' }}>{teachers}</div>
            <div style={{ fontWeight: 100, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: HM.tuscany, marginTop: 4 }}>Teachers</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 72, color: HM.bone, lineHeight: 1, letterSpacing: '0.01em' }}>{weeks}<span style={{ fontSize: 32 }}>wk</span></div>
            <div style={{ fontWeight: 100, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: HM.tuscany, marginTop: 4 }}>Duration</div>
          </div>
        </div>
      </div>

      {/* Left rufous stripe */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: HM.rufous }} />
    </div>

    {/* Right panel — Bone */}
    <div style={{
      flex: 1, background: HM.bone,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '100px 80px 60px 64px', position: 'relative',
    }}>
      <Masthead light />

      <div style={{ position: 'relative' }}>
        <ChapterTag color={HM.tuscany}>The Backstory</ChapterTag>

        <p style={{
          fontWeight: 400, fontSize: 26, lineHeight: 1.65,
          color: HM.ink, maxWidth: 560, margin: '0 0 48px',
        }}>{body}</p>

        {/* Caption strip */}
        <div style={{
          borderTop: `1px solid ${HM.ink}`,
          borderBottom: `1px solid ${HM.ink}`,
          padding: '12px 0',
          display: 'flex', gap: 32,
          fontWeight: 100, fontSize: 12, letterSpacing: '0.08em',
        }}>
          <span style={{ color: HM.tuscany, textTransform: 'uppercase' }}>Outcome</span>
          <span style={{ color: HM.ink }}>{outcome}</span>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: HM.ink, padding: '12px 56px',
        display: 'flex', justifyContent: 'space-between',
        fontWeight: 100, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'rgba(242,232,213,0.4)',
      }}>
        <span>The Intelligent Hoodlums</span>
        <span style={{ color: HM.tuscany }}>Design · Disrupt · Deliver</span>
      </div>
    </div>
  </div>
);

Object.assign(window, { CaseStudySlide });
