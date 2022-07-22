// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import fetch from "cross-fetch"

const encodeFormData = (formData: { [key: string]: string }): string => {
  const formBody = []

  for (var property in formData) {
    var encodedKey = encodeURIComponent(property)
    var encodedValue = encodeURIComponent(formData[property])
    formBody.push(encodedKey + "=" + encodedValue)
  }
  return formBody.join("&")
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let { url } = req.query

  if (!url || Array.isArray(url)) return res.status(400).end()
  if (!process.env.SQRLDAY_API_KEY) return res.status(400).end()

  const formBody = encodeFormData({
    signature: process.env.SQRLDAY_API_KEY,
    format: "json",
    action: "shorturl",
    url,
  })

  const result = await fetch("https://sqrl.day/yourls-api.php", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  })

  const sqrlDayResult = await result.json()

  if (sqrlDayResult.shorturl)
    return res.status(200).send({ shortUrl: sqrlDayResult.shorturl })

  return res.status(400).end()
}
