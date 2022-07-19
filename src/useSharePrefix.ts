import React, { useEffect, useState } from "react"

const useSharePrefix = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [sharePrefix, setSharePrefix] = useState<string>("")

  useEffect(() => {
    setSharePrefix(
      `${window.location.protocol}//${window.location.host}/timetable/`
    )
  }, [setSharePrefix])

  return [sharePrefix, setSharePrefix]
}

export default useSharePrefix
