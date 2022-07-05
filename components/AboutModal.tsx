import React, { useEffect, useState } from "react"

import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex,
  Icon,
  Button,
  Heading,
  Box,
  Link,
  useColorModeValue,
  Grid,
  Divider,
} from "@chakra-ui/react"

import { FaGithub } from "react-icons/fa"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { useTranslation } from "next-i18next"
// import Image from "next/image"

type props = {
  isOpen: boolean
  onClose: () => any
}

const Contributor = ({
  contributor,
}: {
  contributor: {
    html_url: string
    avatar_url: string
    login: string
    contributions: number
  }
}) => {
  return (
    <Link
      display="flex"
      href={`${contributor.html_url}`}
      alignItems="center"
      color={useColorModeValue("blue.800", "blue.400")}
      isExternal
    >
      <Image
        w={10}
        rounded="full"
        shadow="md"
        mr={2}
        src={contributor.avatar_url}
      />
      {contributor.login}
      {/* <ExternalLinkIcon mx={1} /> */}
    </Link>
  )
}

const AboutModal = ({ isOpen, onClose }: props) => {
  const [contributors, setContributors] = useState<{
    gator: Array<any>
    client: Array<any>
    server: Array<any>
  }>({
    gator: [],
    client: [],
    server: [],
  })

  const [lastUpdated, setLastUpdated] = useState<{
    gator: Date
    server: Date
    client: Date
  }>({
    gator: new Date(),
    client: new Date(),
    server: new Date()
  })

  const [latestVersion, setLatestVersion] = useState<{
    gator: string
    server: string
    client: string
  }>({
    gator: "",
    client: "",
    server: "",
  })

  useEffect(() => {
    ;(async () => {
      const clientContributors = (await (
        await fetch("/api/github/contributors?repositoryName=sqrl-client")
      ).json()) as unknown as Array<any>
      const serverContributors = (await (
        await fetch("/api/github/contributors?repositoryName=sqrl-server")
      ).json()) as unknown as Array<any>
      const gatorContributors = (await (
        await fetch("/api/github/contributors?repositoryName=gator")
      ).json()) as unknown as Array<any>

      const clientLastUpdated = await ((await fetch(
        "/api/github/lastUpdated?repositoryName=sqrl-client"
      ))).json() as string
      const serverLastUpdated = await (await fetch((
        "/api/github/lastUpdated?repositoryName=sqrl-server"
      ))).json() as string
      const gatorLastUpdated = await (await fetch((
        "/api/github/lastUpdated?repositoryName=gator"
      ))).json() as string

      const clientLatestVersion = await (await fetch((
        "/api/github/latestVersion?repositoryName=sqrl-client"
      ))).text() as string
      const serverLatestVersion = await (await fetch((
        "/api/github/latestVersion?repositoryName=sqrl-server"
      ))).text() as string
      const gatorLatestVersion = await (await fetch((
        "/api/github/latestVersion?repositoryName=gator"
      ))).text() as string

      setContributors({
        gator: gatorContributors,
        server: serverContributors,
        client: clientContributors,
      })

      setLastUpdated({
        gator: new Date(gatorLastUpdated),
        server: new Date(serverLastUpdated),
        client: new Date(clientLastUpdated),
      })

      setLatestVersion({
        gator: JSON.parse(gatorLatestVersion),
        server: JSON.parse(serverLatestVersion),
        client: JSON.parse(clientLatestVersion),
      })
    })()
  }, [])

  const { t } = useTranslation("modal")
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">{t("about-sqrl")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {t("about-body")}
          <Flex flexDir="column" mt={8} gap={2}>
            <Heading as="h3" size="md" fontWeight={500}>
              {t("repositories")}
            </Heading>
            <Flex flexDir="column" alignItems="start" gap={4} fontWeight="500">
              <Flex flexDir="column" alignItems="start">
                <Link
                  color={useColorModeValue("blue.800", "blue.300")}
                  isExternal
                  p={2}
                  px={3}
                  mb={2}
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  bg={useColorModeValue("blue.50", "blue.800")}
                  href="https://github.com/sqrl-planner/sqrl-client"
                >
                  <Icon as={FaGithub} /> sqrl-client: {latestVersion.client} <ExternalLinkIcon />
                </Link>
                <Box opacity={0.6} fontSize="sm" mb={2}>{t("last-updated")} {lastUpdated.client.toLocaleDateString()}.</Box>
                <Box opacity={0.8}>{t("sqrl-client-description")}</Box>

                <Heading
                  mb={2}
                  mt={4}
                  fontWeight={600}
                  opacity={0.8}
                  as="h4"
                  size="base"
                >
                  {t("contributors")}
                </Heading>

                <Grid
                  templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
                  width="100%"
                  gap={4}
                  flexWrap="wrap"
                  justifyContent="stretch"
                >
                  {contributors?.client &&
                    contributors?.client.map((contributor) => (
                      <Contributor
                        contributor={contributor}
                        key={contributor.id}
                      />
                    ))}
                </Grid>
              </Flex>

              <Divider />

              <Flex flexDir="column" alignItems="start">
                <Link
                  color={useColorModeValue("blue.800", "blue.300")}
                  isExternal
                  p={2}
                  px={3}
                  mb={2}
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  bg={useColorModeValue("blue.50", "blue.800")}
                  href="https://github.com/sqrl-planner/sqrl-server"
                >
                  <Icon as={FaGithub} /> sqrl-server: {latestVersion.server} <ExternalLinkIcon />
                </Link>

                <Box opacity={0.6} fontSize="sm" mb={2}>{t("last-updated")} {lastUpdated.server.toLocaleDateString()}.</Box>
                <Box opacity={0.8}>{t("sqrl-server-description")}</Box>

                <Heading
                  mb={2}
                  mt={4}
                  fontWeight={600}
                  opacity={0.8}
                  as="h4"
                  size="base"
                >
                  {t("contributors")}
                </Heading>

                <Grid
                  templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
                  width="100%"
                  gap={4}
                  flexWrap="wrap"
                  justifyContent="stretch"
                >
                  {contributors?.server &&
                    contributors?.server.map((contributor) => (
                      <Contributor
                        contributor={contributor}
                        key={contributor.id}
                      />
                    ))}
                </Grid>
              </Flex>

              <Divider />

              <Flex flexDir="column" alignItems="start" width="100%">
                <Link
                  color={useColorModeValue("blue.800", "blue.300")}
                  isExternal
                  p={2}
                  px={3}
                  mb={2}
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  bg={useColorModeValue("blue.50", "blue.800")}
                  href="https://github.com/sqrl-planner/gator"
                >
                  <Icon as={FaGithub} /> gator: {latestVersion.gator} <ExternalLinkIcon />
                </Link>
                <Box opacity={0.6} fontSize="sm" mb={2}>{t("last-updated")} {lastUpdated.gator.toLocaleDateString()}.</Box>
                <Box opacity={0.8}>{t("gator-description")}</Box>
                <Heading
                  mb={2}
                  mt={4}
                  fontWeight={600}
                  opacity={0.8}
                  as="h4"
                  size="base"
                >
                  {t("contributors")}
                </Heading>

                <Grid
                  templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
                  width="100%"
                  gap={4}
                  flexWrap="wrap"
                  justifyContent="stretch"
                >
                  {contributors?.gator &&
                    contributors?.gator.map((contributor) => (
                        <Contributor
                          contributor={contributor}
                          key={contributor.id}
                          />
                    ))}
                </Grid>
              </Flex>
            </Flex>
          </Flex>
          {/* <Flex flexDir="column" mt={4}> */}
          {/*   <Heading as="h3" size="md">{t("contributors"})</Heading> */}
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
            bg={useColorModeValue("blue.700", "blue.400")}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AboutModal
