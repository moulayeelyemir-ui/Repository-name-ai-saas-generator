import Link from "next/link"

type Props = {
  title: string
  description: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function DashboardPageHeader({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-zinc-400">{description}</p>
      </div>

      <div className="flex gap-3">
        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className="rounded-xl bg-zinc-800 px-4 py-2 text-sm text-white"
          >
            {secondaryLabel}
          </Link>
        )}

        {primaryLabel && primaryHref && (
          <Link
            href={primaryHref}
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
          >
            {primaryLabel}
          </Link>
        )}
      </div>
    </div>
  )
}