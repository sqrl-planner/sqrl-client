import { gql } from "@apollo/client"

export const GET_SAMPLE_COURSE = gql`
    query Course {
        searchCourses(query: "calculus") {
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
                code
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
