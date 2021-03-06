import { Flex, useColorModeValue, Stack } from "@chakra-ui/react"
import React from "react"
interface PreferencesSectionProps {
  children: React.ReactNode
}

const PreferencesSection = ({ children }: PreferencesSectionProps) => {
  return (
    <Flex
      mt={3}
      mb={6}
      mx={2}
      p={6}
      py={4}
      borderRadius={10}
      boxShadow="0px 1px 8px -5px rgba(0,0,0,0.5)"
      bg={useColorModeValue("gray.75", "gray.650")}
      _last={{
        marginBottom: "0",
      }}
    >
      <Stack spacing={4} width="100%">
        {children}
      </Stack>
    </Flex>
  )
}

export default PreferencesSection
