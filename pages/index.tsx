import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"
import Sqrl from "../src/Sqrl"

const Home: NextPage = () => {
    return <Sqrl />
}
export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "sidebar",
                "preferences",
            ])),
        },
    }
}

export default Home
