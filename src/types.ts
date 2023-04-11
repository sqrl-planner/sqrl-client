type _Subsession = "first" | "second"
export type RegularSubsession = _Subsession
export type SummerSubsession = _Subsession | "whole"

export type Season = "regular" | "summer"

export type Subsession<S extends Season> = S extends "regular"
  ? RegularSubsession
  : SummerSubsession

export type Session = {
  year: number
  season: Season
  subsession: Subsession<Season>
}

type WeeklyRepetitionSchedule = {
  schedule: number
  isAlternating: boolean
  scheduleBits: string
  weeks: number[]
}

export type Institution = {
  code: string
  name: string
  type: string
  parent?: Institution
  sub_institutions: Institution[]
}

export type Building = {
  code: string
  institution: Institution
  name?: string
  map_url?: string
}

export type CampusLocation = {
  building: Building
  room: string
}

export type SectionMeeting = {
  day: number
  startTime: number
  endTime: number
  session: Session
  location?: Location | null
  repetitionSchedule: WeeklyRepetitionSchedule
}

enum TeachingMethod {
  LECTURE = "LEC",
  TUTORIAL = "TUT",
  PRACTICAL = "PRA",
}

enum SectionDeliveryMode {
  CLASS = "CLASS",
  ONLINE_SYNC = "ONLSYNC",
  ONLINE_ASYNC = "ONLASYNC",
  IN_PERSON = "INPER",
  SYNC = "SYNC",
  ASYNC = "ASYNC",
  ASYIF = "ASYIF",
  SYNIF = "SYNIF",
}

export type Instructor = {
  first_name: string
  last_name: string
}

export type EnrolmentInfo = {
  current_enrolment?: number
  max_enrolment?: number
  has_waitlist: boolean
  current_waitlist_size?: number
  enrolment_indicator?: string
}

export type Section = {
  teaching_method: TeachingMethod
  section_number: string
  meetings: SectionMeeting[]
  instructors: Instructor[]
  delivery_modes: SectionDeliveryMode[]
  subtitle?: string
  cancelled: boolean
  enrolment_info: EnrolmentInfo
  notes: string[]
  linked_sections: string[]
}

enum Term {
  FIRST_SEMESTER = "F",
  SECOND_SEMESTER = "S",
  FULL_YEAR = "Y",
}

enum InstructionLevel {
  UNDERGRADUATE = "undergraduate",
}

type CategoricalRequirement = {
  code: string
  type: "breadth" | "distribution"
  name: string
  description: string
  institutions: Institution[]
}

export type Course = {
  id: string
  code: string
  name: string
  sections: Section[]
  sessions: Session[]
  term: Term
  credits: number
  institution: Institution
  title?: string
  instruction_level?: InstructionLevel
  description?: string
  categorical_requirements: CategoricalRequirement[]
  prerequisites?: string
  corequisites?: string
  exclusions?: string
  recommended_preparation?: string
  cancelled: boolean
  tags: string[]
  notes: string[]
}

export type Timetable = {
  id: string
  name: string
  sections: Record<string, string[]>
  deleted: boolean
  session: Session
}
