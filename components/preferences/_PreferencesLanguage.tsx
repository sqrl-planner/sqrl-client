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

  const { t } = useTranslation("preferences")
  const router = useRouter()
  
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "language",
    defaultValue: router.defaultLocale,
    onChange: (language: "en" | "fr" | "zh") => {
        
      if (language === "en") {
        router.locale = 'en'
      } else if (language === "fr") {
        router.locale = 'fr'
      } else {
        router.locale = 'zh'
      } 
    },
  })    

  const group = getRootProps()

  return (
    <Grid gridTemplateColumns="repeat(3, auto)" {...group} gap={4}>
      {options.map((value) => {
        const radio = getRadioProps({ value, enterKeyHint: "enter" })
        let lang = ''
        switch(value) {
          case 'en':
            lang = "English"
            break
          case 'fr':
            lang = "Français"
            break
          case 'zh':
            lang = "简体中文"
            break
        }
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
              {lang}
            </Box>
          )
        } else {
          return (
            <Link href='/' locale={value}> 
              <button>
                <RadioTextCard key={ value }>
                    { lang }
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
