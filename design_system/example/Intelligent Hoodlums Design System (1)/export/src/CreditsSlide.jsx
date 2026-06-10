// CreditsSlide.jsx — Closing slide: Ink bg, credits box, badge, hook

const CreditsSlide = () => (
  <div style={{
    width: '100%', height: '100%',
    background: HM.ink, position: 'relative', overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Avocado Sans', sans-serif",
  }}>
    <Halftone opacity={0.12} color={HM.bone} size={8} />
    <Masthead />

    {/* Left rufous stripe */}
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: HM.rufous }} />

    <div style={{
      display: 'flex', alignItems: 'center', gap: 96,
      position: 'relative', zIndex: 1, padding: '0 80px',
    }}>
      {/* Badge */}
      <div style={{ flexShrink: 0, textAlign: 'center' }}>
        <img src={window.__resources && window.__resources['badge']} alt="Hoodlums Badge"
          style={{ width: 260, height: 260, objectFit: 'contain' }} />
      </div>

      {/* Right: hook + credits */}
      <div>
        {/* Closing hook */}
        <h2 style={{
          fontWeight: 700, fontSize: 72, lineHeight: 1.0,
          color: HM.bone, margin: '0 0 16px', letterSpacing: '0.01em',
        }}>
          When in doubt,<br />
          <span style={{ color: HM.rufous }}>trust a Hoodlum.</span>
        </h2>

        <RufousRule width={56} />

        {/* Credits box */}
        <div style={{
          marginTop: 36,
          fontWeight: 100, fontSize: 14, lineHeight: 2.4,
        }}>
          {[
            ['Firm',    'The Intelligent Hoodlums'],
            ['Owners',  'Mike Lang & Webs'],
            ['Founded', '2014 · Las Vegas, Nevada'],
            ['Mission', 'Design · Disrupt · Deliver'],
            ['Contact', 'theintelligenthoodlums.com'],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', gap: 28 }}>
              <span style={{ color: HM.tuscany, textTransform: 'uppercase', letterSpacing: '0.1em', minWidth: 100 }}>{label}</span>
              <span style={{ color: HM.bone }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom strip */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: HM.prussian, padding: '12px 56px',
      display: 'flex', justifyContent: 'space-between',
      fontWeight: 100, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'rgba(242,232,213,0.4)',
    }}>
      <span>Brand Kit · Vol.01 · Issue 001</span>
      <span style={{ color: HM.tuscany }}>LV · EST 2014 · NV</span>
    </div>
  </div>
);

Object.assign(window, { CreditsSlide });
