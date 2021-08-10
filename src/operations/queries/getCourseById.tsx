import { gql } from "@apollo/client"

export const GET_COURSE_BY_ID = gql`
    query CourseById($id: String!) {
        courseById(id: $id) {
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
