/**
 * First Step Out content, as data.
 *
 * The question tree and the document logic live here so collaborators,
 * including formerly incarcerated reviewers, can read and correct the actual
 * words without touching the UI. See product/first-step-out/README.md.
 *
 * Texas DPS asks for proof in three areas to get a REAL ID. You need proof you
 * are a U.S. citizen, proof of who you are, and proof of where you live. This
 * flow finds the papers a person most likely already holds, then names the
 * quickest way to fill any gap. The rules below follow the Texas DPS REAL ID
 * checklist. They still need a named owner to confirm them against current
 * Texas DPS requirements before launch.
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

export type QuestionId =
  | 'tdcj'
  | 'birth'
  | 'passportValid'
  | 'birthOriginal'
  | 'ssn'
  | 'housing'
  | 'mail'
  | 'extras'

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
  /**
   * When set, the question only shows if this returns true for the current
   * answers. Used for follow-up questions that branch off an earlier pick, like
   * checking a passport's date only after a person says they have one.
   */
  showIf?: (answers: Answers) => boolean
  options: Option[]
}

/** Where the flow stores a person's picks. Single answers hold one value, */
/** multi answers hold a list. No names, no PII. */
export interface Answers {
  tdcj: string | null
  birth: string | null
  passportValid: string | null
  birthOriginal: string | null
  ssn: string | null
  housing: string | null
  mail: string[]
  extras: string[]
}

export const emptyAnswers: Answers = {
  tdcj: null,
  birth: null,
  passportValid: null,
  birthOriginal: null,
  ssn: null,
  housing: null,
  mail: [],
  extras: [],
}

