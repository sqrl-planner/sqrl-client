import { Box, Button, Grid, RadioGroup, useRadioGroup } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import React from "react"
import { usePreferences } from "../../src/PreferencesContext"
import { capitalize } from "../../src/utils/misc"
import RadioTextCard from "./RadioTextCard"
import { Router, useRouter } from 'next/router'
import Link from "next/link"
import { RiLogoutCircleRFill } from "react-icons/ri"

const PreferencesLanguage = () => {
  const options = ["en", "fr", "zh"]

  const {
    state: { language },
    dispatch,
  } = usePreferences()

  const { t } = useTranslation("preferences")
  const router = useRouter()
  
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "language",
    defaultValue: language,
    onChange: (language: "en" | "fr" | "zh") => {
        
      if (language === "en") {
        router.locale = 'en'
        console.log(router.locale)
      } else if (language === "fr") {
        router.locale = 'fr'
        console.log(router.locale)
      } else {
        router.locale = 'zh'
        console.log(router.locale)
      } 
    },
  })    

  const group = getRootProps()

  return (
    <Grid gridTemplateColumns="repeat(3, auto)" {...group} gap={4}>
      {options.map((value) => {
        const radio = getRadioProps({ value, enterKeyHint: "enter" })
        if (value === router.locale) {
          return (
            <Box
              cursor="pointer"
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
              textAlign="center"
              fontWeight={500}
              background="blue.600"
              color="white"
              borderColor="blue.600"
              _focus={{
                boxShadow: "outline",
              }}
              px={3}
              py={2}
            >
              {value}
            </Box>
          )
        } else {
          return (
            <Link href='/' locale={value}> 
              <button>
                <RadioTextCard key={ value }>
                    { t(value) }
                </RadioTextCard>
              </button>
            </Link>
          )
        }
      })}
    </Grid>
  )
}

export default PreferencesLanguage
