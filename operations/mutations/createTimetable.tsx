import { gql } from "@apollo/client"

export const CREATE_TIMETABLE = gql`
mutation {
  createTimetable {
    timetable {
      id
    }
    key
  }
}
`
