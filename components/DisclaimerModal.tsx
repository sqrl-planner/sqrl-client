import { ExternalLinkIcon } from "@chakra-ui/icons"
import {
  Button,
  Checkbox,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  UseDisclosureProps,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import React, { Fragment, useState } from "react"

const DisclaimerModal = (props: {
  disclosure: UseDisclosureProps
  ModalProps: any
}) => {
  const [checkedItems, setCheckedItems] = useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const { onClose } = props.disclosure

  const { t } = useTranslation("modal")

  return (
    <Fragment>
      <Modal
        closeOnOverlayClick={false}
        {...props.ModalProps}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("disclaimers")}</ModalHeader>
          <ModalBody pb={4}>
            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={(e: React.ChangeEvent<any>) =>
                setCheckedItems(() => [
                  e.target.checked,
                  e.target.checked,
                  e.target.checked,
                ])
              }
              pb={2}
            >
              {t("acknowledgement")}
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
              <Checkbox
                isChecked={checkedItems[0]}
                onChange={(e: React.ChangeEvent<any>) =>
                  setCheckedItems([
                    e.target.checked,
                    checkedItems[1],
                    checkedItems[2],
                  ])
                }
                pb={4}
              >
                {t("checklist-one-acorn")} <sup>1</sup>,{" "}
                {t("checklist-one-timetable")}
                <sup>2</sup>, {t("checklist-one-calendar")}
                <sup>3</sup> {t("checklist-one-rest")}
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[1]}
                onChange={(e: React.ChangeEvent<any>) =>
                  setCheckedItems([
                    checkedItems[0],
                    e.target.checked,
                    checkedItems[2],
                  ])
                }
                pb={4}
              >
                {t("checklist-two")}
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[2]}
                onChange={(e: React.ChangeEvent<any>) =>
                  setCheckedItems([
                    checkedItems[0],
                    checkedItems[1],
                    e.target.checked,
                  ])
                }
                pb={4}
              >
                {t("checklist-three")}
              </Checkbox>
            </Stack>
            <Text mt={4}>
              <sup>1</sup>
              <Link
                variant=""
                href="https://acorn.utoronto.ca"
                isExternal
                mr={4}
              >
                ACORN <ExternalLinkIcon mx="2px" />
              </Link>
              {/* </Text>
                        <Text> */}
              <sup>2</sup>
              <Link
                href="https://timetable.iit.artsci.utoronto.ca"
                isExternal
                mr={4}
              >
                {t("timetable")} <ExternalLinkIcon mx="2px" />
              </Link>
              {/* </Text>
                        <Text> */}
              <sup>3</sup>
              <Link
                href="https://artsci.calendar.utoronto.ca/"
                isExternal
                mr={4}
              >
                {t("calendar")} <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              disabled={!allChecked}
              onClick={() => {
                localStorage.setItem("disclaimed", JSON.stringify(true))
                if (onClose) onClose()
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default DisclaimerModal
