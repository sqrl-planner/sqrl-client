import React, { useEffect, useState } from "react"

import {
  ModalOverlay,
  Modal,
  Text,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  Flex,
  Icon,
  Input,
  FormHelperText,
  Button,
  useClipboard,
  useToast,
} from "@chakra-ui/react"

import { FaShareSquare } from "react-icons/fa"
import ShareCalendar from "./ShareCalendar"
import { useRouter } from "next/router"
import { BiDuplicate } from "react-icons/bi"
import { useMutation } from "@apollo/client"
import { DUPLICATE_TIMETABLE } from "../operations/mutations/duplicateTimetable"
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons"
import { useTranslation } from "next-i18next"
import useSharePrefix from "../src/useSharePrefix"

type props = {
  isOpen: boolean
  onClose: () => any
}

const ShareModal = ({ isOpen, onClose }: props) => {
  const router = useRouter()

  const id = router.query.id

  const [sharePrefix] = useSharePrefix()
  const shareUrl = `${sharePrefix}${id}`
  const { onCopy, hasCopied } = useClipboard(shareUrl)

  const toast = useToast()

  useEffect(() => {
    if (!hasCopied) return

    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }, [toast, hasCopied])

  const [duplicateTimetable] = useMutation(DUPLICATE_TIMETABLE)

  const [loading, setLoading] = useState(false)

  const { t } = useTranslation("modal")

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Share timetable</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack width="100%" fontWeight={500} spacing={8}>
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              // mb={6}
            >
              <FormControl as="span">
                <Text as="span" display="flex" alignItems="center">
                  <Icon as={FaShareSquare} mr={2} /> {t("share-read-only")}
                </Text>
                <Flex
                  my={2}
                  alignItems="center"
                  gap={4}
                  justifyContent="space-between"
                >
                  <Input
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    value={shareUrl}
                    flex="1"
                    onFocus={(e) => e.target.select()}
                  ></Input>
                  <Button onClick={onCopy} colorScheme="blue" bg="blue.700">
                    <CopyIcon mr={2} /> {t("copy-link")}
                  </Button>
                </Flex>
                <FormHelperText fontWeight={400}>
                  {t("share-read-only-description")}
                </FormHelperText>
              </FormControl>
            </Flex>
            <ShareCalendar />
            <FormControl>
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text as="span" display="flex" alignItems="center">
                  <Icon as={BiDuplicate} mr={2} /> {t("duplicate-table")}
                </Text>
                <Button
                  colorScheme="blue"
                  bg="blue.700"
                  onClick={() => {
                    const newTimetable = window.open("", "_blank")

                    setLoading(true)
                    duplicateTimetable({
                      variables: {
                        id,
                      },
                      onCompleted: (data) => {
                        const {
                          key,
                          timetable: { id, name },
                        } = data.duplicateTimetable

                        const prevLsTimetablesJSON =
                          localStorage.getItem("timetables")
                        let timetables = {}
                        if (prevLsTimetablesJSON)
                          timetables = JSON.parse(prevLsTimetablesJSON)

                        localStorage.setItem(
                          "timetables",
                          JSON.stringify({
                            ...timetables,
                            [id]: { key, name },
                          })
                        )

                        if (newTimetable)
                          newTimetable.location.href = `${sharePrefix}${id}`

                        setLoading(false)
                      },
                    })
                  }}
                  isLoading={loading}
                >
                  <ExternalLinkIcon mr={2} />
                  {t("create-copy")}
                </Button>
              </Flex>
              <FormHelperText fontWeight={400}>
                {t("create-copy-description")}
              </FormHelperText>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>{t("close")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ShareModal