export const questions: Question[] = [
  {
    id: 'tdcj',
    stepLabel: 'Getting started',
    progress: 0,
    prompt: 'Are you on parole, or are you finished with your sentence?',
    help: 'Your answer tells us which release papers you have. They count for more than one thing on your list. First Step Out covers Texas for now.',
    notice:
      'Whether you are on parole or have finished your sentence, your Texas Department of Criminal Justice papers count toward proving who you are and where you live. Hold on to them.',
    multi: false,
    options: [
      {
        value: 'parole',
        title: 'I am on parole or supervision',
        sub: 'Still checking in with a parole officer',
        icon: 'id',
      },
      {
        value: 'discharged',
        title: 'I am fully done, free and clear',
        sub: 'My sentence is finished',
        icon: 'check',
      },
      {
        value: 'no',
        title: 'Neither one fits me',
        sub: 'I was not recently in a Texas prison or jail',
        icon: 'home',
      },
    ],
  },
  {
    id: 'birth',
    stepLabel: 'Step 1 of 5',
    progress: 16,
    prompt: 'Do you have a hard copy of your birth certificate or a U.S. passport?',
    help: 'Pick the one you have. If you have both, choose your birth certificate. It is the strongest proof of who you are.',
    multi: false,
    options: [
      {
        value: 'passport',
        title: 'Yes, a U.S. passport',
        sub: 'Book or card, not expired',
        icon: 'doc',
      },
      {
        value: 'birth',
        title: 'Yes, my birth certificate',
        sub: 'A certified copy, not a photocopy',
        icon: 'document',
      },
      {
        value: 'neither',
        title: 'I do not have either one',
        sub: 'That is okay. We will show you how to get one',
        icon: 'minusCircle',
      },
    ],
  },
  {
    id: 'passportValid',
    stepLabel: 'Step 1 of 5',
    progress: 25,
    prompt: 'Check the expiration date. Is your passport still valid?',
    help: 'A passport only counts if it has not expired. The date is inside the cover of the book, or on the front of the card.',
    multi: false,
    showIf: (a) => a.birth === 'passport',
    options: [
      {
        value: 'yes',
        title: 'Yes, it is still valid',
        sub: 'The expiration date has not passed',
        icon: 'check',
      },
      {
        value: 'expired',
        title: 'No, it has expired',
        sub: 'That is okay. We will show you another way',
        icon: 'minusCircle',
      },
    ],
  },
  {
    id: 'birthOriginal',
    stepLabel: 'Step 1 of 5',
    progress: 25,
    prompt: 'Is your birth certificate an original or a copy?',
    help: 'It counts when it has an official government seal, a signature from the local or state registrar, and a file or certificate number. A plain photocopy will not work.',
    multi: false,
    showIf: (a) => a.birth === 'birth',
    options: [
      {
        value: 'original',
        title: 'It is an original or certified copy',
        sub: 'It has the seal, the signature, and a file number',
        icon: 'document',
      },
      {
        value: 'copy',
        title: 'No, I think it is a photocopy',
        sub: 'That is okay. We will show you how to get a certified one',
        icon: 'minusCircle',
      },
    ],
  },
  {
    id: 'ssn',
    stepLabel: 'Step 2 of 5',
    progress: 33,
    prompt: 'Do you have your Social Security card?',
    help: 'Your Social Security number proves who you are, and you need it to get a state ID. The real card also helps prove who you are.',
    multi: false,
    options: [
      { value: 'yes', title: 'Yes, I have the card', icon: 'id' },
      {
        value: 'no',
        title: 'No, I do not have it',
        sub: 'No problem. We will include how to order a new one at the end',
        icon: 'minusCircle',
      },
    ],
  },
  {
    id: 'housing',
    stepLabel: 'Step 3 of 5',
    progress: 50,
    prompt: 'Where are you staying right now?',
    help: 'This helps us figure out which papers you can use for your application.',
    multi: false,
    options: [
      {
        value: 'halfway',
        title: 'A halfway house or reentry center',
        sub: 'Including residential reentry centers',
        icon: 'houseDoor',
      },
      {
        value: 'family',
        title: 'With family or a friend',
        sub: "At someone else's home, like a house or rental",
        icon: 'users',
      },
      {
        value: 'own',
        title: 'My own place',
        sub: 'Apartment, house, or room I rent',
        icon: 'key',
      },
      { value: 'unsure', title: 'Not sure yet', sub: 'Still figuring out my situation', icon: 'help' },
    ],
  },
  {
    id: 'mail',
    stepLabel: 'Step 4 of 5',
    progress: 66,
    prompt: 'In the last 6 months, has any of this come to you at your current address?',
    help: 'Only pick the ones that have a Texas address, have your name on them, and are less than 6 months old.',
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
        sub: 'From a federal, state, county, or city agency',
        icon: 'mail',
      },
      {
        value: 'paystub',
        title: 'A pay stub or paycheck',
        sub: 'From your current job',
        icon: 'document',
      },
      {
        value: 'none',
        title: 'None of these right now',
        sub: 'That is okay. We can work with what you have',
        icon: 'minusCircle',
        exclusive: true,
      },
    ],
  },
  {
    id: 'extras',
    stepLabel: 'Step 5 of 5',
    progress: 83,
    prompt: 'Last question. Pick all that apply to you.',
    help: 'These help us check for other papers you might be able to use for your application.',
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
        title: 'I am a registered Texas voter and have a Texas Election Identification Certificate',
        icon: 'checkSquare',
      },
      {
        value: 'military',
        title: 'I served in the U.S. military or get VA benefits',
        icon: 'star',
      },
      {
        value: 'insurance',
        title: 'I have current car, home, or renters insurance',
        icon: 'shield',
      },
      { value: 'none2', title: 'None of these apply to me', icon: 'minusCircle', exclusive: true },
    ],
  },
]

/**
 * The questions to show for a given set of answers. Follow-up questions only
 * appear once their branch applies, so a person who has no passport never sees
 * the passport date question. Everything else stays in its written order.
 */
export function visibleQuestions(answers: Answers): Question[] {
  return questions.filter((q) => !q.showIf || q.showIf(answers))
}

