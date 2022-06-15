import { useMutation } from "@apollo/client"
import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { SET_TIMETABLE_NAME } from "../operations/mutations/setTimetableName"

type Props = {
  id: string
}

const useTimetable = ({ id }: Props) => {
  const [allowedToEdit, setAllowedToEdit] = useState<boolean | null>(null)
  const [key, setKey] = useState<string | null>(null)

  useEffect(() => {
    const prevLsTimetablesJSON = localStorage.getItem("timetables")
    let prevLsTimetables: { [key: string]: { key: string; name: string } } = {}
    if (prevLsTimetablesJSON)
      prevLsTimetables = JSON.parse(prevLsTimetablesJSON)

    if (prevLsTimetables[id]?.key) {
      setKey(prevLsTimetables[id].key)
      return setAllowedToEdit(true)
    }

    setAllowedToEdit(false)
  }, [])

  const toast = useToast()

  useEffect(() => {
    if (allowedToEdit === null) return

    if (!allowedToEdit) {
      if (toast.isActive("warn-not-allowed")) return
      toast({
        id: "warn-not-allowed",
        title: "This timetable is read-only.",
        description: "Duplicate the timetable to edit.",
        status: "info",
        variant: "solid",
        isClosable: true,
        duration: null,
      })
    }
  }, [allowedToEdit])

  const [setTimetableName] = useMutation(SET_TIMETABLE_NAME)

  const updateName = (name) => {
    if (!key) return

    setTimetableName({
      variables: { id, key, name },
      onCompleted: (data) => {
        const prevLsTimetablesJSON = localStorage.getItem("timetables")
        let prevLsTimetables: { [key: string]: { key: string; name: string } } =
          {}
        if (prevLsTimetablesJSON)
          prevLsTimetables = JSON.parse(prevLsTimetablesJSON)

        prevLsTimetables[id].name = data.setTimetableName.timetable.name

        localStorage.setItem("timetables", JSON.stringify(prevLsTimetables))
      },
    })
  }

  return { allowedToEdit, updateName }
}

export default useTimetable
