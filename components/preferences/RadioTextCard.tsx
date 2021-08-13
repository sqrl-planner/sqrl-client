import { useRadio, Box } from "@chakra-ui/react"
import React from "react"

const RadioTextCard = (props: any) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                textAlign="center"
                fontWeight={500}
                _checked={{
                    bg: "blue.600",
                    color: "white",
                    borderColor: "blue.600",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                px={3}
                py={2}
            >
                {props.children}
            </Box>
        </Box>
    )
}

export default RadioTextCard