export interface ResultDoc {
  icon: IconName
  title: string
  detail: string
  /**
   * A short strength label, like "Strong on its own" or "Supporting paper". Used
   * where one paper alone may not be enough, so a person can see at a glance
   * which papers carry the most weight.
   */
  tag?: string
  /** An outside page that helps with this step. Opens in a new tab. */
  href?: string
  /** The plain words for the link, like "Apply at YourTexasBenefits.com". */
  linkLabel?: string
}

export type CategoryId = 'citizenship' | 'identity' | 'residency'

/**
 * One spot in an area's "hand". A filled slot holds a paper the person has. An
 * empty slot is a placeholder that shows, at a glance, that a paper is still
 * needed there. This lets the result read like a card hand instead of a wall of
 * text.
 */
export interface Slot {
  filled: boolean
  /** The paper held here, when the slot is filled. */
  doc?: ResultDoc
  /** A short label for what goes here, when the slot is empty. */
  needLabel?: string
  /** Papers that can fill this slot, shown when a person taps the empty space. */
  options?: AcceptedDocs
}

/**
 * The papers DPS accepts for an area, in plain words, sorted by how common they
 * are for this audience. We show the common set first, then let a person open
 * "more" and the full list. This keeps a long government list from landing on a
 * stressed reader all at once.
 */
export interface AcceptedDocs {
  /** The most common papers, shown right away. */
  common: string[]
  /** A second set, behind "What else could I use?". */
  more: string[]
  /** Everything else, behind "Show me the full list". */
  rest: string[]
}

export const acceptedByCategory: Record<CategoryId, AcceptedDocs> = {
  citizenship: {
    common: [
      'A U.S. passport, book or card',
      'Your birth certificate, the real one or a certified copy from the state. A Puerto Rico copy has to be issued on or after July 1, 2010',
    ],
    more: [
      'A Certificate of Naturalization or Certificate of Citizenship',
      'A Consular Report of Birth Abroad, for citizens born outside the country',
    ],
    rest: [
      'A Permanent Resident Card, also called a green card',
      'An Employment Authorization Card',
      'Another current immigration document from Homeland Security',
    ],
  },
  identity: {
    common: [
      'A U.S. passport, which counts on its own',
      'Your birth certificate, with 2 supporting papers',
      'A Texas driver license or ID, even if expired up to 2 years',
    ],
    more: [
      'Your Social Security card',
      'Your TDCJ release or parole papers',
      'A Texas voter registration card',
      'A Texas vehicle or boat registration',
    ],
    rest: [
      'A Medicare or Medicaid card',
      'A military ID or DD-214',
      'A marriage license or divorce decree',
      'School or immunization records',
      'A Selective Service card',
      'An out-of-state driver license, current or expired up to 2 years',
      'A foreign passport',
    ],
  },
  residency: {
    common: [
      'A lease, rental agreement, or mortgage statement',
      'A utility or phone bill from the last 6 months',
      'Your TDCJ release or parole papers',
    ],
    more: [
      'A bank or credit card statement from the last 6 months',
      'A pay stub from the last 6 months',
      'Mail from a government office from the last 6 months',
      'A Texas vehicle registration or title',
      'A Texas voter registration card',
    ],
    rest: [
      'Car, home, or renters insurance',
      'A Texas high school or college transcript',
      'A W-2, 1099, or 1098 tax form',
      'Medical bills or a benefits letter',
      'A Texas hunting or fishing license',
      'Current military or VA papers with your address',
    ],
  },
}

export interface Category {
  id: CategoryId
  title: string
  /** Plain-language version of how many papers this area needs. */
  rule: string
  /** True when the person likely already has enough for this area. */
  met: boolean
  /**
   * One plain sentence about where the person stands here and what would
   * finish it. This carries the weight when "have" and "need" are not a simple
   * count, like the identity rule.
   */
  summary: string
  /** Papers the person likely already holds. */
  have: ResultDoc[]
  /** Quick ways to fill the gap when they are short. */
  get: ResultDoc[]
  /** The hand for this area: filled slots and empty placeholders. */
  slots: Slot[]
  /** The full menu of papers DPS accepts for this area, plain and tiered. */
  accepted: AcceptedDocs
}

