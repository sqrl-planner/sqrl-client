import { gql } from "@apollo/client"

export const GET_COURSES_BY_ID = gql`
  query CoursesById($ids: [String!]!) {
    coursesById(ids: $ids) {
      id
      breadthCategories
      campus
      code
      corequisites
      deliveryInstructions
      description
      distributionCategories
      exclusions
      organisation {
        code
        name
      }
      prerequisites
      recommendedPreparation
      sections {
        code
        actualEnrolment
        actualWaitlist
        cancelled
        deliveryMode
        enrolmentCapacity
        enrolmentIndicator
        hasWaitlist
        instructors {
          firstName
          lastName
        }
        meetings {
          assignedRoom1
          assignedRoom2
          day
          endTime {
            minute
            hour
          }
          startTime {
            hour
            minute
          }
        }
        sectionNumber
        subtitle
        teachingMethod
      }
      term
      sessionCode
      title
      webTimetableInstructions
    }
  }
`
