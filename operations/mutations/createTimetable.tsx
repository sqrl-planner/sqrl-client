import { gql } from "@apollo/client"

export const CREATE_TIMETABLE = gql`
  mutation ($name: String) {
    createTimetable(name: $name) {
      timetable {
        id
        name
      }
      key
    }
  }
`
