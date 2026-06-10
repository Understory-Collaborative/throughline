// BigQuoteSlide.jsx — Bone bg, massive Director's Commentary quote

const BigQuoteSlide = ({
  quote = 'When in doubt, trust a Hoodlum.',
  attribution = 'The Bond · Chapter 06',
  context = '',
  dark = false,
}) => {
  const bg = dark ? HM.ink : HM.bone;
  const textColor = dark ? HM.bone : HM.ink;

  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg, position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Avocado Sans', sans-serif",
    }}>
      {dark && <Halftone opacity={0.12} color={HM.bone} size={7} />}

      <Masthead light={!dark} />

      {/* Left Rufous stripe */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: HM.rufous }} />

      {/* Center content */}
      <div style={{ padding: '80px 100px', position: 'relative', zIndex: 1, maxWidth: 1100, textAlign: 'center' }}>
        {/* Opening quote mark */}
        <div style={{
          fontWeight: 700, fontSize: 180, lineHeight: 0.6,
          color: HM.rufous, opacity: 0.5, marginBottom: -20,
          letterSpacing: '-0.05em',
        }}>"</div>

        <blockquote style={{
          fontWeight: 700, fontSize: 72, lineHeight: 1.05,
          letterSpacing: '0.01em', color: textColor,
          margin: '0 0 40px',
        }}>{quote}</blockquote>

        <RufousRule width={48} />
        <div style={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}></div>

        {context && (
          <p style={{
            fontWeight: 400, fontSize: 20, lineHeight: 1.6,
            color: dark ? 'rgba(242,232,213,0.6)' : 'rgba(15,20,25,0.55)',
            marginTop: 32, maxWidth: 640, margin: '24px auto 0',
          }}>{context}</p>
        )}

        <div style={{
          marginTop: 32, fontWeight: 100, fontSize: 13,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: HM.tuscany,
        }}>— {attribution}</div>
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
        <span style={{ color: HM.tuscany }}>LV · EST 2014 · NV</span>
      </div>
    </div>
  );
};

Object.assign(window, { BigQuoteSlide });
