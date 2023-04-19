import React from "react"

import { Caption } from "../common"
import { Rule } from "../ui"

type Props = {
  children: React.ReactNode
}

const Heading = ({ children }: Props) => {
  return (
    <>
      <h2 className="mt-4">
        <Caption>{children}</Caption>
        <Rule />
      </h2>
    </>
  )
}

export default Heading
