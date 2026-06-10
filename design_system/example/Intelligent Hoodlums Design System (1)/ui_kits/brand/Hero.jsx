// Hero.jsx — Intelligent Hoodlums Brand UI Kit
// Splash hero panel — Director's Commentary register

const Hero = ({ onCtaClick }) => {
  return (
    <section style={{
      background: '#0F1419', color: '#F2E8D5',
      padding: '80px 64px', position: 'relative', overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
      minHeight: 420, display: 'flex', alignItems: 'center',
    }}>
      {/* Halftone overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(242,232,213,0.12) 1px, transparent 1px)',
        backgroundSize: '7px 7px',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 64, position: 'relative', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        {/* Left: text */}
        <div style={{ flex: 1 }}>
          {/* Chapter tag */}
          <div style={{
            fontWeight: 100, fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#E0A458', marginBottom: 16,
          }}>
            Las Vegas, Nevada · Est. 2014
          </div>

          {/* Hero headline */}
          <h1 style={{
            fontFamily: "'Grift', sans-serif",
            fontWeight: 900, fontSize: 72, lineHeight: 1.0,
            letterSpacing: '0.02em', color: '#F2E8D5',
            margin: '0 0 8px', textTransform: 'uppercase',
          }}>
            Design.<br />Disrupt.<br />Deliver.
          </h1>

          {/* Rufous rule */}
          <div style={{ width: 48, height: 3, background: '#B7280F', margin: '20px 0' }} />

          {/* Sub */}
          <p style={{
            fontWeight: 400, fontSize: 18, lineHeight: 1.6,
            color: 'rgba(242,232,213,0.75)', maxWidth: 480, margin: '0 0 32px',
          }}>
            We design with teachers, never at them. We disrupt anything that wastes their time. We deliver work that survives Monday morning.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={onCtaClick} style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '12px 24px', background: '#B7280F', color: '#F2E8D5',
              border: '2px solid #B7280F', cursor: 'pointer',
              transition: 'box-shadow 150ms',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '3px 3px 0 #F2E8D5'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >Trust a Hoodlum</button>
            <button style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '12px 24px', background: 'transparent', color: '#F2E8D5',
              border: '2px solid #F2E8D5', cursor: 'pointer',
              transition: 'background 150ms, color 150ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0B2545'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >Read the Case</button>
          </div>
        </div>

        {/* Right: badge */}
        <div style={{ flexShrink: 0 }}>
          <img src="../../assets/HM-badge-full.png" alt="Hoodlums Badge"
            style={{ width: 220, height: 220, objectFit: 'contain', opacity: 0.95 }} />
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Hero });
