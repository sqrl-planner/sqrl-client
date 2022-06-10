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

import { QuestionIcon } from "@chakra-ui/icons"

type props = {
  isOpen: boolean
  onClose: () => any
}

const HelpModal = ({ isOpen, onClose }: props) => {
  return (<Modal isOpen={isOpen} onClose={onClose} size="xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader fontSize="2xl">Help</ModalHeader>
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
                <QuestionIcon mr={1} />
                Test1
              </Text>
              <FormHelperText fontWeight={400}>
                HELLO THIS IS A HELP BOX
              </FormHelperText>
            </FormControl>
          </Flex>
        </VStack>
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>)

}

export default HelpModal
