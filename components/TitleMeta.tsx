import Head from "next/head"

type Props = {
  name: string
  sharePrefix: string
  id: string | string[] | undefined
}

function TitleMeta(props: Props) {
  const { name, sharePrefix, id } = props

  return (
    <Head>
      <title>Sqrl Planner | {name}</title>
      <meta property="og:url" content={`${sharePrefix}${id}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`Sqrl Planner | ${name}`} />
    </Head>
  )
}

export default TitleMeta
