import React, { useState } from "react"
import {
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormHelperText,
  Select,
  Input,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { CREATE_TIMETABLE } from "../operations/mutations/createTimetable"

type Props = {
  isOpen: boolean
  onClose: () => void
  timetables: { [id: string]: { key: string; name: string } }
}

const TimetableCreationModal = ({ isOpen, onClose, timetables }: Props) => {
  const { t } = useTranslation("index")
  const [newLoading, setNewLoading] = useState(false)
  const [name, setName] = useState("")

  const [createTimetable] = useMutation(CREATE_TIMETABLE)
  const router = useRouter()

  const createNewTimetable = () => {
    setNewLoading(true)

    createTimetable({
      onCompleted: (data) => {
        const {
          key,
          timetable: { id, name },
        } = data.createTimetable
        localStorage.setItem(
          "timetables",
          JSON.stringify({
            ...timetables,
            [id]: { key, name },
          })
        )

        router.push(`/timetable/${id}`)
      },
      variables: {
        name: name || undefined,
      },
    })
  }

  return (
    <Modal
      closeOnEsc={!newLoading}
      closeOnOverlayClick={!newLoading}
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            createNewTimetable()
          }}
        >
          <ModalHeader>Create a new timetable</ModalHeader>
          {!newLoading && <ModalCloseButton />}
          <ModalBody>
            <VStack width="100%" fontWeight={500} spacing={8}>
              <FormControl>
                <Flex
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text as="span" display="flex" alignItems="center">
                    {t("select-term")}
                  </Text>
                  <Select
                    shadow="sm"
                    fontWeight={500}
                    width="auto"
                    //   bg={useColorModeValue("white", "gray.700")}
                    //   value={searchQuery === "" ? sortBy : "relevance"}
                    //   disabled={searchQuery !== ""}
                    //   onChange={(e) =>
                    // setSortBy(e.target.value as "custom" | "edit" | "create")
                    // false
                    //   }
                  >
                    <option value="create">
                      2022 {t("fall")}–2023 {t("winter")}
                    </option>
                  </Select>
                </Flex>
                <FormHelperText fontWeight={400}>
                  {t("soon-support-summer-2023")}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <Flex
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text as="span" display="flex" alignItems="center">
                    {t("name")}
                  </Text>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    width="auto"
                  />
                </Flex>
                <FormHelperText fontWeight={400}>
                  {t("auto-generated-name")}
                </FormHelperText>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={newLoading} colorScheme="blue" bg="blue.700">
              Create timetable
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default TimetableCreationModal
