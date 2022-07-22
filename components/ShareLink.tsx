import {
  Text,
  FormControl,
  Flex,
  Icon,
  Input,
  FormHelperText,
  Button,
  useClipboard,
  useToast,
  Skeleton,
} from "@chakra-ui/react"

import { FaShareSquare } from "react-icons/fa"
import { useRouter } from "next/router"
import { CopyIcon } from "@chakra-ui/icons"
import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"
import useSWR from "swr"
import fetcher from "../src/utils/fetcher"
import getSharePrefix from "../src/utils/getSharePrefix"

const useShortLink = (url: string) => {
  const { data, error } = useSWR(`/api/shorten?url=${url}`, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

const ShareLink = () => {
  const router = useRouter()

  const id = router.query.id

  const sharePrefix = getSharePrefix()
  const fullUrl = `${sharePrefix}${id}`

  const [urlToShare, setUrlToShare] = useState(fullUrl)

  const toast = useToast()
  const { t } = useTranslation("modal")

  const { data: shortLink, isLoading, isError } = useShortLink(fullUrl)

  useEffect(() => {
    if(shortLink?.shortUrl) setUrlToShare(shortLink.shortUrl)
  }, [shortLink])

  const { onCopy, hasCopied } = useClipboard(urlToShare)

  useEffect(() => {
    if (!hasCopied) return

    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }, [toast, hasCopied])

  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      // mb={6}
    >
      <FormControl as="span">
        <Text as="span" display="flex" alignItems="center">
          <Icon as={FaShareSquare} mr={2} /> {t("share-read-only")}
        </Text>
        <Flex my={2} alignItems="center" gap={4} justifyContent="space-between">
          {isLoading ? (
            <Skeleton alignSelf="stretch" flex="1" />
          ) : (
            <Input
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
              fontWeight={500}
              value={urlToShare}
              flex="1"
              onFocus={(e) => e.target.select()}
              onChange={() => {}}
            />
          )}
          <Button
            isLoading={isLoading}
            loadingText={t("copy-link")}
            onClick={onCopy}
            colorScheme="blue"
            bg="blue.700"
          >
            <CopyIcon mr={2} /> {t("copy-link")}
          </Button>
        </Flex>
        <FormHelperText fontWeight={400}>
          {t("share-read-only-description")}
        </FormHelperText>
      </FormControl>
    </Flex>
  )
}

export default ShareLink
