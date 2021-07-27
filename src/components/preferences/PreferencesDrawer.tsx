import {
    TimeIcon,
    WarningTwoIcon,
    InfoIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    MoonIcon,
    SunIcon,
} from "@chakra-ui/icons"
import { GiResize } from "react-icons/gi"
import { BsClockFill } from "react-icons/bs"
import { Ri24HoursLine } from "react-icons/ri"
import { BiArrowFromRight } from "react-icons/bi"
import { FaClock, FaPalette, FaSun } from "react-icons/fa"
import {
    Box,
    Button,
    chakra,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Icon,
    InputGroup,
    Select,
    Stack,
    Switch,
    useColorMode,
    useColorModeValue,
    UseDisclosureProps,
} from "@chakra-ui/react"
import styled from "styled-components"
import React, { useRef } from "react"
import { usePreferences } from "../../PreferencesContext"
import PreferencesSection from "./PreferencesSection"

const IconWrapper = styled.div`
    padding-right: 0.6em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PrefGroup = styled(Box)`
    margin-bottom: 1rem;
`

const PreferencesDrawer = (props: {
    disclosure: UseDisclosureProps
    drawerprops: any
}) => {
    const { isOpen, onOpen, onClose } = props.disclosure
    const firstField = useRef() as React.MutableRefObject<HTMLInputElement>

    const {
        state: {
            scale,
            start,
            end,
            showTimeInMeeting,
            showCourseSuffix,
            palette,
            highlightConflicts,
            twentyFour,
        },
        dispatch,
    } = usePreferences()

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Drawer {...props.drawerprops} size="md">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton size="lg" />
                <DrawerHeader
                    // background="gray.100"
                    fontSize="3xl"
                    fontWeight="700"
                    boxShadow="1px 1px 6px -4px rgba(0,0,0,0.5)"
                    height="4.5rem"
                >
                    Preferences
                </DrawerHeader>

                <DrawerBody>
                    <PreferencesSection>
                        <FormControl>
                            <Flex
                                alignItems="center"
                                width="100%"
                                justifyContent="space-between"
                            >
                                <FormLabel htmlFor="show-suffix" mb="0">
                                    <IconWrapper>
                                        <Icon
                                            transform="rotate(180deg) scale(1.2)"
                                            as={BiArrowFromRight}
                                        />
                                    </IconWrapper>
                                    Course suffix
                                </FormLabel>
                                <Switch
                                    size="lg"
                                    id="show-suffix"
                                    isChecked={showCourseSuffix}
                                    onChange={(e) => {
                                        const payload = e.target.checked

                                        dispatch({
                                            type: "SET_SHOW_COURSE_SUFFIX",
                                            payload,
                                        })
                                    }}
                                />
                            </Flex>
                            <FormHelperText>
                                Show course credit designator (Y1, H1, H5, etc.)
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <Flex
                                alignItems="center"
                                width="100%"
                                justifyContent="space-between"
                            >
                                <FormLabel htmlFor="show-times" mb="0">
                                    <IconWrapper>
                                        <Icon as={FaClock} />
                                    </IconWrapper>
                                    Meeting times
                                </FormLabel>
                                <Switch
                                    size="lg"
                                    id="show-times"
                                    isChecked={showTimeInMeeting}
                                    onChange={(e) => {
                                        const payload = e.target.checked

                                        dispatch({
                                            type: "SET_SHOW_TIME_IN_MEETING",
                                            payload,
                                        })
                                    }}
                                />
                            </Flex>
                        </FormControl>

                        <FormControl
                            display="flex"
                            alignItems="center"
                            width="100%"
                            justifyContent="space-between"
                        >
                            <FormLabel htmlFor="highlight-conflicts" mb="0">
                                <IconWrapper>
                                    <WarningTwoIcon />
                                </IconWrapper>
                                Highlight conflicts
                            </FormLabel>
                            <Switch
                                size="lg"
                                id="highlight-conflicts"
                                isChecked={highlightConflicts}
                                onChange={(e) => {
                                    const payload = e.target.checked

                                    dispatch({
                                        type: "SET_HIGHLIGHT_CONFLICTS",
                                        payload,
                                    })
                                }}
                            />
                        </FormControl>
                    </PreferencesSection>

                    <PreferencesSection>
                        <FormControl
                            display="flex"
                            alignItems="center"
                            width="100%"
                            justifyContent="space-between"
                            // pb={3}
                        >
                            <FormLabel htmlFor="toggle-mode" mb="0">
                                <IconWrapper>
                                    {colorMode === "light" ? (
                                        <MoonIcon />
                                    ) : (
                                        <Icon as={FaSun} />
                                    )}
                                </IconWrapper>
                                Dark mode
                            </FormLabel>
                            <Switch
                                size="lg"
                                id="toggle-mode"
                                isChecked={colorMode !== "light"}
                                onChange={() => {
                                    toggleColorMode()
                                }}
                            />
                        </FormControl>
                        <FormControl
                            display="flex"
                            alignItems="center"
                            width="100%"
                            justifyContent="space-between"
                        >
                            <FormLabel htmlFor="toggle-twenty-four" mb="0">
                                <IconWrapper>
                                    <Icon as={Ri24HoursLine} />
                                </IconWrapper>
                                24-hour time
                            </FormLabel>
                            <Switch
                                size="lg"
                                id="toggle-twenty-four"
                                isChecked={twentyFour}
                                onChange={(e) => {
                                    const payload = e.target.checked

                                    dispatch({
                                        type: "SET_TWENTY_FOUR",
                                        payload,
                                    })
                                }}
                            />
                        </FormControl>
                    </PreferencesSection>

                    <PreferencesSection>
                        <FormControl>
                            <FormLabel htmlFor="scale">
                                <IconWrapper>
                                    <Icon as={GiResize} />
                                </IconWrapper>
                                Scale
                            </FormLabel>
                            <Select
                                // variant="filled"
                                // bg="gray.100"
                                id="scale"
                                value={scale}
                                onChange={(e) => {
                                    const payload = parseInt(e.target.value)

                                    dispatch({
                                        type: "SET_SCALE",
                                        payload,
                                    })
                                }}
                            >
                                <option value="20">Compact</option>
                                <option value="40">Normal</option>
                                <option value="100">Tall</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="palette">
                                <IconWrapper>
                                    <Icon as={FaPalette} />
                                </IconWrapper>
                                Palette
                            </FormLabel>
                            <Select
                                id="palette"
                                value={palette}
                                onChange={(e) => {
                                    const payload = e.target.value as any

                                    dispatch({
                                        type: "SET_PALETTE",
                                        payload,
                                    })
                                }}
                            >
                                <option value="default">Default</option>
                                <option value="monochrome">Monochrome</option>
                                <option value="accessible">
                                    High contrast
                                </option>
                            </Select>
                        </FormControl>

                        <Grid gridTemplateColumns="1fr 1fr auto" gap={3} pb={2}>
                            <FormControl mr={3}>
                                <FormLabel htmlFor="start">
                                    <IconWrapper>
                                        <TriangleDownIcon />
                                    </IconWrapper>
                                    Start
                                </FormLabel>
                                <Select
                                    id="start"
                                    value={start}
                                    onChange={(e) => {
                                        const payload = e.target.value as any

                                        dispatch({
                                            type: "SET_START",
                                            payload,
                                        })
                                    }}
                                >
                                    {[...Array(15)].map((_, i) => (
                                        <option value={8 + i}>
                                            {8 + i}:00
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mr={3}>
                                <FormLabel htmlFor="end">
                                    <IconWrapper>
                                        <TriangleUpIcon />
                                    </IconWrapper>
                                    End
                                </FormLabel>
                                <Select
                                    id="end"
                                    value={end}
                                    onChange={(e) => {
                                        const payload = e.target.value as any

                                        dispatch({
                                            type: "SET_END",
                                            payload,
                                        })
                                    }}
                                >
                                    {[...Array(22 - start)].map((_, i) => (
                                        <option
                                            value={parseInt(start + "") + 1 + i}
                                        >
                                            {parseInt(start + "") + 1 + i}
                                            :00
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl display="flex" alignItems="flex-end">
                                <Button>Auto</Button>
                            </FormControl>
                        </Grid>
                    </PreferencesSection>
                </DrawerBody>
                {/* 
                <DrawerFooter
                    boxShadow="1px -1px 6px -4px rgba(0,0,0,0.5)"
                    // borderTopWidth="1px"
                >
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    )
}

export default PreferencesDrawer
