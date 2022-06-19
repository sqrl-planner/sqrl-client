import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import { REMOVE_COURSE_TIMETABLE } from "../operations/mutations/removeCourseTimetable"
import { SET_SECTIONS_TIMETABLE } from "../operations/mutations/setSectionsTimetable"
import { GET_TIMETABLE_BY_ID } from "../operations/queries/getTimetableById"
import useTimetable from "./useTimetable"
import {
  constructSectionsFromMeetings,
  getMeetingsFromSections,
  getSectionType,
} from "./utils/course"

type SetTimetableSectionsProps = {
  courseId: string
  sections: Array<string>
}

type RemoveTimetableCourseProps = {
  courseId: string
}

const SectionsContext = createContext<
  | {
      sections: { [key: string]: Array<string> }
      name: string
      setSections: Function
      removeCourse: Function
    }
  | undefined
>(undefined)

export const SectionsProvider = ({
  children,
  initialSections = {},
}: {
  children: React.ReactNode
  initialSections?: { [key: string]: Array<string> }
}) => {
  const router = useRouter()

  const id = (router.query.id as string) || ""

  const [getTimetableById, { data }] =
    useLazyQuery(GET_TIMETABLE_BY_ID, {
    fetchPolicy: "no-cache"
  })

  const [sections, setSections] =
    useState<{ [key: string]: Array<string> }>(initialSections)
  const [name, setName] = useState<string>("")

  const { key } = useTimetable({ id })

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

  const [setSectionsTimetable] = useMutation(
    SET_SECTIONS_TIMETABLE
  )

  const [removeCourse] = useMutation(REMOVE_COURSE_TIMETABLE)

  const removeTimetableCourse = ({ courseId }: RemoveTimetableCourseProps) => {
    removeCourse({
      variables: { id, courseId, key },
      onCompleted: (data) => {
        setSections(JSON.parse(data.removeCourseTimetable.timetable.sections))
      },
    })
  }

  const setTimetableSections = ({
    courseId,
    sections: nextSections,
  }: SetTimetableSectionsProps) => {
    if (!id) return

    setSections((prevSections) => {
      const meetings = getMeetingsFromSections(prevSections[courseId] || [])
      for (const nextSection of nextSections) {
        const sectionType = getSectionType(nextSection)
        meetings[sectionType] = nextSection
      }

      return {
        ...prevSections,
        [courseId]: constructSectionsFromMeetings(meetings),
      }
    })

    setSectionsTimetable({
      variables: {
        id,
        courseId,
        key,
        sections: nextSections,
      },
      onCompleted: (data) => {
        setSections(JSON.parse(data.setSectionsTimetable.timetable.sections))
      },
    })
  }

  return (
    <SectionsContext.Provider
      value={{
        sections,
        name,
        setSections: setTimetableSections,
        removeCourse: removeTimetableCourse,
      }}
    >
      {children}
    </SectionsContext.Provider>
  )
}

const useSections = () => {
  const context = useContext(SectionsContext)

  if (context === undefined) {
    throw new Error("useSectionsContext must be used within a SectionsProvider")
  }

  return context
}

export default useSections
