import React from "react"
import clsx from "clsx"
import Head from "next/head"

type Props = {
  children: string
}

const Title = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>{`${children} — Sqrl Planner`}</title>
      </Head>
    </>
  )
}

export default Title
