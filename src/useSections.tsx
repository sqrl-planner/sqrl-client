import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import { SET_SECTIONS_TIMETABLE } from "../operations/mutations/setSectionsTimetable"
import { GET_TIMETABLE_BY_ID } from "../operations/queries/getTimetableById"
import useTimetable from "./useTimetable"

type Props = {
  id?: string
}

type SetTimetableSectionsProps = {
  courseId: string
  sections: Array<string>
}

const SectionsContext = createContext<
  | {
      sections: { [key: string]: Array<string> }
      name: string
      setSections: Function
    }
  | undefined
>(undefined)

export const SectionsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()

  const id = (router.query.id as string) || ""

  const [getTimetableById, { data, loading }] =
    useLazyQuery(GET_TIMETABLE_BY_ID)

  const [sections, setSections] = useState<{ [key: string]: Array<string> }>({})
  const [name, setName] = useState<string>("")

  const { allowedToEdit, key } = useTimetable({ id })

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
    setName(data.timetableById.name)
  }, [data, id])

  const [setSectionsTimetable, { data: sectionsData }] = useMutation(
    SET_SECTIONS_TIMETABLE
  )

  useEffect(() => {
    if (!sectionsData) return

    setSections(
      JSON.parse(sectionsData.setSectionsTimetable.timetable.sections)
    )
  }, [sectionsData])

  const setTimetableSections = ({
    courseId,
    sections: nextSections,
  }: SetTimetableSectionsProps) => {
    if (!id) return
    setSectionsTimetable({
      variables: {
        id,
        courseId,
        key,
        sections: [...(sections[id] ? sections[id] : []), ...nextSections],
      },
    })
  }

  return (
    <SectionsContext.Provider
      value={{ sections, name, setSections: setTimetableSections }}
    >
      {children}
    </SectionsContext.Provider>
  )
}

const useSections = ({ id }: Props) => {
  const context = useContext(SectionsContext)

  if (context === undefined) {
    throw new Error("useSectionsContext must be used within a SectionsProvider")
  }

  return context
}

export default useSections
