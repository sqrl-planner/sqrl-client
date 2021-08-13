/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Campus, SectionDeliveryMode, MeetingDay, SectionTeachingMethod, CourseTerm } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Course
// ====================================================

export interface Course_searchCourses_organisation {
  __typename: "_OrganisationObject";
  /**
   * _id
   */
  code: string;
  name: string;
}

export interface Course_searchCourses_sections_instructors {
  __typename: "_InstructorObject";
  firstName: string;
  lastName: string;
}

export interface Course_searchCourses_sections_meetings_endTime {
  __typename: "_TimeObject";
  minute: number;
  hour: number;
}

export interface Course_searchCourses_sections_meetings_startTime {
  __typename: "_TimeObject";
  hour: number;
  minute: number;
}

export interface Course_searchCourses_sections_meetings {
  __typename: "_SectionMeetingObject";
  assignedRoom1: string | null;
  assignedRoom2: string | null;
  day: MeetingDay;
  /**
   * A class representing an HH:MM time in 24-hour format.
   */
  endTime: Course_searchCourses_sections_meetings_endTime;
  /**
   * A class representing an HH:MM time in 24-hour format.
   */
  startTime: Course_searchCourses_sections_meetings_startTime;
}

export interface Course_searchCourses_sections {
  __typename: "_SectionObject";
  actualEnrolment: number | null;
  actualWaitlist: number | null;
  cancelled: boolean | null;
  deliveryMode: SectionDeliveryMode | null;
  enrolmentCapacity: number | null;
  enrolmentIndicator: string | null;
  hasWaitlist: boolean | null;
  instructors: (Course_searchCourses_sections_instructors | null)[] | null;
  code: string | null;
  meetings: (Course_searchCourses_sections_meetings | null)[] | null;
  sectionNumber: string | null;
  subtitle: string | null;
  teachingMethod: SectionTeachingMethod | null;
}

export interface Course_searchCourses {
  __typename: "_CourseObject";
  /**
   * _id
   */
  id: string;
  breadthCategories: string | null;
  campus: Campus;
  code: string | null;
  corequisites: string | null;
  deliveryInstructions: string | null;
  description: string | null;
  distributionCategories: string | null;
  exclusions: string | null;
  /**
   * A class representing a department (which offers courses).
   * 
   * Instance Attributes:
   *     code: A unique string representing this organisation.
   *     name: The full name of this organisation.
   */
  organisation: Course_searchCourses_organisation | null;
  prerequisites: string | null;
  recommendedPreparation: string | null;
  sections: (Course_searchCourses_sections | null)[] | null;
  term: CourseTerm | null;
  sessionCode: string | null;
  title: string | null;
  webTimetableInstructions: string | null;
}

export interface Course {
  searchCourses: (Course_searchCourses | null)[] | null;
}
