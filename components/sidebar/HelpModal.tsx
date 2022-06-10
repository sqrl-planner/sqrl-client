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
  FormHelperText,
  Button,
} from "@chakra-ui/react"

type props = {
  isOpen: boolean
  onClose: () => any
}

const HelpModal = ({ isOpen, onClose }: props) => {
  return (<Modal isOpen={isOpen} onClose={onClose} size="xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader fontSize="2xl">About Search</ModalHeader>
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
                Use the search function to search for anything in a course, including course code, substrings of course code, course title, or description. 
              </Text>
              <FormHelperText fontWeight={400}>
                For instance, 
                <ul>
                  <li>- if you know the specific course code for a first year political science course you need to take, you can search for "pol101";</li>
                  <li>- if you know you want to take a course in pseudoscience, you can search for "eco";</li>
                  <li>- if you know you want to take a course about global affairs, you can search for "human rights";</li>
                  <li>- if you know you want to take the easiest course at the university, you can search for "mat337"</li>
                </ul>
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
