import type { Category, Result } from '../content/firstStepOut'

/**
 * The printable version of a person's plan.
 *
 * It is hidden on screen and shown only when printing or saving as PDF, so the
 * paper version stays clean and easy to read. Plain ink on paper, one purpose
 * per line, with a link to come back. The audience often prints at a library or
 * a friend's computer, so this has to read well on a single cheap printout.
 */

function PrintCategory({ category, index }: { category: Category; index: number }) {
  const docs = category.met ? category.have : [...category.have, ...category.get]

  return (
    <section className="break-inside-avoid border-t border-black/40 pt-3">
      <h2 className="text-base font-bold">
        {index}. {category.title}
      </h2>
      <p className="text-sm">{category.rule}</p>
      <p className="text-sm font-semibold">{category.summary}</p>
      <ul className="mt-2 space-y-1.5">
        {docs.map((doc) => (
          <li key={doc.title} className="flex gap-2 text-sm">
            <span aria-hidden="true" className="font-bold">
              &#9744;
            </span>
            <span>
              <span className="font-semibold">
                {doc.title}
                {doc.tag ? ` (${doc.tag})` : ''}.
              </span>{' '}
              {doc.detail}
              {doc.href ? ` ${doc.href}` : ''}
            </span>
          </li>
        ))}
        {docs.length === 0 && <li className="text-sm">No options recorded.</li>}
      </ul>
    </section>
  )
}

export function PrintableSheet({ result, returnUrl }: { result: Result; returnUrl: string }) {
  return (
    <div className="hidden text-black print:block">
      <header className="border-b-2 border-black pb-3">
        <p className="text-sm font-bold uppercase tracking-widest">Throughline · First Step Out</p>
        <h1 className="mt-1 text-2xl font-bold">Your Texas ID plan</h1>
        <p className="mt-1 text-sm">{result.subtext}</p>
      </header>

      <section className="mt-4 break-inside-avoid border-2 border-black p-3">
        <p className="text-sm font-bold uppercase tracking-widest">Your next step</p>
        <p className="mt-1 text-base font-bold">{result.nextStep.title}</p>
        <p className="mt-1 text-sm">{result.nextStep.detail}</p>
        {result.nextStep.href && <p className="mt-1 text-sm font-semibold">{result.nextStep.href}</p>}
      </section>

      <div className="mt-4 space-y-4">
        {result.categories.map((category, i) => (
          <PrintCategory key={category.id} category={category} index={i + 1} />
        ))}
      </div>

      <footer className="mt-5 border-t-2 border-black pt-3 text-sm">
        <p className="font-semibold">
          Bring the original papers. DPS does not accept photocopies.
        </p>
        <p className="mt-1">Come back any time or share with a friend: {returnUrl}</p>
        <p className="mt-1">
          This is a plain-language guide. Check the latest rules at dps.texas.gov.
        </p>
        <p className="mt-1">
          Throughline is not part of the Texas Department of Criminal Justice, the Texas Department
          of Public Safety, or any government office. For official information, visit dps.texas.gov.
        </p>
      </footer>
    </div>
  )
}
