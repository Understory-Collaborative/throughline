import { describe, it, expect } from 'vitest'
import {
  assembleResult,
  emptyAnswers,
  questions,
  type Answers,
  type CategoryId,
  type Result,
} from './firstStepOut'

function answers(overrides: Partial<Answers>): Answers {
  return { ...emptyAnswers, ...overrides }
}

function category(result: Result, id: CategoryId) {
  const found = result.categories.find((c) => c.id === id)
  if (!found) throw new Error(`missing category ${id}`)
  return found
}

describe('First Step Out question tree', () => {
  it('asks the planned questions in order', () => {
    expect(questions.map((q) => q.id)).toEqual([
      'tdcj',
      'birth',
      'ssn',
      'housing',
      'mail',
      'extras',
    ])
  })

  it('marks the mail and extras questions as multi-select', () => {
    const byId = Object.fromEntries(questions.map((q) => [q.id, q]))
    expect(byId.tdcj.multi).toBe(false)
    expect(byId.birth.multi).toBe(false)
    expect(byId.ssn.multi).toBe(false)
    expect(byId.housing.multi).toBe(false)
    expect(byId.mail.multi).toBe(true)
    expect(byId.extras.multi).toBe(true)
  })

  it('follows house style, with no em dashes in any question copy', () => {
    const allCopy = questions
      .flatMap((q) => [
        q.prompt,
        q.help,
        q.notice ?? '',
        ...q.options.flatMap((o) => [o.title, o.sub ?? '']),
      ])
      .join(' ')
    expect(allCopy).not.toContain('—')
  })
})

describe('assembleResult: three DPS areas', () => {
  it('returns citizenship, identity, and residency, in that order', () => {
    const result = assembleResult(emptyAnswers)
    expect(result.categories.map((c) => c.id)).toEqual(['citizenship', 'identity', 'residency'])
  })

  it('follows house style, with no em dashes in any result copy', () => {
    const all: string[] = []
    for (const ans of [
      emptyAnswers,
      answers({ tdcj: 'parole', birth: 'birth', ssn: 'yes', housing: 'own', mail: ['utility'] }),
      answers({ tdcj: 'no', birth: 'neither', ssn: 'no', housing: 'halfway' }),
      answers({ tdcj: 'discharged', birth: 'passport', ssn: 'yes' }),
    ]) {
      const r = assembleResult(ans)
      all.push(r.headline, r.subtext, r.nextStep.title, r.nextStep.detail)
      for (const c of r.categories) {
        all.push(c.title, c.rule)
        for (const d of [...c.have, ...c.get]) all.push(d.title, d.detail)
      }
    }
    expect(all.join(' ')).not.toContain('—')
  })
})

describe('assembleResult: citizenship', () => {
  it('is met by a passport', () => {
    const result = assembleResult(answers({ birth: 'passport' }))
    expect(category(result, 'citizenship').met).toBe(true)
  })

  it('is met by a birth certificate', () => {
    const result = assembleResult(answers({ birth: 'birth' }))
    expect(category(result, 'citizenship').met).toBe(true)
  })

  it('points to ordering a birth certificate when neither is held', () => {
    const result = assembleResult(answers({ birth: 'neither' }))
    const cit = category(result, 'citizenship')
    expect(cit.met).toBe(false)
    expect(cit.get.map((d) => d.title)).toContainEqual(expect.stringMatching(/order your birth certificate/i))
  })
})

describe('assembleResult: identity', () => {
  it('is met by a passport on its own', () => {
    const result = assembleResult(answers({ birth: 'passport' }))
    expect(category(result, 'identity').met).toBe(true)
  })

  it('is not met by a birth certificate alone', () => {
    const result = assembleResult(answers({ birth: 'birth' }))
    expect(category(result, 'identity').met).toBe(false)
  })

  it('is met by a birth certificate plus two smaller papers', () => {
    const result = assembleResult(answers({ birth: 'birth', tdcj: 'parole', ssn: 'yes' }))
    expect(category(result, 'identity').met).toBe(true)
  })

  it('lists the parole certificate as proof of identity for someone on parole', () => {
    const result = assembleResult(answers({ tdcj: 'parole' }))
    expect(category(result, 'identity').have.map((d) => d.title)).toContainEqual(
      expect.stringMatching(/TDCJ parole certificate/i),
    )
  })

  it('lists release papers as proof of identity for someone fully discharged', () => {
    const result = assembleResult(answers({ tdcj: 'discharged' }))
    expect(category(result, 'identity').have.map((d) => d.title)).toContainEqual(
      expect.stringMatching(/TDCJ release papers/i),
    )
  })
})

describe('assembleResult: residency', () => {
  it('needs two papers, so one is not enough', () => {
    const result = assembleResult(answers({ housing: 'own' }))
    const res = category(result, 'residency')
    expect(res.have).toHaveLength(1)
    expect(res.met).toBe(false)
  })

  it('is met with two qualifying papers', () => {
    const result = assembleResult(answers({ housing: 'own', mail: ['utility'] }))
    expect(category(result, 'residency').met).toBe(true)
  })

  it('counts TDCJ paperwork toward residency', () => {
    const result = assembleResult(answers({ tdcj: 'parole' }))
    expect(category(result, 'residency').have.map((d) => d.title)).toContainEqual(
      expect.stringMatching(/TDCJ parole certificate/i),
    )
  })

  it('points a halfway house resident to a facility letter when short', () => {
    const result = assembleResult(answers({ housing: 'halfway' }))
    expect(category(result, 'residency').get.map((d) => d.title)).toContainEqual(
      expect.stringMatching(/halfway house for a letter/i),
    )
  })

  it('offers concrete ways to make address mail when short', () => {
    const result = assembleResult(answers({ housing: 'family' }))
    const titles = category(result, 'residency').get.map((d) => d.title)
    expect(titles).toContainEqual(expect.stringMatching(/open a free checking account/i))
    expect(titles).toContainEqual(expect.stringMatching(/medicaid or snap/i))
  })
})

describe('assembleResult: the single next step', () => {
  it('leads with the birth certificate when citizenship is missing', () => {
    const result = assembleResult(answers({ tdcj: 'parole', ssn: 'yes', birth: 'neither' }))
    expect(result.nextStep.title).toMatch(/order your birth certificate/i)
  })

  it('sends a fully covered person to DPS', () => {
    const result = assembleResult(
      answers({ birth: 'passport', tdcj: 'parole', housing: 'own', mail: ['utility'] }),
    )
    expect(result.categories.every((c) => c.met)).toBe(true)
    expect(result.headline).toBe('You have what you need.')
    expect(result.nextStep.title).toMatch(/take your papers to dps/i)
  })
})
