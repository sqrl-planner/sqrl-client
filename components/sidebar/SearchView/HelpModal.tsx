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
  UnorderedList,
  ListItem,
} from "@chakra-ui/react"

type props = {
  isOpen: boolean
  onClose: () => any
}

const HelpModal = ({ isOpen, onClose }: props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
                <Text as="span" display="flex" alignItems="center">
                  Use the search function to search for anything in a course,
                  including the course code, substrings of the course code,
                  course title, or even the description.
                </Text>
                <FormHelperText fontWeight={400}>
                  For example:
                  <UnorderedList>
                    <ListItem>
                      If you know the specific code for a first year political
                      science course you need to take, you can search for{" "}
                      {'"pol101"'}.
                    </ListItem>
                    <ListItem>
                      If you want to take a course in pseudoscience, you can
                      search for {'"eco"'}.
                    </ListItem>
                    <ListItem>
                      If you want to take a course about global affairs, you can
                      search for {'"human rights"'}.
                    </ListItem>
                    <ListItem>
                      If you want to take the easiest course at U of T, you can
                      search for {'"mat337"'}.
                    </ListItem>
                  </UnorderedList>
                </FormHelperText>
              </FormControl>
            </Flex>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default HelpModal
