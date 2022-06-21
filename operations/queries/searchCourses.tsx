import { gql } from "@apollo/client"

export const SEARCH_COURSES = gql`
  query searchCourses($query: String!, $limit: Int, $offset: Int) {
    searchCourses(query: $query, limit: $limit, offset: $offset) {
      id
      code
      title
      campus
      term
      breadthCategories
    }
  }
`
