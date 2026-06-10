// CoverSlide.jsx — Full Ink cover with badge, halftone, Director's Commentary

const CoverSlide = () => (
  <div style={{
    width: '100%', height: '100%',
    background: HM.ink, position: 'relative', overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Avocado Sans', sans-serif",
  }}>
    <Halftone opacity={0.13} color={HM.bone} size={8} />

    {/* Masthead */}
    <Masthead />

    {/* Left rufous stripe */}
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: HM.rufous }} />

    {/* Center content */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 80, position: 'relative', zIndex: 1 }}>
      {/* Badge */}
      <img src={window.__resources && window.__resources['badge']} alt="Hoodlums Badge"
        style={{ width: 320, height: 320, objectFit: 'contain', flexShrink: 0 }} />

      {/* Text block */}
      <div style={{ maxWidth: 580 }}>
        <ChapterTag color={HM.tuscany}>Brand Kit · Vol.01 · Issue 001</ChapterTag>

        <h1 style={{
          fontWeight: 700, fontSize: 110, lineHeight: 0.92,
          letterSpacing: '0.01em', color: HM.bone,
          margin: '0 0 24px', textTransform: 'uppercase',
        }}>
          Design.<br />Disrupt.<br />Deliver.
        </h1>

        <RufousRule width={64} />

        <p style={{
          fontWeight: 400, fontSize: 22, lineHeight: 1.55,
          color: 'rgba(242,232,213,0.65)', marginTop: 28,
          maxWidth: 480,
        }}>
          We design with teachers, never at them.<br />
          We disrupt anything that wastes their time.<br />
          We deliver work that survives Monday morning.
        </p>

        <div style={{
          marginTop: 36, fontWeight: 100, fontSize: 13,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: HM.tuscany,
        }}>
          Mike Lang &amp; Webs · Las Vegas, Nevada · Est. 2014
        </div>
      </div>
    </div>

    {/* Bottom strip */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: HM.prussian, padding: '12px 56px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontWeight: 100, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'rgba(242,232,213,0.5)',
    }}>
      <span>The Intelligent Hoodlums</span>
      <span style={{ color: HM.tuscany }}>When in doubt, trust a Hoodlum.</span>
      <span>theintelligenthoodlums.com</span>
    </div>
  </div>
);

Object.assign(window, { CoverSlide });
