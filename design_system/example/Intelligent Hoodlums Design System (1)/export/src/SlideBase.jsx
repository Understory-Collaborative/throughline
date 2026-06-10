// Shared slide styles and constants for Intelligent Hoodlums deck
// Loaded before individual slide components

const HM = {
  prussian: '#0B2545',
  rufous:   '#B7280F',
  tuscany:  '#E0A458',
  bone:     '#F2E8D5',
  cadet:    '#8CA3B5',
  ink:      '#0F1419',
};

// Halftone overlay (ben-day dots)
const Halftone = ({ opacity = 0.18, color = HM.bone, size = 7 }) => (
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: `${size}px ${size}px`,
    opacity,
  }} />
);

// Masthead band — top of every slide
const Masthead = ({ light = false }) => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0,
    background: light ? HM.bone : HM.prussian,
    borderBottom: `2px solid ${light ? HM.ink : 'transparent'}`,
    padding: '14px 56px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontFamily: "'Avocado Sans', sans-serif",
    fontWeight: 100, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: light ? HM.ink : HM.bone,
    zIndex: 10,
  }}>
    <span>The Intelligent Hoodlums · Vol.01</span>
    <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.06em' }}>Design · Disrupt · Deliver</span>
    <span>LV · EST 2014 · NV</span>
  </div>
);

// Rufous rule
const RufousRule = ({ width = 56 }) => (
  <div style={{ width, height: 4, background: HM.rufous, flexShrink: 0 }} />
);

// Chapter tag / label
const ChapterTag = ({ children, color = HM.tuscany }) => (
  <div style={{
    fontFamily: "'Avocado Sans', sans-serif",
    fontWeight: 100, fontSize: 14, letterSpacing: '0.14em',
    textTransform: 'uppercase', color,
    marginBottom: 16,
  }}>{children}</div>
);

Object.assign(window, { HM, Halftone, Masthead, RufousRule, ChapterTag });
