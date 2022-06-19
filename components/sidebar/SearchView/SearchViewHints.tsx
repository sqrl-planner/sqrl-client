import { QuestionIcon } from "@chakra-ui/icons"
import { Box, Button, FormHelperText, useDisclosure } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import React from "react"
import HelpModal from "./HelpModal"

type Props = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  debouncedZero: (any: any) => any
}

const SearchViewHints = ({ setSearchQuery, debouncedZero }: Props) => {
  const {
    isOpen: isHelpOpen,
    onOpen: onOpenHelp,
    onClose: onCloseHelp,
  } = useDisclosure()

  const { t } = useTranslation(["common", "sidebar"])

  return (
                    <FormHelperText
      mt={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        {t("sidebar:search-hint")}
        {' "'}
        <Button
          variant="link"
          fontSize="sm"
          width="auto"
          onClick={() => {
            setSearchQuery("sds470")
            debouncedZero("sds470")
          }}
        >
          sds470
        </Button>{" "}
        {t("sidebar:search-hint-or")}
        {' "'}
        <Button
          variant="link"
          fontSize="sm"
          onClick={() => {
            setSearchQuery("linear algebra")
            debouncedZero("linear algebra")
          }}
        >
          linear algebra
        </Button>
        {'".'}
      </Box>
      <HelpModal isOpen={isHelpOpen} onClose={onCloseHelp} />
      <Button variant="link" fontSize="sm" onClick={onOpenHelp}>
        <QuestionIcon mr={1} /> {t("sidebar:help")}
      </Button>
    </FormHelperText>
  )
}

export default SearchViewHints
