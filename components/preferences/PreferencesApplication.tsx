import { MoonIcon } from "@chakra-ui/icons"
import {
    Button,
    ButtonGroup,
    CloseButton,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    Input,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Text,
    UnorderedList,
    useColorMode,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import React, { Fragment, MouseEvent, useEffect, useRef } from "react"
import { FaSchool, FaSun, FaTemperatureHigh } from "react-icons/fa"
import styled from "styled-components"
import { usePreferences } from "../../PreferencesContext"
import { useAppContext } from "../../SqrlContext"
import PreferencesSection from "./PreferencesSection"
import PreferencesToggle from "./PreferencesToggle"

const IconWrapper = styled.div`
    padding-right: 0.6em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PreferencesApplication = () => {
    const { dispatch } = usePreferences()

    const {
        state: { programs, campus },
        dispatch: dispatchAppContext,
    } = useAppContext()

    useEffect(() => {
        dispatch({ type: "SET_CURRENT_PREF_TAB", payload: 0 })
    }, [dispatch])

    const initRef = useRef<HTMLButtonElement>(null)

    const { colorMode, toggleColorMode } = useColorMode()
    const { t } = useTranslation("preferences")

    return (
        <Fragment>
            <PreferencesSection>
                <FormControl>
                    <FormLabel mb={3}>
                        <IconWrapper>
                            <Icon as={FaTemperatureHigh} />
                        </IconWrapper>
                        {t("programs-focuses")}
                    </FormLabel>
                    <Input
                        variant="outline"
                        boxShadow="1px 1px 8px -5px rgba(0, 0, 0, 0.4)"
                        placeholder="Search for a program or focus"
                        my={2}
                        onClick={(e: MouseEvent) => {
                            dispatchAppContext({
                                type: "ADD_PROGRAM",
                                payload: {
                                    code: (
                                        e.target as HTMLInputElement
                                    ).value.split(":")[0],
                                    title: (
                                        e.target as HTMLInputElement
                                    ).value.split(":")[1],
                                },
                            })
                        }}
                    />
                    <UnorderedList my={4} fontWeight="500">
                        {programs.map((program) => (
                            <ListItem mb={2} key={program.code}>
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Text mb={0}>
                                        {program.title}{" "}
                                        <Text
                                            as="span"
                                            opacity="0.6"
                                            fontWeight="600"
                                            fontSize="0.8em"
                                        >
                                            {program.code}
                                        </Text>
                                    </Text>
                                    <Popover initialFocusRef={initRef}>
                                        {({ onClose }) => (
                                            <Fragment>
                                                <PopoverTrigger>
                                                    <CloseButton />
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    style={{
                                                        boxShadow:
                                                            "1px 1px 18px -10px rgba(1,1,1,0.5)",
                                                    }}
                                                >
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>
                                                        Are you sure?
                                                    </PopoverHeader>
                                                    <PopoverFooter
                                                        d="flex"
                                                        justifyContent="flex-end"
                                                    >
                                                        <ButtonGroup size="sm">
                                                            <Button
                                                                variant="ghost"
                                                                ref={initRef}
                                                                onClick={
                                                                    onClose
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    dispatchAppContext(
                                                                        {
                                                                            type: "REMOVE_PROGRAM",
                                                                            payload:
                                                                                program.code,
                                                                        }
                                                                    )
                                                                    onClose()
                                                                }}
                                                            >
                                                                Delete{" "}
                                                                {program.code}
                                                            </Button>
                                                        </ButtonGroup>
                                                    </PopoverFooter>
                                                </PopoverContent>
                                            </Fragment>
                                        )}
                                    </Popover>
                                </Flex>
                            </ListItem>
                        ))}
                    </UnorderedList>
                    <FormHelperText>
                        Your program{programs.length > 1 && "s"} of study{" "}
                        {programs.length > 1 ? "are" : "is"} used to prioritize
                        search and recommend relevant courses.
                    </FormHelperText>
                </FormControl>
            </PreferencesSection>
            <PreferencesSection>
                <FormControl>
                    <FormLabel mb={3}>
                        <IconWrapper>
                            <Icon as={FaSchool} />
                        </IconWrapper>
                        {t("campus")}
                    </FormLabel>
                    {JSON.stringify(campus, null, 2)} <br />
                    TODO: Add campus selection
                </FormControl>
            </PreferencesSection>

            <PreferencesSection>
                <PreferencesToggle
                    isChecked={colorMode === "dark"}
                    onToggle={toggleColorMode}
                    id="mode_toggle"
                    iconProps={{
                        as: colorMode === "light" ? MoonIcon : FaSun,
                    }}
                >
                {t("dark-mode")}
                </PreferencesToggle>
            </PreferencesSection>
        </Fragment>
    )
}

export default PreferencesApplication
