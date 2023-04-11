import React, { ReactElement } from "react"

import { ContentLayout, DashboardLayout } from "."
import { headerPageLayout } from "../common/headerLayout"

const pageLayout = (page: ReactElement) => {
  return (
    <DashboardLayout>
      <ContentLayout>{page}</ContentLayout>
    </DashboardLayout>
  )
}

export default pageLayout
