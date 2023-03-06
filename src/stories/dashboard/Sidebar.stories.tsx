import React, { ComponentProps } from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { Sidebar } from "../../components/dashboard"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Dashboard/Sidebar",
  component: Sidebar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Sidebar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Sidebar> = (
  args: ComponentProps<typeof Sidebar> | any
) => <Sidebar {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  //   label: 'Side',
}
