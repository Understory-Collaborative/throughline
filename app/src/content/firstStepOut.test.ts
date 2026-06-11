import { describe, it, expect } from 'vitest'
import { assembleResult, emptyAnswers, questions, type Answers } from './firstStepOut'

function answers(overrides: Partial<Answers>): Answers {
  return { ...emptyAnswers, ...overrides }
}

describe('First Step Out question tree', () => {
  it('asks the four planned questions in order', () => {
    expect(questions.map((q) => q.id)).toEqual(['tdcj', 'housing', 'mail', 'extras'])
  })

  it('marks the mail and extras questions as multi-select', () => {
    const byId = Object.fromEntries(questions.map((q) => [q.id, q]))
    expect(byId.tdcj.multi).toBe(false)
    expect(byId.housing.multi).toBe(false)
    expect(byId.mail.multi).toBe(true)
    expect(byId.extras.multi).toBe(true)
  })

  it('follows house style, with no em dashes in any copy', () => {
    const allCopy = questions
      .flatMap((q) => [q.prompt, q.help, q.notice ?? '', ...q.options.flatMap((o) => [o.title, o.sub ?? ''])])
      .join(' ')
    expect(allCopy).not.toContain('—')
  })
})

describe('assembleResult', () => {
  it('treats TDCJ release paperwork as covering residency on its own', () => {
    const result = assembleResult(answers({ tdcj: 'yes' }))

    expect(result.have).toHaveLength(1)
    expect(result.have[0].title).toMatch(/TDCJ release or parole paperwork/i)
    expect(result.headline).toBe('You are closer than you think.')
  })

  it('accepts federal release paperwork', () => {
    const result = assembleResult(answers({ tdcj: 'federal' }))

    expect(result.have[0].title).toMatch(/federal release certificate/i)
  })

  it('counts a person\'s own place as a residency document they already have', () => {
    const result = assembleResult(answers({ tdcj: 'no', housing: 'own' }))

    expect(result.have.map((i) => i.title)).toContainEqual(
      expect.stringMatching(/lease, rental agreement, or mortgage/i),
    )
  })

  it('lists each piece of qualifying mail the person selected', () => {
    const result = assembleResult(
      answers({ tdcj: 'no', housing: 'own', mail: ['utility', 'bank', 'govt', 'paystub'] }),
    )

    const titles = result.have.map((i) => i.title)
    expect(titles).toContainEqual(expect.stringMatching(/utility or phone bill/i))
    expect(titles).toContainEqual(expect.stringMatching(/bank or credit card statement/i))
    expect(titles).toContainEqual(expect.stringMatching(/government agency letter/i))
    expect(titles).toContainEqual(expect.stringMatching(/pay stub/i))
  })

  it('includes the extra documents a person already holds', () => {
    const result = assembleResult(
      answers({ tdcj: 'no', housing: 'own', extras: ['voter', 'vehicle', 'military', 'insurance'] }),
    )

    const titles = result.have.map((i) => i.title)
    expect(titles).toContainEqual(expect.stringMatching(/voter registration/i))
    expect(titles).toContainEqual(expect.stringMatching(/vehicle or boat registration/i))
    expect(titles).toContainEqual(expect.stringMatching(/military or VA document/i))
    expect(titles).toContainEqual(expect.stringMatching(/insurance card or statement/i))
  })

  it('points a halfway house resident to a facility letter', () => {
    const result = assembleResult(answers({ tdcj: 'no', housing: 'halfway' }))

    expect(result.get.map((i) => i.title)).toContainEqual(
      expect.stringMatching(/letter from your reentry facility/i),
    )
  })

  it('offers a concrete next step when nothing qualifies yet', () => {
    const result = assembleResult(answers({ tdcj: 'no', housing: 'family' }))

    expect(result.have).toHaveLength(0)
    expect(result.headline).toBe('Here is your next step.')
    const getTitles = result.get.map((i) => i.title)
    expect(getTitles).toContainEqual(expect.stringMatching(/open a bank account/i))
    expect(getTitles).toContainEqual(expect.stringMatching(/medicaid or snap/i))
  })

  it('does not push fallback steps when the person already has a document', () => {
    const result = assembleResult(answers({ tdcj: 'no', housing: 'family', mail: ['utility'] }))

    expect(result.have).toHaveLength(1)
    expect(result.get).toHaveLength(0)
  })
})
