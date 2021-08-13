import type { NextPage } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"
import Sqrl from "../Sqrl"

const Home: NextPage = () => {
    return <Sqrl />
}
export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "sidebar"])),
        },
    }
}

export default Home
