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
    display: 'flex', fontFamily: DM,
  }}>
    <Masthead light />
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: HM.rufous }} />

    {/* Left column */}
    <div style={{
      width: '40%', padding: '100px 48px 80px 80px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      borderRight: `1px solid rgba(15,20,25,0.15)`,
    }}>
      <ChapterTag color={HM.tuscany}>Chapter · {chapter} — {tag}</ChapterTag>
      <h2 style={{
        fontFamily: GRIFT,
        fontWeight: 800, fontSize: 58, lineHeight: 1.02,
        color: HM.ink, margin: '0 0 28px', letterSpacing: '0.01em',
        whiteSpace: 'pre-line',
      }}>{title}</h2>
      <RufousRule width={48} />
      <div style={{
        marginTop: 28, fontFamily: DM,
        fontWeight: 300, fontSize: 13, letterSpacing: '0.08em',
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
            fontFamily: DM, fontWeight: 300, fontSize: 12,
            color: HM.tuscany, letterSpacing: '0.1em', textTransform: 'uppercase',
            flexShrink: 0, paddingTop: 4, minWidth: 24,
          }}>0{i + 1}</span>
          <span style={{ fontFamily: DM, fontWeight: 400, fontSize: 22, lineHeight: 1.45, color: HM.ink }}>{item}</span>
        </div>
      ))}
    </div>

    <BottomStrip />
  </div>
);

Object.assign(window, { BodySlide });
