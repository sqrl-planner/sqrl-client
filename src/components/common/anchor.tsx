import React from "react"
import Link from "next/link"

type Props = {
  href: string
  children: React.ReactNode
}

const Anchor = ({ href, children }: Props) => {
  return (
    <Link
      className="break-all text-link-blue transition hover:text-link-dark-blue"
      href={href}
    >
      {children}
    </Link>
  )
}

export default Anchor
