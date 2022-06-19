import { gql } from "@apollo/client"

export const GET_TIMETABLE_BY_ID = gql`
  query timetableById($id: ID!) {
    timetableById(id: $id) {
      name
      sections
    }
  }
`
