import { gql } from "@apollo/client"

export const DUPLICATE_TIMETABLE = gql`
  mutation DuplicateTimetable($id: ID!) {
    duplicateTimetable(id: $id) {
      timetable {
        id
        name
      }
      key
    }
  }
`
