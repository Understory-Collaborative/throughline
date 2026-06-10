// AgendaSlide.jsx — Workshop / session agenda on Bone
// Numbered items with time markers and Tuscany labels

const AgendaSlide = ({
  workshopTitle = 'Workshop Agenda',
  date          = 'Tuesday Morning · 8:00–11:30',
  items = [
    { time: '8:00',  duration: '30 min',  title: 'The Diagnosis',        note: 'Where are we? What isn\'t working? Name it.' },
    { time: '8:30',  duration: '60 min',  title: 'The Framework',        note: 'Structure that survives contact. Build, don\'t buy.' },
    { time: '9:30',  duration: '15 min',  title: 'Break',                note: 'Get coffee. Use the bathroom. Come back ready.' },
    { time: '9:45',  duration: '45 min',  title: 'The Work Session',     note: 'Practitioner-led. Peer-pressure-tested.' },
    { time: '10:30', duration: '45 min',  title: 'The Handoff Protocol', note: 'What runs without us? Every artifact. Every time.' },
    { time: '11:15', duration: '15 min',  title: 'The Hook',             note: 'What\'s next? Every page turns.' },
  ],
}) => (
  <div style={{
    width: '100%', height: '100%',
    background: HM.bone, position: 'relative', overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
    fontFamily: "'Avocado Sans', sans-serif",
  }}>
    <Masthead light />

    {/* Left rufous stripe */}
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: HM.rufous }} />

    {/* Header */}
    <div style={{ padding: '90px 80px 36px', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <ChapterTag color={HM.tuscany}>Session Plan</ChapterTag>
          <h2 style={{ fontWeight: 700, fontSize: 64, lineHeight: 1.0, color: HM.ink, margin: '0 0 20px', letterSpacing: '0.01em' }}>
            {workshopTitle}
          </h2>
          <RufousRule width={48} />
        </div>
        <div style={{
          fontWeight: 100, fontSize: 13, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: HM.cadet, textAlign: 'right',
        }}>{date}</div>
      </div>
    </div>

    {/* Agenda rows */}
    <div style={{ padding: '0 80px 72px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '80px 60px 1fr auto',
          gap: '0 28px',
          alignItems: 'center',
          padding: '14px 0',
          borderBottom: `1px solid rgba(15,20,25,${i === items.length - 1 ? 0 : 0.1})`,
        }}>
          {/* Time */}
          <div style={{
            fontWeight: 100, fontSize: 14, color: HM.cadet,
            letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums',
          }}>{item.time}</div>
          {/* Duration tag */}
          <div style={{
            fontWeight: 100, fontSize: 10, color: HM.tuscany,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            border: `1px solid ${HM.tuscany}`, padding: '2px 6px',
            textAlign: 'center', whiteSpace: 'nowrap',
          }}>{item.duration}</div>
          {/* Title */}
          <div style={{ fontWeight: 700, fontSize: 22, color: HM.ink, letterSpacing: '0.01em' }}>{item.title}</div>
          {/* Note */}
          <div style={{
            fontWeight: 100, fontSize: 13, color: HM.cadet,
            letterSpacing: '0.04em', maxWidth: 380, textAlign: 'right',
            lineHeight: 1.4,
          }}>{item.note}</div>
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
      <span style={{ color: HM.tuscany }}>If it can't survive a Tuesday, it's not a strategy.</span>
    </div>
  </div>
);

Object.assign(window, { AgendaSlide });