/** Build a row of slots that just needs a count, filling from what is held. */
function countSlots(
  have: ResultDoc[],
  need: number,
  needLabel: string,
  options: AcceptedDocs,
): Slot[] {
  return Array.from({ length: need }, (_, i) =>
    i < have.length ? { filled: true, doc: have[i] } : { filled: false, needLabel, options },
  )
}

export interface NextStep {
  title: string
  detail: string
  /** An outside page that helps with this step. Opens in a new tab. */
  href?: string
  /** The plain words for the link. */
  linkLabel?: string
}

export interface Result {
  headline: string
  subtext: string
  categories: Category[]
  /** The single clearest thing to do next. */
  nextStep: NextStep
}

/**
 * Turn a person's answers into a three-part plan that mirrors what Texas DPS
 * asks for: proof of citizenship, proof of identity, and proof of residency.
 * Each area lists the papers a person likely already holds and the quickest way
 * to fill a gap. The next step names the single most useful move.
 *
 * DPS identity rule, in plain terms: one strong paper (a passport), or two
 * mid-level papers, or one mid-level paper plus two supporting ones. We classify
 * each document by tier and check the combination.
 */
export function assembleResult(answers: Answers): Result {
  const { tdcj, birth, ssn, housing } = answers
  const mail = answers.mail ?? []
  const extras = answers.extras ?? []

  // A passport only counts when it has not expired. A birth certificate only
  // counts when it is an original or certified copy, not a plain photocopy. When
  // a follow-up was not asked, we treat the paper as usable rather than block it.
  const hasPassport = birth === 'passport' && answers.passportValid !== 'expired'
  const hasBirthCert = birth === 'birth' && answers.birthOriginal !== 'copy'

  // ---- Proof of citizenship (need one) ----
  const citHave: ResultDoc[] = []
  if (hasPassport) {
    citHave.push({
      icon: 'doc',
      title: 'Your U.S. passport',
      detail: 'A passport book or card that has not expired. This one paper also proves who you are.',
    })
  }
  if (hasBirthCert) {
    citHave.push({
      icon: 'document',
      title: 'Your birth certificate',
      detail:
        'The real one or a certified copy from the state. A photocopy will not work. If yours is from Puerto Rico, it has to be a copy issued on or after July 1, 2010. Older Puerto Rico ones no longer count.',
    })
  }
  const citizenshipMet = citHave.length >= 1
  const citGet: ResultDoc[] = []
  if (!citizenshipMet) {
    citGet.push({
      icon: 'document',
      title: 'Order your birth certificate',
      detail:
        'Born in Texas? Order it online or by mail. Born in another state? Order it from that state. Born in Puerto Rico? Order a new copy, since ones issued before July 1, 2010 no longer count. It usually costs about 20 dollars and is the most useful paper to have.',
      href: 'https://ovra.txapps.texas.gov/ovra/order-birth-certificate',
      linkLabel: 'Order online at Texas.gov',
    })
  }

  // ---- Proof of identity ----
  // Tiers from the DPS list. One primary, or two secondary, or one secondary
  // plus two supporting, is enough.
  const idHave: ResultDoc[] = []
  let primary = 0
  let secondary = 0
  let supporting = 0

  if (hasPassport) {
    idHave.push({
      icon: 'doc',
      title: 'Your U.S. passport',
      detail: 'A passport proves who you are all by itself. You need nothing else here.',
      tag: 'Strong on its own',
    })
    primary += 1
  }
  if (hasBirthCert) {
    idHave.push({
      icon: 'document',
      title: 'Your birth certificate',
      detail: 'A key paper. Bring it with 2 supporting papers and you are set.',
      tag: 'Key paper',
    })
    secondary += 1
  }
  if (tdcj === 'parole') {
    idHave.push({
      icon: 'doc',
      title: 'Your TDCJ parole certificate',
      detail: 'Your parole or mandatory release certificate counts as 1 supporting paper.',
      tag: 'Supporting paper',
    })
    supporting += 1
  }
  if (tdcj === 'discharged') {
    idHave.push({
      icon: 'doc',
      title: 'Your TDCJ release papers',
      detail: 'Your release or discharge papers count as 1 supporting paper.',
      tag: 'Supporting paper',
    })
    supporting += 1
  }
  if (ssn === 'yes') {
    idHave.push({
      icon: 'id',
      title: 'Your Social Security card',
      detail: 'The real card counts as 1 supporting paper.',
      tag: 'Supporting paper',
    })
    supporting += 1
  }
  if (extras.includes('voter')) {
    idHave.push({
      icon: 'check',
      title: 'Your Texas voter registration card',
      detail: 'Counts as 1 supporting paper.',
      tag: 'Supporting paper',
    })
    supporting += 1
  }
  if (extras.includes('vehicle')) {
    idHave.push({
      icon: 'car',
      title: 'Your Texas vehicle or boat registration',
      detail: 'Counts as 1 supporting paper.',
      tag: 'Supporting paper',
    })
    supporting += 1
  }
  if (extras.includes('military')) {
    idHave.push({
      icon: 'star',
      title: 'Your military or VA ID',
      detail: 'Counts as 1 supporting paper.',
      tag: 'Supporting paper',
    })
    supporting += 1
  }

  const identityMet = primary >= 1 || secondary >= 2 || (secondary >= 1 && supporting >= 2)
  const idGet: ResultDoc[] = []

  // The identity rule is not a simple count, so spell out where the person
  // stands and the one move that finishes it.
  let identitySummary: string
  if (primary >= 1) {
    identitySummary = 'Your passport covers this on its own. You are set here.'
  } else if (secondary >= 1 && supporting >= 2) {
    identitySummary = 'Your birth certificate plus your supporting papers cover this. You are set here.'
  } else if (secondary >= 1) {
    const need = 2 - supporting
    identitySummary =
      need === 1
        ? 'You have your birth certificate and 1 supporting paper. Bring 1 more supporting paper and you are set.'
        : 'You have your birth certificate. Bring 2 supporting papers, like your Social Security card and a voter card, and you are set.'
  } else if (supporting >= 2) {
    identitySummary =
      'Your supporting papers count, but they are not enough by themselves. Bring your birth certificate or a U.S. passport and you are set.'
  } else if (supporting === 1) {
    identitySummary =
      'You have 1 supporting paper. Bring your birth certificate or a U.S. passport to finish this.'
  } else {
    identitySummary =
      'Bring a U.S. passport on its own, or your birth certificate plus 2 supporting papers.'
  }

  if (!identityMet && ssn !== 'yes') {
    idGet.push({
      icon: 'id',
      title: 'Order a new Social Security card',
      detail:
        'It is free from the Social Security Administration. It counts as 1 supporting paper toward proving who you are.',
    })
  }

  // ---- Proof of residency (need two) ----
  const resHave: ResultDoc[] = []
  if (tdcj === 'parole') {
    resHave.push({
      icon: 'doc',
      title: 'Your TDCJ parole certificate',
      detail: 'Your parole or mandatory release certificate also shows where you live. It counts here too.',
    })
  }
  if (tdcj === 'discharged') {
    resHave.push({
      icon: 'doc',
      title: 'Your TDCJ release papers',
      detail: 'Your release or discharge papers also show where you live. They count here too.',
    })
  }
  if (housing === 'own') {
    resHave.push({
      icon: 'home',
      title: 'Your lease or mortgage paper',
      detail: 'Any current paper that shows you live at a Texas address.',
    })
  }
  if (mail.includes('utility')) {
    resHave.push({
      icon: 'bolt',
      title: 'Your utility or phone bill',
      detail: 'From the last 6 months, showing your Texas address.',
    })
  }
  if (mail.includes('bank')) {
    resHave.push({
      icon: 'bank',
      title: 'Your bank or credit card statement',
      detail: 'From the last 6 months, showing your Texas address.',
    })
  }
  if (mail.includes('govt')) {
    resHave.push({
      icon: 'mail',
      title: 'Your letter from a government office',
      detail: 'Any letter from a federal, state, county, or city office from the last 6 months.',
    })
  }
  if (mail.includes('paystub')) {
    resHave.push({
      icon: 'document',
      title: 'Your pay stub',
      detail: 'A printed paycheck or stub from your job from the last 6 months.',
    })
  }
  if (extras.includes('vehicle')) {
    resHave.push({
      icon: 'car',
      title: 'Your Texas vehicle or boat registration',
      detail: 'Current registration in your name. It works for where you live too.',
    })
  }
  if (extras.includes('voter')) {
    resHave.push({
      icon: 'check',
      title: 'Your Texas voter registration card',
      detail: 'It works for where you live too.',
    })
  }
  if (extras.includes('military')) {
    resHave.push({
      icon: 'star',
      title: 'Your military or VA paper',
      detail: 'A current paper from the U.S. military or VA that shows your Texas address.',
    })
  }
  if (extras.includes('insurance')) {
    resHave.push({
      icon: 'shield',
      title: 'Your insurance paper',
      detail: 'Current car, home, or renters insurance that shows your Texas address.',
    })
  }

  const citizenshipSummary = citizenshipMet
    ? 'You are set here.'
    : 'You need 1 of these. Most people use a birth certificate.'

  const residencyCount = resHave.length
  const residencyBase =
    residencyCount >= 2
      ? 'You have enough here. Bring any 2 of these.'
      : residencyCount === 1
        ? 'You have 1. You need 1 more paper that shows your Texas address.'
        : 'You need 2 papers that show your Texas address.'
  const residencySummary = `${residencyBase} Each one has to be in your name.`

  const residencyMet = resHave.length >= 2
  const resGet: ResultDoc[] = []
  if (!residencyMet) {
    if (housing === 'halfway') {
      resGet.push({
        icon: 'home',
        title: 'Ask your halfway house for a letter',
        detail:
          'Ask your case manager for a letter on the facility letterhead that says you live there now. Most can hand it to you the same day.',
      })
    }
    if (housing === 'family') {
      resGet.push({
        icon: 'mail',
        title: 'Get a paper that shows your own name',
        detail:
          "Staying with family or a friend? The papers you bring have to be in your name. A bill in someone else's name will not count for you, even if you live there. The steps below get mail sent in your name.",
      })
    }
    resGet.push({
      icon: 'bank',
      title: 'Open a free checking account',
      detail:
        'Many banks offer second chance accounts with no credit check. Ask for a paper statement mailed to your address. It counts after it arrives.',
    })
    resGet.push({
      icon: 'mail',
      title: 'Apply for Medicaid or SNAP',
      detail:
        'When you sign up, letters from these offices come to your address and count. You can apply online or at your county office.',
      href: 'https://yourtexasbenefits.com/Learn/Home',
      linkLabel: 'Apply at YourTexasBenefits.com',
    })
  }

  // ---- Slots: a card hand per area, filled from what the person has ----
  const citSlots = countSlots(citHave, 1, 'You still need 1 of these', acceptedByCategory.citizenship)
  const resSlots = countSlots(resHave, 2, 'You still need 1 of these', acceptedByCategory.residency)

  // Identity is not a simple count. A passport stands alone. Otherwise the hand
  // is a key paper plus 2 supporting papers, and each empty slot offers the right
  // set of papers to fill it.
  const idIdentity = acceptedByCategory.identity
  const keyOptions: AcceptedDocs = { common: idIdentity.common, more: [], rest: [] }
  const supportingOptions: AcceptedDocs = { common: idIdentity.more, more: idIdentity.rest, rest: [] }

  const passportDoc = idHave.find((d) => d.tag === 'Strong on its own')
  const birthDoc = idHave.find((d) => d.tag === 'Key paper')
  const supportingDocs = idHave.filter((d) => d.tag === 'Supporting paper')
  const idSlots: Slot[] = passportDoc
    ? [{ filled: true, doc: passportDoc }]
    : [
        birthDoc
          ? { filled: true, doc: birthDoc }
          : { filled: false, needLabel: 'You still need a main paper', options: keyOptions },
        supportingDocs[0]
          ? { filled: true, doc: supportingDocs[0] }
          : { filled: false, needLabel: 'You still need a supporting paper', options: supportingOptions },
        supportingDocs[1]
          ? { filled: true, doc: supportingDocs[1] }
          : { filled: false, needLabel: 'You still need a supporting paper', options: supportingOptions },
      ]

  const categories: Category[] = [
    {
      id: 'citizenship',
      title: 'Proof you are a U.S. citizen',
      rule: 'Bring 1 of these.',
      met: citizenshipMet,
      summary: citizenshipSummary,
      have: citHave,
      get: citGet,
      slots: citSlots,
      accepted: acceptedByCategory.citizenship,
    },
    {
      id: 'identity',
      title: 'Proof of who you are',
      rule: 'Bring a U.S. passport on its own, or your birth certificate plus 2 supporting papers.',
      met: identityMet,
      summary: identitySummary,
      have: idHave,
      get: idGet,
      slots: idSlots,
      accepted: acceptedByCategory.identity,
    },
    {
      id: 'residency',
      title: 'Proof of where you live',
      rule: 'Bring 2 of these.',
      met: residencyMet,
      summary: residencySummary,
      have: resHave,
      get: resGet,
      slots: resSlots,
      accepted: acceptedByCategory.residency,
    },
  ]

  let nextStep: NextStep
  if (!citizenshipMet) {
    nextStep = {
      title: 'Order your birth certificate',
      detail:
        'This is the one paper that helps the most. It proves you are a U.S. citizen and helps prove who you are. Born in Texas? Order it online. Born somewhere else? Order it from that state.',
      href: 'https://ovra.txapps.texas.gov/ovra/order-birth-certificate',
      linkLabel: 'Order online at Texas.gov',
    }
  } else if (!identityMet) {
    nextStep =
      ssn !== 'yes'
        ? {
            title: 'Order a new Social Security card',
            detail:
              'It is free. With your birth certificate and one more small paper, you have enough to prove who you are. Then take your papers to DPS.',
          }
        : {
            title: 'Bring one more ID paper',
            detail:
              'With your birth certificate, your Social Security card, and one more small paper like a voter card or Texas vehicle registration, you have enough. Then take your papers to DPS.',
          }
  } else if (!residencyMet) {
    nextStep =
      housing === 'halfway'
        ? {
            title: 'Ask your halfway house for a proof of address letter',
            detail:
              'You have most of what you need. One letter on facility letterhead fills the last gap. Then take your papers to DPS.',
          }
        : {
            title: 'Get one more proof of where you live',
            detail:
              'You need 2 papers that show your Texas address. The fastest way is to open a free checking account or apply for Medicaid or SNAP, then use the mail they send. Then take your papers to DPS.',
          }
  } else {
    nextStep = {
      title: 'Take your papers to DPS',
      detail:
        'You have what you need. Bring the papers above to your nearest Texas DPS office. Call first or check the website, since some offices ask you to book a time.',
    }
  }

  const allMet = citizenshipMet && identityMet && residencyMet
  const headline = allMet ? 'You have what you need.' : 'Here is your plan.'
  const subtext = allMet
    ? 'Bring the papers below to your nearest DPS office. You are ready.'
    : 'Based on your answers, here are the papers you can use, the ones you still need, and how to get some of them. You do not upload anything. This is a checklist to gather and bring to DPS.'

  return { headline, subtext, categories, nextStep }
}
