import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { Button } from "../components/common"

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Session = Template.bind({})
Session.args = {
  children: "2022 winter–2023 summer",
}

export const LoginCTA = Template.bind({})
LoginCTA.args = {
  children: "Login or Sign up",
}
