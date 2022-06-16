import React, { useEffect } from "react"

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

type props = {
  isOpen: boolean
  onClose: () => any
}

const ShareModal = ({ isOpen, onClose }: props) => {
  const router = useRouter()

  const id = router.query.id

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}/timetable/${id}`
      : ""
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
  }, [hasCopied])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Share</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack width="100%" fontWeight={500}>
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              mb={6}
            >
              <FormControl as="span">
                <Text as="span" display="flex" alignItems="center">
                  <Icon as={FaShareSquare} mr={2} /> Share read-only
                </Text>
                <Input
                  cursor="pointer"
                  as="button"
                  onClick={onCopy}
                  my={1}
                  mt={2}
                  readOnly
                >
                  {shareUrl}
                </Input>
                <FormHelperText fontWeight={400}>
                  Click to copy the link. Anyone who views this timetable can
                  duplicate it.
                </FormHelperText>
              </FormControl>
            </Flex>
            <ShareCalendar />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ShareModal
