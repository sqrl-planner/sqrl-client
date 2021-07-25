import { SettingsIcon } from "@chakra-ui/icons"
import { Heading, Input, useToast } from "@chakra-ui/react"
import React, { useEffect } from "react"
import styled from "styled-components"

const HeaderComponent = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100vw;
    background-color: #fff;
    z-index: 10;
    box-shadow: 0px 1px 8px -7px rgba(0, 0, 0, 0.4);
`

const Program = styled.div`
    &::before {
        content: "program of study";
        position: absolute;
        font-variant: small-caps;
        font-size: 0.8em;
        font-weight: 800;
        color: #555;
        top: 1.5em;
    }
`

const Header = () => {
    return (
        <HeaderComponent>
            <Heading m={6} as="h1" size="xl">
                Sqrl
            </Heading>
            <Program>
                Computer Science specialist + Mathematics minor + Cognitive
                Psychology major
            </Program>
            <Input
                width="40%"
                boxShadow="1px 1px 8px -6px rgba(0, 0, 0, 0.4)"
                autoFocus
                ml={6}
                mr={6}
                placeholder="Search for a course"
            />
            <div>
                <SettingsIcon w={8} h={8} mr={4} />
            </div>
        </HeaderComponent>
    )
}

export default Header
