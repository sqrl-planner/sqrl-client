import React from "react"
import Link from "next/link"

type Props = {
  href: string
  children: React.ReactNode
}

const Anchor = ({ href, children }: Props) => {
  return (
    <Link
      className="break-all text-blue-700 transition hover:text-blue-800"
      href={href}
    >
      {children}
    </Link>
  )
}

export default Anchor
