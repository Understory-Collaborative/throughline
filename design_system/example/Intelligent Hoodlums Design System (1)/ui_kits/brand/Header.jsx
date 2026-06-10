// Header.jsx — Intelligent Hoodlums Brand UI Kit
// Masthead + nav bar component

const Header = ({ activePage = 'home' }) => {
  const navItems = ['Design', 'Disrupt', 'Deliver', 'Case Studies', 'The Bond'];
  return (
    <header style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Masthead band */}
      <div style={{
        background: '#0B2545', color: '#F2E8D5',
        padding: '8px 32px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
        fontWeight: 100,
      }}>
        <span>The Intelligent Hoodlums · Vol.01</span>
        <span style={{ fontWeight: 700, fontSize: 11, letterSpacing: '0.06em' }}>Design · Disrupt · Deliver</span>
        <span>LV · EST 2014 · NV</span>
      </div>

      {/* Nav bar */}
      <div style={{
        background: '#F2E8D5', borderBottom: '2px solid #0F1419',
        padding: '0 32px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
      }}>
        {/* Logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
          <img src="../../assets/HM-badge-full.png" alt="Hoodlums Badge"
            style={{ width: 44, height: 44, objectFit: 'contain' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.04em', color: '#0B2545', lineHeight: 1.1 }}>
              INTELLIGENT HOODLUMS
            </div>
            <div style={{ fontWeight: 100, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E0A458' }}>
              When in doubt, trust a Hoodlum.
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: 0 }}>
          {navItems.map(item => (
            <a key={item} href="#"
              style={{
                display: 'block', padding: '16px 16px',
                fontWeight: activePage === item.toLowerCase() ? 700 : 400,
                fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase',
                color: activePage === item.toLowerCase() ? '#B7280F' : '#0F1419',
                textDecoration: 'none', borderBottom: activePage === item.toLowerCase() ? '3px solid #B7280F' : '3px solid transparent',
                transition: 'color 150ms',
              }}
              onMouseEnter={e => { if (activePage !== item.toLowerCase()) e.target.style.color = '#0B2545'; }}
              onMouseLeave={e => { if (activePage !== item.toLowerCase()) e.target.style.color = '#0F1419'; }}
            >{item}</a>
          ))}
        </nav>
      </div>
    </header>
  );
};

Object.assign(window, { Header });
