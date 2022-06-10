import { gql } from "@apollo/client"

export const SEARCH_COURSES = gql`
  query searchCourses($query: String!, $offset: Int) {
    searchCourses(query: $query, limit: 7, offset: $offset) {
      id
      code
      title
      campus
      term
      breadthCategories
    }
  }
`
