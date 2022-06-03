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
  Button,
  HStack,
  Heading,
  Box,
  Link
} from "@chakra-ui/react"

import { FaShareSquare, FaGithub } from "react-icons/fa"
import ShareCalendar from "./ShareCalendar"
import { ExternalLinkIcon } from "@chakra-ui/icons"

type props = {
  isOpen: boolean
  onClose: () => any
}

const AboutModal = ({ isOpen, onClose }: props) => {
  return (<Modal isOpen={isOpen} onClose={onClose} size="xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader fontSize="2xl">About Sqrl</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        Sqrl is a modern timetable planner for the University of Toronto.
        <Flex flexDir="column" mt={8} gap={2}>
          <Heading as="h3" size="md" fontWeight={500}>Repositories</Heading>
          <Flex flexDir="column" alignItems="start" gap={4} fontWeight="500">
            <Flex flexDir="column" alignItems="start">
              <Link isExternal py={2} display="flex" alignItems="center" gap={2} href="https://github.com/sqrl-planner/sqrl-client">
                <Icon as={FaGithub} /> sqrl-client <ExternalLinkIcon />
              </Link>
              <Box opacity={0.8}>The frontend React/Next.js client that consumes sqrl-server, with TypeScript and Chakra UI.</Box></Flex>

            <Flex flexDir="column" alignItems="start">
              <Link isExternal py={2} display="flex" alignItems="center" gap={2} href="https://github.com/sqrl-planner/sqrl-server">
                <Icon as={FaGithub} /> sqrl-server <ExternalLinkIcon />
              </Link>

              <Box opacity={0.8}>A GraphQL API and gateway that persists timetables and proxies course information from gator.</Box>

            </Flex>


            <Flex flexDir="column" alignItems="start">
              <Link isExternal py={2} display="flex" alignItems="center" gap={2} href="https://github.com/sqrl-planner/gator">
                <Icon as={FaGithub} /> gator <ExternalLinkIcon />
              </Link>
              <Box opacity={0.8}>A central dataset aggregator and content manager.</Box>
            </Flex>

          </Flex>
        </Flex>
        {/* <Flex flexDir="column" mt={4}> */}
        {/*   <Heading as="h3" size="md">Contributors</Heading> */}
        {/*   <Flex gap={4}> */}
        {/*     <div>Eamon Ma</div> */}
        {/*     <div>Shon Verch</div> */}
        {/*   </Flex> */}
        {/* </Flex> */}

        {/* <VStack width="100%" fontWeight={500}> */}
        {/*   <Flex */}
        {/*     width="100%" */}
        {/*     alignItems="center" */}
        {/*     justifyContent="space-between" */}
        {/*     mb={6} */}
        {/*   > */}
        {/*     <FormControl as="span"> */}
        {/*       <Text */}
        {/*         as="span" */}
        {/*         display="flex" */}
        {/*         alignItems="center" */}
        {/*       > */}
        {/*         <Icon as={FaShareSquare} mr={2} />{" "} */}
        {/*         Share read-only */}
        {/*       </Text> */}
        {/*       <Input */}
        {/*         value="https://sqrlplanner.com/timetable/507f1f77bcf86cd799439011" */}
        {/*         my={1} */}
        {/*         mt={2} */}
        {/*         readOnly */}
        {/*       /> */}
        {/*       <FormHelperText fontWeight={400}> */}
        {/*         Anyone who views this timetable can */}
        {/*         duplicate it. */}
        {/*       </FormHelperText> */}
        {/*     </FormControl> */}
        {/*   </Flex> */}
        {/*   <ShareCalendar /> */}
        {/* </VStack> */}
      </ModalBody>

      <ModalFooter>
        <Button
          colorScheme="blue"
          onClick={onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>)

}

export default AboutModal

