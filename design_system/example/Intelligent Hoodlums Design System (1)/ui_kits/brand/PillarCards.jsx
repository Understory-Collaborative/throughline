// PillarCards.jsx — Intelligent Hoodlums Brand UI Kit
// Three pillars section: Design · Disrupt · Deliver

const pillars = [
  {
    number: '01',
    name: 'Design.',
    body: 'Instruction, assessment, professional learning, and curriculum that\'s been pressure-tested by people who\'ve taught it. Built for the context it\'ll live in.',
    tag: 'Curriculum · PL · Assessment',
  },
  {
    number: '02',
    name: 'Disrupt.',
    body: 'Audits, critique, and the uncomfortable questions that vendors and admins are paid to avoid asking. We name what isn\'t working.',
    tag: 'Audits · Critique · Clarity',
  },
  {
    number: '03',
    name: 'Deliver.',
    body: 'Workshops, coaching, and produced artifacts — decks, playbooks, video, micro-courses — that get used, not shelved.',
    tag: 'Workshops · Coaching · Artifacts',
  },
];

const PillarCards = () => {
  const [hovered, setHovered] = React.useState(null);

  return (
    <section style={{
      background: '#F2E8D5', padding: '64px 64px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Section header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontWeight: 100, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E0A458', marginBottom: 8 }}>
          Chapter · 07
        </div>
        <h2 style={{ fontWeight: 700, fontSize: 40, lineHeight: 1.05, letterSpacing: '0.01em', color: '#0F1419', margin: 0 }}>
          The Three Pillars
        </h2>
        <div style={{ width: 40, height: 3, background: '#B7280F', marginTop: 14 }} />
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {pillars.map((p, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              border: '1px solid #0F1419',
              boxShadow: hovered === i ? '5px 5px 0 #0B2545' : '3px 3px 0 #0F1419',
              transition: 'box-shadow 150ms',
              background: hovered === i ? '#0B2545' : '#F2E8D5',
              cursor: 'default',
            }}>
            {/* Header */}
            <div style={{
              background: hovered === i ? '#B7280F' : '#0B2545',
              padding: '14px 20px', transition: 'background 150ms',
            }}>
              <div style={{ fontWeight: 100, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E0A458', marginBottom: 4 }}>
                Pillar · {p.number}
              </div>
              <div style={{ fontWeight: 700, fontSize: 28, color: '#F2E8D5', letterSpacing: '0.01em' }}>
                {p.name}
              </div>
            </div>
            {/* Body */}
            <div style={{ padding: '16px 20px 20px' }}>
              <p style={{
                fontWeight: 400, fontSize: 14, lineHeight: 1.6,
                color: hovered === i ? '#F2E8D5' : '#0F1419',
                margin: '0 0 14px', transition: 'color 150ms',
              }}>{p.body}</p>
              <div style={{ fontWeight: 100, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E0A458' }}>
                {p.tag}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { PillarCards });
