import { gql } from "@apollo/client"

export const REMOVE_COURSE_TIMETABLE = gql`
  mutation removeCourseTimetable($id: ID!, $key: String!, $courseId: String!) {
    removeCourseTimetable(id: $id, key: $key, courseId: $courseId) {
      timetable {
        id
        sections
      }
    }
  }
`
