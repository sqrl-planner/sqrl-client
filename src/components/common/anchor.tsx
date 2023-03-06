import Link from "next/link"
import React from "react"

type Props = {
  href: string
  children: React.ReactNode
}

const Anchor = ({ href, children }: Props) => {
  return (
    <Link
      className="text-link-blue hover:text-link-dark-blue transition"
      href={href}
    >
      {children}
    </Link>
  )
}

export default Anchor
