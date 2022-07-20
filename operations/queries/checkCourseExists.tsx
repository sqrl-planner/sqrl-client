import { gql } from "@apollo/client"

export const CHECK_COURSE_EXISTS = gql`
  query CourseById($id: String!) {
    courseById(id: $id) {
      id
    }
  }
`
