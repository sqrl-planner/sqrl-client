import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Caption } from "../../src/components/common/"

export default {
  title: "Text/Caption",
  component: Caption,
} as ComponentMeta<typeof Caption>

const Template: ComponentStory<typeof Caption> = (args) => <Caption {...args} />

export const Session = Template.bind({})
Session.args = {
  children: "2022 winter–2023 summer",
}

export const LoginCTA = Template.bind({})
LoginCTA.args = {
  children: "Login or Sign up",
}
