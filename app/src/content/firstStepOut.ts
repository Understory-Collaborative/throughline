/**
 * First Step Out content, as data.
 *
 * The question tree and the residency outcome logic live here so collaborators,
 * including formerly incarcerated reviewers, can read and correct the actual
 * words without touching the UI. See product/first-step-out/README.md.
 *
 * Texas DPS accepts one proof of residency. The job of this flow is to find the
 * proof a person most likely already has, or the quickest one to get. The rules
 * encoded below mirror the validated prototype. They still need a named owner to
 * confirm them against current Texas DPS requirements before launch.
 */

export type IconName =
  | 'id'
  | 'building'
  | 'home'
  | 'houseDoor'
  | 'users'
  | 'key'
  | 'help'
  | 'bolt'
  | 'bank'
  | 'mail'
  | 'document'
  | 'minusCircle'
  | 'car'
  | 'checkSquare'
  | 'star'
  | 'shield'
  | 'doc'
  | 'check'

export type QuestionId = 'tdcj' | 'housing' | 'mail' | 'extras'

export interface Option {
  value: string
  title: string
  sub?: string
  icon: IconName
  /**
   * Set on a "none of these" answer in a multi-select question. Choosing it
   * clears every other pick, and choosing any other option clears it. This
   * keeps a person out of the contradictory "I have documents and I have none"
   * state.
   */
  exclusive?: boolean
}

export interface Question {
  id: QuestionId
  stepLabel: string
  /** Progress through the flow when this question is on screen, 0 to 100. */
  progress: number
  prompt: string
  help: string
  /** Optional reassurance callout shown above the options. */
  notice?: string
  /** True when a person can pick more than one answer. */
  multi: boolean
  options: Option[]
}

/** Where the flow stores a person's picks. Single answers hold one value, */
/** multi answers hold a list. No names, no PII. */
export interface Answers {
  tdcj: string | null
  housing: string | null
  mail: string[]
  extras: string[]
}

export const emptyAnswers: Answers = {
  tdcj: null,
  housing: null,
  mail: [],
  extras: [],
}

export const questions: Question[] = [
  {
    id: 'tdcj',
    stepLabel: 'Getting started',
    progress: 0,
    prompt: 'Were you recently released from a Texas facility or are you currently on parole?',
    help: 'Your answer changes which documents will work for you. There is no wrong answer here.',
    notice:
      'If you were released from a TDCJ facility, your release paperwork may already cover this entire requirement.',
    multi: false,
    options: [
      { value: 'yes', title: 'Yes, released from a Texas state facility or on parole', icon: 'id' },
      {
        value: 'federal',
        title: 'Yes, but from a federal facility',
        sub: 'Federal Bureau of Prisons',
        icon: 'building',
      },
      { value: 'no', title: 'No, that does not apply to me', icon: 'home' },
    ],
  },
  {
    id: 'housing',
    stepLabel: 'Step 1 of 4',
    progress: 25,
    prompt: 'Where are you staying right now?',
    help: 'We will use this to figure out which documents are realistic for you to get quickly.',
    multi: false,
    options: [
      {
        value: 'halfway',
        title: 'A halfway house or reentry facility',
        sub: 'Including residential reentry centers',
        icon: 'houseDoor',
      },
      {
        value: 'family',
        title: 'With family or a friend',
        sub: "At someone else's address",
        icon: 'users',
      },
      {
        value: 'own',
        title: 'My own place',
        sub: 'Apartment, house, or room I rent or own',
        icon: 'key',
      },
      { value: 'unsure', title: 'Not sure yet', sub: 'Still figuring out my situation', icon: 'help' },
    ],
  },
  {
    id: 'mail',
    stepLabel: 'Step 2 of 4',
    progress: 50,
    prompt: 'Do you have any of these coming to your address?',
    help: 'Select everything that applies. These only count if they show your current Texas address and are dated within the last 6 months.',
    multi: true,
    options: [
      {
        value: 'utility',
        title: 'A utility or phone bill',
        sub: 'Electric, water, gas, internet, cable, or cell',
        icon: 'bolt',
      },
      {
        value: 'bank',
        title: 'A bank or credit card statement',
        sub: 'Checking, savings, or investment account',
        icon: 'bank',
      },
      {
        value: 'govt',
        title: 'A letter from a government office',
        sub: 'Federal, state, county, or city agency',
        icon: 'mail',
      },
      {
        value: 'paystub',
        title: 'A pay stub or paycheck',
        sub: 'From your current employer',
        icon: 'document',
      },
      {
        value: 'none',
        title: 'None of these right now',
        sub: 'That is okay. There are other options',
        icon: 'minusCircle',
        exclusive: true,
      },
    ],
  },
  {
    id: 'extras',
    stepLabel: 'Step 3 of 4',
    progress: 75,
    prompt: 'A couple more quick questions.',
    help: 'These help us check a few more options that might apply to you. Select all that apply.',
    multi: true,
    options: [
      {
        value: 'vehicle',
        title: 'I own a vehicle registered in Texas',
        sub: 'Car, truck, or boat with current registration',
        icon: 'car',
      },
      {
        value: 'voter',
        title: 'I am a registered Texas voter and have my card',
        icon: 'checkSquare',
      },
      {
        value: 'military',
        title: 'I served in the US military or receive VA benefits',
        icon: 'star',
      },
      {
        value: 'insurance',
        title: 'I have a current car, home, or renters insurance policy',
        icon: 'shield',
      },
      { value: 'none2', title: 'None of these apply to me', icon: 'minusCircle', exclusive: true },
    ],
  },
]

