import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_TIMETABLE_BY_ID } from "../operations/queries/getTimetableById"

type Props = {
  id: string | undefined
}

const useSections = ({ id }: Props) => {
  const [getTimetableById, { data, loading }] =
    useLazyQuery(GET_TIMETABLE_BY_ID)

  const [sections, setSections] = useState<{ [key: string]: Array<string> }>({})

  useEffect(() => {
    if (!id) return

    getTimetableById({
      variables: {
        id,
      },
    })
  }, [id])

  useEffect(() => {
    if (!data) return
    if (!id) return

    setSections(JSON.parse(data.timetableById.sections))
  }, [data, id])

  return sections
}

export default useSections
