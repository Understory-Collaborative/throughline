/**
 * Slim progress bar with a plain text step label. The label carries the meaning,
 * so the bar itself is decorative and hidden from screen readers.
 */
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div className="mb-8">
      <div aria-hidden="true" className="h-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-support">{label}</p>
    </div>
  )
}
