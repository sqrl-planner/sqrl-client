import { gql } from "@apollo/client"

export const SET_TIMETABLE_NAME = gql`
  mutation SetTimetableName(
    $id: ID!
    $key: String!
    $name: String!
  ) {
    setTimetableName(
      id: $id
      key: $key
      name: $name
    ) {
      timetable {
        id
        name
      }
    }
  }
`
