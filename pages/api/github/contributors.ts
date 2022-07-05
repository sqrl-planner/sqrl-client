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
    `https://api.github.com/repos/sqrl-planner/${repositoryName}/contributors`,
    {
      method: "get",
      headers: new Headers({
        Authorization: `token ${process.env.GITHUB_API_KEY as string}`,
      }),
    }
  )

  if(result.ok) return res.status(200).json(await result.json())

  return res.status(500)
}
