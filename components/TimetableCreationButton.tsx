import React from "react"

import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import TimetableCreationModal from "./TimetableCreationModal"

type Props = {
  // newLoading: boolean
  // setNewLoading: React.Dispatch<React.SetStateAction<boolean>>
  timetables: { [id: string]: { key: string; name: string } }
}

const TimetableCreationButton = ({
  // newLoading,
  // setNewLoading,
  timetables,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  

  const { t } = useTranslation("index")

  return (
    <>
    <TimetableCreationModal {...{
      isOpen,
      onClose,
      timetables,
    }} />
    <Button
      border="2px dashed"
      rounded="xl"
      color="blue.700"
      borderColor="blue.500"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={12}
      // disabled={newLoading}
      onClick={onOpen}
      minH="2xs"
    >
      <Box display="flex" flexDirection="column" position="relative" bottom="1">
        <Box fontSize="7xl">+</Box>
        <Box>{t("create-timetable")}</Box>
      </Box>
    </Button></>
  )
}

export default TimetableCreationButton
