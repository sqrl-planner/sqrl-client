import React from "react"

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
  Button
} from "@chakra-ui/react"

import { FaShareSquare } from "react-icons/fa"
import ShareCalendar from "./ShareCalendar"

type props = {
  shareIsOpen: boolean
  shareOnClose: () => any
}

const ShareModal = ({ shareIsOpen, shareOnClose }: props) => {
  return (<Modal isOpen={shareIsOpen} onClose={shareOnClose} size="xl">
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
              <Text
                as="span"
                display="flex"
                alignItems="center"
              >
                <Icon as={FaShareSquare} mr={2} />{" "}
                Share read-only
              </Text>
              <Input
                value="https://sqrlplanner.com/timetable/507f1f77bcf86cd799439011"
                my={1}
                mt={2}
                readOnly
              />
              <FormHelperText fontWeight={400}>
                Anyone who views this timetable can
                duplicate it.
              </FormHelperText>
            </FormControl>
          </Flex>
          <ShareCalendar />
        </VStack>
      </ModalBody>

      <ModalFooter>
        <Button
          colorScheme="blue"
          onClick={shareOnClose}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>)

}

export default ShareModal
