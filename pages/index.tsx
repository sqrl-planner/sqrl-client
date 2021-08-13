import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { gql } from "@apollo/client"
import client from "../apollo-client"
import React from "react"
import { Heading } from "@chakra-ui/react"
import Sqrl from "../Sqrl"

const Home: NextPage = () => {
    return <Sqrl />
}

export default Home
