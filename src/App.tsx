import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { Timetable } from "./components/Timetable"
import styled from "styled-components"

const Test = styled.div`
  background-color:red;
`

export const App = () => (
  <ChakraProvider theme={theme}>
    {/* <Box textAlign="center" fontSize="xl"> */}
    {/* <Grid minH="100vh" p={3}> */}
    {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
    <Timetable />
    <Test>benis</Test>
    {/* </Grid> */}
    {/* </Box> */}
  </ChakraProvider>
)
