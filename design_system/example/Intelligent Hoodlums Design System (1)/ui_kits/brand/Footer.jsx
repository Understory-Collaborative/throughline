// Footer.jsx — Intelligent Hoodlums Brand UI Kit

const Footer = () => (
  <footer style={{
    background: '#0F1419', color: '#F2E8D5',
    padding: '48px 64px 32px',
    fontFamily: "'DM Sans', sans-serif",
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
      {/* Left: logo + tagline */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <img src="../../assets/HM-badge-full.png" alt="Badge" style={{ width: 60, height: 60, objectFit: 'contain' }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '0.04em', color: '#F2E8D5', textTransform: 'uppercase' }}>
            Intelligent Hoodlums
          </div>
          <div style={{ fontWeight: 100, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E0A458', marginTop: 4 }}>
            When in doubt, trust a Hoodlum.
          </div>
          <div style={{ fontWeight: 100, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8CA3B5', marginTop: 8 }}>
            Las Vegas, Nevada · Est. 2014
          </div>
        </div>
      </div>

      {/* Right: credits box */}
      <div style={{ fontWeight: 100, fontSize: 10, lineHeight: 2.2, textAlign: 'right' }}>
        {[
          ['Owners', 'Mike Lang & Webs'],
          ['Founded', '2014 · Las Vegas, NV'],
          ['Mission', 'Design · Disrupt · Deliver'],
        ].map(([label, val]) => (
          <div key={label} style={{ display: 'flex', gap: 20, justifyContent: 'flex-end' }}>
            <span style={{ color: '#E0A458', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
            <span style={{ color: '#F2E8D5' }}>{val}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div style={{ height: 1, background: 'rgba(242,232,213,0.15)', marginBottom: 20 }} />

    {/* Bottom bar */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 100, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8CA3B5' }}>
        © 2014–2026 The Intelligent Hoodlums · All Rights Reserved
      </div>
      <div style={{ fontWeight: 100, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8CA3B5' }}>
        Brand Kit · Vol.01 · Issue 001
      </div>
    </div>
  </footer>
);

Object.assign(window, { Footer });
