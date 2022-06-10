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
import React, { Fragment, useState } from "react"

const DisclaimerModal = (props: {
  disclosure: UseDisclosureProps
  ModalProps: any
}) => {
  const [checkedItems, setCheckedItems] = useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const { onClose } = props.disclosure

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
          <ModalHeader>Disclaimers</ModalHeader>
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
              I understand that...
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
                The information on ACORN<sup>1</sup>, the Faculty of Arts &
                Science timetable<sup>2</sup>, and the Faculty of Arts & Science
                calendar
                <sup>3</sup> take precedence over any information presented
                here.
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
                Sqrl is not affiliated with the University in any official
                capacity.
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
                Sqrl cannot enrol in courses for you.
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
                Timetable <ExternalLinkIcon mx="2px" />
              </Link>
              {/* </Text>
                        <Text> */}
              <sup>3</sup>
              <Link
                href="https://artsci.calendar.utoronto.ca/"
                isExternal
                mr={4}
              >
                Calendar <ExternalLinkIcon mx="2px" />
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
