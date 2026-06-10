// PillarsSlide.jsx — Three column pillar cards on Bone

const pillarsData = [
  {
    num: '01', name: 'Design.', color: HM.prussian,
    body: 'Instruction, assessment, professional learning, and curriculum that\'s been pressure-tested by people who\'ve taught it. Built for the context it\'ll live in.',
    tag: 'Curriculum · PL · Assessment',
  },
  {
    num: '02', name: 'Disrupt.', color: HM.ink,
    body: 'Audits, critique, and the uncomfortable questions that vendors and admins are paid to avoid asking. We name what isn\'t working. That\'s the job.',
    tag: 'Audits · Critique · Clarity',
  },
  {
    num: '03', name: 'Deliver.', color: HM.rufous,
    body: 'Workshops, coaching, and produced artifacts — decks, playbooks, video, micro-courses — that get used, not shelved. Every engagement ends with a handoff.',
    tag: 'Workshops · Coaching · Artifacts',
  },
];

const PillarsSlide = () => (
  <div style={{
    width: '100%', height: '100%',
    background: HM.bone, position: 'relative', overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
    fontFamily: "'Avocado Sans', sans-serif",
  }}>
    <Masthead light />

    {/* Header */}
    <div style={{ padding: '90px 80px 40px', flexShrink: 0 }}>
      <ChapterTag color={HM.tuscany}>Chapter · 07</ChapterTag>
      <h2 style={{ fontWeight: 700, fontSize: 64, lineHeight: 1.0, color: HM.ink, margin: '0 0 20px', letterSpacing: '0.01em' }}>
        The Three Pillars.
      </h2>
      <RufousRule width={56} />
    </div>

    {/* Cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, padding: '0 80px 80px', flex: 1 }}>
      {pillarsData.map((p, i) => (
        <div key={i} style={{
          border: `1px solid ${HM.ink}`,
          boxShadow: `4px 4px 0 ${HM.ink}`,
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Card header */}
          <div style={{ background: p.color, padding: '20px 28px' }}>
            <div style={{ fontWeight: 100, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: HM.tuscany, marginBottom: 6 }}>
              Pillar · {p.num}
            </div>
            <div style={{ fontWeight: 700, fontSize: 40, color: HM.bone, letterSpacing: '0.01em', lineHeight: 1 }}>{p.name}</div>
          </div>
          {/* Card body */}
          <div style={{ padding: '20px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: HM.ink, margin: 0 }}>{p.body}</p>
            <div style={{ fontWeight: 100, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: HM.tuscany, marginTop: 16 }}>{p.tag}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, { PillarsSlide });
