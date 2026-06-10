// BodySlide.jsx — Two-column body content slide: label + headline left, body text right

const BodySlide = ({
  chapter = '05',
  tag = 'House Rules',
  title = 'The Filter Every\nProject Runs Through',
  items = [
    'We design with teachers, never at them.',
    'We disrupt anything that wastes their time.',
    'We deliver work that survives Monday morning.',
    'We refuse to sell temporal solutions.',
    'We speak plain. We dress sharp. We move quiet.',
    'We are the hoodlums in the room.',
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
      width: '40%', padding: '100px 48px 80px 80px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      borderRight: `1px solid rgba(15,20,25,0.15)`,
    }}>
      <ChapterTag color={HM.tuscany}>Chapter · {chapter} — {tag}</ChapterTag>
      <h2 style={{
        fontWeight: 700, fontSize: 56, lineHeight: 1.05,
        color: HM.ink, margin: '0 0 28px', letterSpacing: '0.01em',
        whiteSpace: 'pre-line',
      }}>{title}</h2>
      <RufousRule width={48} />
      <div style={{
        marginTop: 32, fontWeight: 100, fontSize: 13, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: HM.cadet, lineHeight: 1.8,
      }}>
        These aren't values on a wall.<br />
        They're the filter every project<br />
        runs through before it ships.
      </div>
    </div>

    {/* Right column */}
    <div style={{
      flex: 1, padding: '100px 80px 80px 64px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'flex', gap: 24, alignItems: 'flex-start',
          padding: '18px 0',
          borderBottom: `1px solid rgba(15,20,25,0.1)`,
        }}>
          <span style={{
            fontWeight: 100, fontSize: 12, color: HM.tuscany,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            flexShrink: 0, paddingTop: 2, minWidth: 24,
          }}>0{i + 1}</span>
          <span style={{ fontWeight: 400, fontSize: 22, lineHeight: 1.45, color: HM.ink }}>{item}</span>
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
      <span style={{ color: HM.tuscany }}>Design · Disrupt · Deliver</span>
    </div>
  </div>
);

Object.assign(window, { BodySlide });
