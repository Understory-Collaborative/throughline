// CaseStudy.jsx — Intelligent Hoodlums Brand UI Kit
// Case study strip + house rules / manifesto section

const caseStudies = [
  { label: 'Case Study · 2024', school: 'Ridgewood MS', district: 'Clark County', teachers: 6, weeks: 3, outcome: 'Shipped. Used. Renewed.' },
  { label: 'Case Study · 2023', school: 'Desert Pines HS', district: 'Clark County', teachers: 12, weeks: 5, outcome: 'Curriculum adopted district-wide.' },
  { label: 'Case Study · 2023', school: 'Mojave HS', district: 'Clark County', teachers: 8, weeks: 4, outcome: 'PD framework still running.' },
];

const houseRules = [
  'We design with teachers, never at them.',
  'We disrupt anything that wastes their time.',
  'We deliver work that survives Monday morning.',
  'We refuse to sell temporal solutions.',
  'We speak plain. We dress sharp. We move quiet.',
  'We are the hoodlums in the room.',
];

const CaseStudy = () => {
  const [active, setActive] = React.useState(0);
  const cs = caseStudies[active];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Case studies section */}
      <section style={{ background: '#0B2545', padding: '64px 64px' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontWeight: 100, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E0A458', marginBottom: 8 }}>
            Chapter · 03
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 36, lineHeight: 1.05, letterSpacing: '0.01em', color: '#F2E8D5', margin: '0 0 14px' }}>
            The Backstory
          </h2>
          <div style={{ width: 40, height: 3, background: '#B7280F' }} />
        </div>

        {/* Tab selector */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid rgba(242,232,213,0.2)' }}>
          {caseStudies.map((c, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 100,
              fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '8px 16px', background: 'transparent',
              color: active === i ? '#F2E8D5' : '#8CA3B5',
              border: 'none', borderBottom: active === i ? '2px solid #B7280F' : '2px solid transparent',
              cursor: 'pointer', transition: 'color 150ms',
            }}>{c.school}</button>
          ))}
        </div>

        {/* Active case */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 100, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E0A458', marginBottom: 8 }}>
              {cs.label}
            </div>
            <div style={{ fontWeight: 700, fontSize: 28, color: '#F2E8D5', marginBottom: 6 }}>{cs.school}</div>
            <div style={{ fontWeight: 100, fontSize: 11, color: '#8CA3B5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
              {cs.district} School District
            </div>
            <p style={{ fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: 'rgba(242,232,213,0.75)', maxWidth: 440 }}>
              Everything we make is pressure-tested by people who've taught it, in classrooms that didn't cooperate, at schools where Tuesday is the hardest day.
            </p>
          </div>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 32, flexShrink: 0 }}>
            {[
              { val: cs.teachers, lbl: 'Teachers' },
              { val: `${cs.weeks}wk`, lbl: 'Duration' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 48, color: '#F2E8D5', lineHeight: 1, letterSpacing: '0.01em' }}>{s.val}</div>
                <div style={{ fontWeight: 100, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E0A458', marginTop: 4 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Caption strip */}
        <div style={{
          borderTop: '1px solid rgba(242,232,213,0.2)', marginTop: 32, paddingTop: 12,
          display: 'flex', gap: 24,
          fontWeight: 100, fontSize: 9, letterSpacing: '0.08em',
        }}>
          <span style={{ color: '#E0A458', textTransform: 'uppercase' }}>Outcome</span>
          <span style={{ color: '#F2E8D5' }}>{cs.outcome}</span>
        </div>
      </section>

      {/* House rules */}
      <section style={{ background: '#F2E8D5', padding: '64px 64px' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontWeight: 100, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E0A458', marginBottom: 8 }}>Chapter · 05</div>
          <h2 style={{ fontWeight: 700, fontSize: 36, lineHeight: 1.05, color: '#0F1419', margin: '0 0 14px' }}>House Rules</h2>
          <div style={{ width: 40, height: 3, background: '#B7280F' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 48px' }}>
          {houseRules.map((rule, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid rgba(15,20,25,0.1)' }}>
              <span style={{ fontWeight: 100, fontSize: 9, color: '#E0A458', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0, paddingTop: 3 }}>
                0{i + 1}
              </span>
              <span style={{ fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: '#0F1419' }}>{rule}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { CaseStudy });