export interface ResultItem {
  kind: 'have' | 'get'
  icon: IconName
  title: string
  detail: string
}

export interface Result {
  headline: string
  subtext: string
  have: ResultItem[]
  get: ResultItem[]
}

/**
 * Turn a person's answers into a residency plan. Each "have" item is a document
 * they likely already hold. Each "get" item is a quick way to create one. They
 * only need one accepted document, so the result frames it that way.
 *
 * The order and the gates here match the validated prototype exactly.
 */
export function assembleResult(answers: Answers): Result {
  const { tdcj, housing } = answers
  const mail = answers.mail ?? []
  const extras = answers.extras ?? []

  const have: ResultItem[] = []
  const get: ResultItem[] = []

  if (tdcj === 'yes') {
    have.push({
      kind: 'have',
      icon: 'doc',
      title: 'Your TDCJ release or parole paperwork',
      detail:
        'This alone covers the residency requirement. Bring the original document to DPS. You will not need other proof.',
    })
  }
  if (tdcj === 'federal') {
    have.push({
      kind: 'have',
      icon: 'building',
      title: 'Your federal release certificate',
      detail: 'Federal release paperwork is accepted. Bring the original.',
    })
  }
  if (housing === 'own') {
    have.push({
      kind: 'have',
      icon: 'home',
      title: 'Your lease, rental agreement, or mortgage statement',
      detail: 'Any current document showing you live at a Texas address.',
    })
  }
  if (mail.includes('utility')) {
    have.push({
      kind: 'have',
      icon: 'bolt',
      title: 'Your utility or phone bill',
      detail: 'Dated within the last 6 months, showing your current Texas address.',
    })
  }
  if (mail.includes('bank')) {
    have.push({
      kind: 'have',
      icon: 'bank',
      title: 'Your bank or credit card statement',
      detail: 'Dated within the last 6 months, showing your current Texas address.',
    })
  }
  if (mail.includes('govt')) {
    have.push({
      kind: 'have',
      icon: 'mail',
      title: 'Your government agency letter',
      detail:
        'Any letter from a federal, state, county, or city office dated within the last 6 months.',
    })
  }
  if (mail.includes('paystub')) {
    have.push({
      kind: 'have',
      icon: 'document',
      title: 'Your pay stub',
      detail: 'A pre-printed paycheck or stub from your employer dated within the last 6 months.',
    })
  }
  if (extras.includes('voter')) {
    have.push({
      kind: 'have',
      icon: 'check',
      title: 'Your Texas voter registration card',
      detail: 'The physical card must be valid and unexpired.',
    })
  }
  if (extras.includes('vehicle')) {
    have.push({
      kind: 'have',
      icon: 'car',
      title: 'Your Texas vehicle or boat registration',
      detail: 'Current, unexpired registration or title in your name.',
    })
  }
  if (extras.includes('military')) {
    have.push({
      kind: 'have',
      icon: 'star',
      title: 'Your military or VA document',
      detail: 'Any current document from the US military or VA showing your Texas address.',
    })
  }
  if (extras.includes('insurance')) {
    have.push({
      kind: 'have',
      icon: 'shield',
      title: 'Your insurance card or statement',
      detail: 'Current car, home, or renters insurance showing your Texas address.',
    })
  }

  if (housing === 'halfway') {
    get.push({
      kind: 'get',
      icon: 'home',
      title: 'A letter from your reentry facility',
      detail:
        'Ask your case manager for a letter on facility letterhead that confirms you are a current resident. Most can provide this the same day.',
    })
  }
  if (housing === 'family' || housing === 'unsure' || mail.includes('none')) {
    if (have.length === 0) {
      get.push({
        kind: 'get',
        icon: 'bank',
        title: 'Open a bank account and get a statement sent to your address',
        detail:
          'Many banks offer free second-chance checking accounts with no credit check. Once it is open, ask for a paper statement at your address. It counts within 6 months.',
      })
      get.push({
        kind: 'get',
        icon: 'mail',
        title: 'Apply for Medicaid or SNAP benefits',
        detail:
          'Once you enroll, letters from these agencies come to your address and count as government mail. Apply at Texas HHS online or in person at your county office.',
      })
    }
  }

  const headline =
    have.length > 0 ? 'You are closer than you think.' : 'Here is your next step.'
  const subtext =
    have.length > 0
      ? 'You already have what you need. You only need one item from the list below.'
      : 'You do not have a residency document yet, and these are straightforward to get. You only need one.'

  return { headline, subtext, have, get }
}
