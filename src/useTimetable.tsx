import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"

type Props = {
  id?: string
}

const useTimetable = ({ id }: Props) => {
  const [allowedToEdit, setAllowedToEdit] = useState<boolean | null>(null)
  const [key, setKey] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

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

  return { allowedToEdit, key }
}

export default useTimetable
