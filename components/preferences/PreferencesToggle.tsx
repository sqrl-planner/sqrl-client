import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  IconProps,
  Switch,
} from "@chakra-ui/react"
import React, { ChangeEvent } from "react"
import styled from "styled-components"
import { Action, usePreferences } from "../../src/PreferencesContext"

const IconWrapper = styled.div`
  padding-right: 0.6em;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface PreferencesToggleProps {
  isChecked: any
  actionType?: Action["type"] | any
  iconProps: IconProps | any
  children: React.ReactNode
  helperText?: string
  onToggle?: (event: ChangeEvent<HTMLInputElement>) => void
  id?: string
}

const PreferencesToggle = ({
  isChecked: state,
  actionType,
  iconProps,
  children,
  helperText,
  onToggle,
  id,
}: PreferencesToggleProps) => {
  const { dispatch } = usePreferences()
  return (
    <FormControl>
      <Flex alignItems="center" width="100%" justifyContent="space-between">
        <FormLabel htmlFor={actionType ?? id} mb="0">
          <IconWrapper>
            <Icon {...iconProps} />
          </IconWrapper>
          {children}
        </FormLabel>
        <Switch
          size="lg"
          id={actionType ?? id}
          isChecked={state}
          onChange={
            onToggle
              ? onToggle
              : (e: React.ChangeEvent<any>) => {
                  const payload = e.target.checked

                  dispatch({
                    type: actionType,
                    payload,
                  })
                }
          }
        />
      </Flex>
      {helperText && (
        <FormHelperText fontSize="0.9em">{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default PreferencesToggle
