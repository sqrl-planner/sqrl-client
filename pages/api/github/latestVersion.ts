// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import fetch from "cross-fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let { repositoryName } = req.query
  if (!repositoryName) repositoryName = "sqrl-client"

  const result = await fetch(
    `https://api.github.com/repos/sqrl-planner/${repositoryName}/tags`,
    {
      method: "get",
      headers: new Headers({
        Authorization: `token ${process.env.GITHUB_API_KEY as string}`,
      }),
    }
  )

  let resultingName

  try {
    resultingName = (await result.json())[0].name
  } catch (e) {
    resultingName = "Not yet stable"
  }

  if (result.ok) return res.status(200).json(resultingName)

  return res.status(500).end()
}
