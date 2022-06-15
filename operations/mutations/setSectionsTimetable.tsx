import { gql } from "@apollo/client"

export const SET_SECTIONS_TIMETABLE = gql`
  mutation setSectionsTimetable(
    $id: ID!
    $key: String!
    $courseId: String!
    $sections: [String]!
  ) {
    setSectionsTimetable(
      id: $id
      key: $key
      courseId: $courseId
      sections: $sections
    ) {
      timetable {
        id
      }
    }
  }
`
