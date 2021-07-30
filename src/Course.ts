export interface Schedule {
    [key: string]: {
        meetingDay: string
        meetingStartTime: string
        meetingEndTime: string
        meetingScheduleId: string
        assignedRoom1?: string
        assignedRoom2: string | null
    }
}

export interface Instructors {
    [key: string]: {
        instructorId: string
        firstName: string
        lastName: string
    }
}

export interface StandardMeeting {
    schedule: Schedule | Array<never>
    instructors: Instructors | Array<never>
    meetingId: string
    teachingMethod: string
    sectionNumber: string
    subtitle: string
    cancel: string
    waitlist: string
    deliveryMode: string
    online?: string
    enrollmentCapacity: string
    actualEnrolment: string
    actualWaitlist: string
    enrollmentIndicator: string | null
    meetingStatusNotes: string | null
    enrollmentControls: Array<any>
}

interface StandardMeetings {
    [key: string]: StandardMeeting
}

/**
 * A class representing a course
 */
export interface Course {
    courseId: string
    org: string
    orgName: string
    courseTitle: string
    code: string
    courseDescription: string
    prerequisite: string
    corequisite: string
    exclusion: string
    recommendedPreparation: string
    section: string
    session: string
    webTimetableInstructions: string
    deliveryInstructions: string
    breadthCategories: string
    distributionCategories: string
    meetings: StandardMeetings
}

export const courseOne: Course = {
    courseId: "51272",
    org: "SMC",
    orgName: "St. Michael's College (SMC) (BMS) (CHC) (CLT) (JCA) (MST)",
    courseTitle: "Introduction to Book & Media Studies",
    code: "BMS100H1",
    courseDescription:
        "<p>Introduces the academic study of media in all its forms, including books and print media as well as modern electronic and digital media. Provides an overview of key theories of media, culture, and society and relates them to contemporary issues, enabling students to apply different critical approaches to their everyday experiences with media.</p>",
    prerequisite: "",
    corequisite: "",
    exclusion: "SMC219Y1",
    recommendedPreparation: "",
    section: "F",
    session: "20219",
    webTimetableInstructions: "",
    deliveryInstructions:
        "<p>Lectures and tutorials will be delivered online per the meeting schedule. Students are expected to attend online lectures and participate in active learning activities. Lectures will be also recorded and shared on Quercus for students to review on their own time. Slides and other learning materials, such as weekly readings and case studies will be posted on Quercus.</p>",
    breadthCategories: "Creative and Cultural Representations (1)",
    distributionCategories: "Humanities",
    meetings: {
        "LEC-9901": {
            schedule: {
                "WE-293917": {
                    meetingDay: "WE",
                    meetingStartTime: "10:00",
                    meetingEndTime: "12:00",
                    meetingScheduleId: "293917",
                    assignedRoom1: "",
                    assignedRoom2: null,
                },
            },
            instructors: {
                "7382610": {
                    instructorId: "7382610",
                    firstName: "P",
                    lastName: "Granata",
                },
            },
            meetingId: "200095",
            teachingMethod: "LEC",
            sectionNumber: "9901",
            subtitle: "",
            cancel: "",
            waitlist: "Y",
            deliveryMode: "ONLSYNC",
            online: "Online - Synchronous (See Delivery Instructions.)",
            enrollmentCapacity: "100",
            actualEnrolment: "100",
            actualWaitlist: "116",
            enrollmentIndicator: null,
            meetingStatusNotes: "",
            enrollmentControls: [],
        },
        "TUT-0101": {
            schedule: {
                "TH-273101": {
                    meetingDay: "TH",
                    meetingStartTime: "12:00",
                    meetingEndTime: "13:00",
                    meetingScheduleId: "273101",
                    assignedRoom1: "",
                    assignedRoom2: null,
                },
            },
            instructors: [],
            meetingId: "200583",
            teachingMethod: "TUT",
            sectionNumber: "0101",
            subtitle: "",
            cancel: "",
            waitlist: "N",
            deliveryMode: "ONLSYNC",
            online: "Online - Synchronous (See Delivery Instructions.)",
            enrollmentCapacity: "25",
            actualEnrolment: "25",
            actualWaitlist: "0",
            enrollmentIndicator: null,
            meetingStatusNotes: null,
            enrollmentControls: [],
        },
        "TUT-0102": {
            schedule: {
                "TH-295323": {
                    meetingDay: "TH",
                    meetingStartTime: "12:00",
                    meetingEndTime: "13:00",
                    meetingScheduleId: "295323",
                    assignedRoom1: "",
                    assignedRoom2: null,
                },
            },
            instructors: [],
            meetingId: "200584",
            teachingMethod: "TUT",
            sectionNumber: "0102",
            subtitle: "",
            cancel: "",
            waitlist: "N",
            deliveryMode: "ONLSYNC",
            online: "Online - Synchronous (See Delivery Instructions.)",
            enrollmentCapacity: "25",
            actualEnrolment: "25",
            actualWaitlist: "0",
            enrollmentIndicator: null,
            meetingStatusNotes: "",
            enrollmentControls: [],
        },
        "TUT-0103": {
            schedule: {
                "TH-295324": {
                    meetingDay: "TH",
                    meetingStartTime: "12:00",
                    meetingEndTime: "13:00",
                    meetingScheduleId: "295324",
                    assignedRoom1: "",
                    assignedRoom2: null,
                },
            },
            instructors: [],
            meetingId: "200585",
            teachingMethod: "TUT",
            sectionNumber: "0103",
            subtitle: "",
            cancel: "",
            waitlist: "N",
            deliveryMode: "ONLSYNC",
            online: "Online - Synchronous (See Delivery Instructions.)",
            enrollmentCapacity: "25",
            actualEnrolment: "24",
            actualWaitlist: "0",
            enrollmentIndicator: null,
            meetingStatusNotes: "",
            enrollmentControls: [],
        },
        "TUT-0104": {
            schedule: {
                "TH-295325": {
                    meetingDay: "TH",
                    meetingStartTime: "12:00",
                    meetingEndTime: "13:00",
                    meetingScheduleId: "295325",
                    assignedRoom1: "",
                    assignedRoom2: null,
                },
            },
            instructors: [],
            meetingId: "200586",
            teachingMethod: "TUT",
            sectionNumber: "0104",
            subtitle: "",
            cancel: "",
            waitlist: "N",
            deliveryMode: "ONLSYNC",
            online: "Online - Synchronous (See Delivery Instructions.)",
            enrollmentCapacity: "25",
            actualEnrolment: "18",
            actualWaitlist: "0",
            enrollmentIndicator: null,
            meetingStatusNotes: "",
            enrollmentControls: [],
        },
    },
}

export const courseTwo: Course = {
    courseId: "52579",
    org: "SLA",
    orgName: "Slavic Languages and Literature (SLA) (EST) (FIN) (JSH) (SWE)",
    courseTitle: "Elementary Estonian Language and Culture I",
    code: "EST100H1",
    courseDescription:
        "<p>Learn essential Estonian vocabulary, basic grammar and develop elementary conversational competence. Popular songs, poetry, and structured dialogue are among the various tools for achieving these objectives. Students will learn commonly used phrases and expressions used in everyday situations, from greeting people to making purchases in stores, and ordering meals in cafes. The course is designed for students with either no fluency or minimum fluency in Estonian.</p>",
    prerequisite: "",
    corequisite: "",
    exclusion: "EST100Y1",
    recommendedPreparation: "",
    section: "F",
    session: "20219",
    webTimetableInstructions: "",
    deliveryInstructions: "",
    breadthCategories: "Creative and Cultural Representations (1)",
    distributionCategories: "Humanities",
    meetings: {
        "LEC-5101": {
            schedule: {
                "MO-287230": {
                    meetingDay: "MO",
                    meetingStartTime: "18:00",
                    meetingEndTime: "20:00",
                    meetingScheduleId: "287230",
                    assignedRoom1: "",
                    assignedRoom2: null,
                },
                "TH-287231": {
                    meetingDay: "TH",
                    meetingStartTime: "18:00",
                    meetingEndTime: "20:00",
                    meetingScheduleId: "287231",
                    assignedRoom1: "",
                    assignedRoom2: null,
                },
            },
            instructors: [],
            meetingId: "195251",
            teachingMethod: "LEC",
            sectionNumber: "5101",
            subtitle: "",
            cancel: "",
            waitlist: "Y",
            deliveryMode: "CLASS",
            online: "In Person",
            enrollmentCapacity: "25",
            actualEnrolment: "2",
            actualWaitlist: "0",
            enrollmentIndicator: null,
            meetingStatusNotes: null,
            enrollmentControls: [],
        },
    },
}

export const courseThree: Course = JSON.parse(` {
        "courseId": "54578",
        "org": "POL",
        "orgName": "Political Science (POL) (JHP) (JPA) (JPD) (JPF) (JPI) (JPP) (JPR) (JPS) (JPU) (JRA)",
        "courseTitle": "The Real World of Politics: An Introduction",
        "code": "POL101H1",
        "courseDescription": "<p>This course introduces students to compelling issues of contemporary politics through the lens of classic and important texts in political science. The course covers the politics of climate change, Indigenous rights, elections and electoral systems, terrorism, social movements and political activism, voting, democracy, and power.<\/p>",
        "prerequisite": "",
        "corequisite": "",
        "exclusion": "POL101Y1",
        "recommendedPreparation": "",
        "section": "F",
        "session": "20219",
        "webTimetableInstructions": "<p>Delivery Method:<\/p><p>LEC0101<\/p><ul><li>ONLINE ASYNCHRONOUS<\/li><li>Tutorials:&nbsp; some IN PERSON; some ONLINE SYNCHRONOUS<\/li><\/ul><p>&nbsp;<\/p>",
        "deliveryInstructions": "<ul><li>Lectures will be delivered online asynchronous; learning is self-paced and not reliant on a meeting schedule.<\/li><li>Half tutorials will be available as online synchronous and half will be in person at their scheduled times.<\/li><li>It is recommended that students have a computer with a microphone and camera in order to participate in online activities.<\/li><\/ul>",
        "breadthCategories": "Society and its Institutions (3)",
        "distributionCategories": "Social Science",
        "meetings": {
            "LEC-0101": {
                "schedule": {
                    "-": {
                        "meetingDay": null,
                        "meetingStartTime": null,
                        "meetingEndTime": null,
                        "meetingScheduleId": null,
                        "assignedRoom1": null,
                        "assignedRoom2": null
                    }
                },
                "instructors": {
                    "7383661": {
                        "instructorId": "7383661",
                        "firstName": "C",
                        "lastName": "Jung"
                    }
                },
                "meetingId": "198261",
                "teachingMethod": "LEC",
                "sectionNumber": "0101",
                "subtitle": "",
                "cancel": "",
                "waitlist": "Y",
                "deliveryMode": "ONLASYNC",
                "online": "Asynchronous (See Delivery Instructions.)",
                "contactHours": "3.0",
                "enrollmentCapacity": "1050",
                "actualEnrolment": "938",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0101": {
                "schedule": {
                    "WE-285597": {
                        "meetingDay": "WE",
                        "meetingStartTime": "14:00",
                        "meetingEndTime": "15:00",
                        "meetingScheduleId": "285597",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198262",
                "teachingMethod": "TUT",
                "sectionNumber": "0101",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0102": {
                "schedule": {
                    "WE-285599": {
                        "meetingDay": "WE",
                        "meetingStartTime": "14:00",
                        "meetingEndTime": "15:00",
                        "meetingScheduleId": "285599",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198263",
                "teachingMethod": "TUT",
                "sectionNumber": "0102",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0103": {
                "schedule": {
                    "WE-283709": {
                        "meetingDay": "WE",
                        "meetingStartTime": "14:00",
                        "meetingEndTime": "15:00",
                        "meetingScheduleId": "283709",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198264",
                "teachingMethod": "TUT",
                "sectionNumber": "0103",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0201": {
                "schedule": {
                    "WE-284108": {
                        "meetingDay": "WE",
                        "meetingStartTime": "15:00",
                        "meetingEndTime": "16:00",
                        "meetingScheduleId": "284108",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198265",
                "teachingMethod": "TUT",
                "sectionNumber": "0201",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0202": {
                "schedule": {
                    "WE-283727": {
                        "meetingDay": "WE",
                        "meetingStartTime": "15:00",
                        "meetingEndTime": "16:00",
                        "meetingScheduleId": "283727",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198266",
                "teachingMethod": "TUT",
                "sectionNumber": "0202",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0203": {
                "schedule": {
                    "WE-283728": {
                        "meetingDay": "WE",
                        "meetingStartTime": "15:00",
                        "meetingEndTime": "16:00",
                        "meetingScheduleId": "283728",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198267",
                "teachingMethod": "TUT",
                "sectionNumber": "0203",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0301": {
                "schedule": {
                    "WE-284110": {
                        "meetingDay": "WE",
                        "meetingStartTime": "16:00",
                        "meetingEndTime": "17:00",
                        "meetingScheduleId": "284110",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198268",
                "teachingMethod": "TUT",
                "sectionNumber": "0301",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0302": {
                "schedule": {
                    "WE-284119": {
                        "meetingDay": "WE",
                        "meetingStartTime": "16:00",
                        "meetingEndTime": "17:00",
                        "meetingScheduleId": "284119",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198269",
                "teachingMethod": "TUT",
                "sectionNumber": "0302",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0303": {
                "schedule": {
                    "WE-283751": {
                        "meetingDay": "WE",
                        "meetingStartTime": "16:00",
                        "meetingEndTime": "17:00",
                        "meetingScheduleId": "283751",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198270",
                "teachingMethod": "TUT",
                "sectionNumber": "0303",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0401": {
                "schedule": {
                    "TH-283782": {
                        "meetingDay": "TH",
                        "meetingStartTime": "11:00",
                        "meetingEndTime": "12:00",
                        "meetingScheduleId": "283782",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198271",
                "teachingMethod": "TUT",
                "sectionNumber": "0401",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0402": {
                "schedule": {
                    "TH-283788": {
                        "meetingDay": "TH",
                        "meetingStartTime": "11:00",
                        "meetingEndTime": "12:00",
                        "meetingScheduleId": "283788",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198272",
                "teachingMethod": "TUT",
                "sectionNumber": "0402",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0403": {
                "schedule": {
                    "TH-283798": {
                        "meetingDay": "TH",
                        "meetingStartTime": "11:00",
                        "meetingEndTime": "12:00",
                        "meetingScheduleId": "283798",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198273",
                "teachingMethod": "TUT",
                "sectionNumber": "0403",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "24",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0501": {
                "schedule": {
                    "TH-283810": {
                        "meetingDay": "TH",
                        "meetingStartTime": "12:00",
                        "meetingEndTime": "13:00",
                        "meetingScheduleId": "283810",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198274",
                "teachingMethod": "TUT",
                "sectionNumber": "0501",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0502": {
                "schedule": {
                    "TH-283812": {
                        "meetingDay": "TH",
                        "meetingStartTime": "12:00",
                        "meetingEndTime": "13:00",
                        "meetingScheduleId": "283812",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198275",
                "teachingMethod": "TUT",
                "sectionNumber": "0502",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0503": {
                "schedule": {
                    "TH-283816": {
                        "meetingDay": "TH",
                        "meetingStartTime": "12:00",
                        "meetingEndTime": "13:00",
                        "meetingScheduleId": "283816",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198276",
                "teachingMethod": "TUT",
                "sectionNumber": "0503",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0601": {
                "schedule": {
                    "TH-283823": {
                        "meetingDay": "TH",
                        "meetingStartTime": "13:00",
                        "meetingEndTime": "14:00",
                        "meetingScheduleId": "283823",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198277",
                "teachingMethod": "TUT",
                "sectionNumber": "0601",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0602": {
                "schedule": {
                    "TH-283832": {
                        "meetingDay": "TH",
                        "meetingStartTime": "13:00",
                        "meetingEndTime": "14:00",
                        "meetingScheduleId": "283832",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198278",
                "teachingMethod": "TUT",
                "sectionNumber": "0602",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0603": {
                "schedule": {
                    "TH-283838": {
                        "meetingDay": "TH",
                        "meetingStartTime": "13:00",
                        "meetingEndTime": "14:00",
                        "meetingScheduleId": "283838",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198279",
                "teachingMethod": "TUT",
                "sectionNumber": "0603",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0701": {
                "schedule": {
                    "TH-283846": {
                        "meetingDay": "TH",
                        "meetingStartTime": "14:00",
                        "meetingEndTime": "15:00",
                        "meetingScheduleId": "283846",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198280",
                "teachingMethod": "TUT",
                "sectionNumber": "0701",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0702": {
                "schedule": {
                    "TH-283851": {
                        "meetingDay": "TH",
                        "meetingStartTime": "14:00",
                        "meetingEndTime": "15:00",
                        "meetingScheduleId": "283851",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198281",
                "teachingMethod": "TUT",
                "sectionNumber": "0702",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0703": {
                "schedule": {
                    "TH-283852": {
                        "meetingDay": "TH",
                        "meetingStartTime": "14:00",
                        "meetingEndTime": "15:00",
                        "meetingScheduleId": "283852",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198282",
                "teachingMethod": "TUT",
                "sectionNumber": "0703",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "19",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0801": {
                "schedule": {
                    "TH-283855": {
                        "meetingDay": "TH",
                        "meetingStartTime": "15:00",
                        "meetingEndTime": "16:00",
                        "meetingScheduleId": "283855",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198283",
                "teachingMethod": "TUT",
                "sectionNumber": "0801",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0802": {
                "schedule": {
                    "TH-283859": {
                        "meetingDay": "TH",
                        "meetingStartTime": "15:00",
                        "meetingEndTime": "16:00",
                        "meetingScheduleId": "283859",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198284",
                "teachingMethod": "TUT",
                "sectionNumber": "0802",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-0803": {
                "schedule": {
                    "TH-294985": {
                        "meetingDay": "TH",
                        "meetingStartTime": "15:00",
                        "meetingEndTime": "16:00",
                        "meetingScheduleId": "294985",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198285",
                "teachingMethod": "TUT",
                "sectionNumber": "0803",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "12",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-0901": {
                "schedule": {
                    "TH-294986": {
                        "meetingDay": "TH",
                        "meetingStartTime": "16:00",
                        "meetingEndTime": "17:00",
                        "meetingScheduleId": "294986",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198286",
                "teachingMethod": "TUT",
                "sectionNumber": "0901",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-0902": {
                "schedule": {
                    "TH-294987": {
                        "meetingDay": "TH",
                        "meetingStartTime": "16:00",
                        "meetingEndTime": "17:00",
                        "meetingScheduleId": "294987",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198287",
                "teachingMethod": "TUT",
                "sectionNumber": "0902",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "10",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-0903": {
                "schedule": {
                    "TH-294988": {
                        "meetingDay": "TH",
                        "meetingStartTime": "16:00",
                        "meetingEndTime": "17:00",
                        "meetingScheduleId": "294988",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198288",
                "teachingMethod": "TUT",
                "sectionNumber": "0903",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "6",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1001": {
                "schedule": {
                    "FR-294989": {
                        "meetingDay": "FR",
                        "meetingStartTime": "11:00",
                        "meetingEndTime": "12:00",
                        "meetingScheduleId": "294989",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198289",
                "teachingMethod": "TUT",
                "sectionNumber": "1001",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1002": {
                "schedule": {
                    "FR-294990": {
                        "meetingDay": "FR",
                        "meetingStartTime": "11:00",
                        "meetingEndTime": "12:00",
                        "meetingScheduleId": "294990",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198290",
                "teachingMethod": "TUT",
                "sectionNumber": "1002",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1003": {
                "schedule": {
                    "FR-294991": {
                        "meetingDay": "FR",
                        "meetingStartTime": "11:00",
                        "meetingEndTime": "12:00",
                        "meetingScheduleId": "294991",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198291",
                "teachingMethod": "TUT",
                "sectionNumber": "1003",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1101": {
                "schedule": {
                    "FR-294992": {
                        "meetingDay": "FR",
                        "meetingStartTime": "12:00",
                        "meetingEndTime": "13:00",
                        "meetingScheduleId": "294992",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198292",
                "teachingMethod": "TUT",
                "sectionNumber": "1101",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1102": {
                "schedule": {
                    "FR-294993": {
                        "meetingDay": "FR",
                        "meetingStartTime": "12:00",
                        "meetingEndTime": "13:00",
                        "meetingScheduleId": "294993",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198293",
                "teachingMethod": "TUT",
                "sectionNumber": "1102",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "6",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1103": {
                "schedule": {
                    "FR-294994": {
                        "meetingDay": "FR",
                        "meetingStartTime": "12:00",
                        "meetingEndTime": "13:00",
                        "meetingScheduleId": "294994",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198294",
                "teachingMethod": "TUT",
                "sectionNumber": "1103",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "10",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1201": {
                "schedule": {
                    "FR-294995": {
                        "meetingDay": "FR",
                        "meetingStartTime": "13:00",
                        "meetingEndTime": "14:00",
                        "meetingScheduleId": "294995",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198295",
                "teachingMethod": "TUT",
                "sectionNumber": "1201",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1202": {
                "schedule": {
                    "FR-294996": {
                        "meetingDay": "FR",
                        "meetingStartTime": "13:00",
                        "meetingEndTime": "14:00",
                        "meetingScheduleId": "294996",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198296",
                "teachingMethod": "TUT",
                "sectionNumber": "1202",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "5",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1301": {
                "schedule": {
                    "FR-294997": {
                        "meetingDay": "FR",
                        "meetingStartTime": "14:00",
                        "meetingEndTime": "15:00",
                        "meetingScheduleId": "294997",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "201939",
                "teachingMethod": "TUT",
                "sectionNumber": "1301",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-1302": {
                "schedule": {
                    "FR-294998": {
                        "meetingDay": "FR",
                        "meetingStartTime": "14:00",
                        "meetingEndTime": "15:00",
                        "meetingScheduleId": "294998",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "201940",
                "teachingMethod": "TUT",
                "sectionNumber": "1302",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "18",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": "",
                "enrollmentControls": []
            },
            "TUT-5101": {
                "schedule": {
                    "WE-284114": {
                        "meetingDay": "WE",
                        "meetingStartTime": "17:00",
                        "meetingEndTime": "18:00",
                        "meetingScheduleId": "284114",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198297",
                "teachingMethod": "TUT",
                "sectionNumber": "5101",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "CLASS",
                "online": "In Person (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "25",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-5102": {
                "schedule": {
                    "WE-283766": {
                        "meetingDay": "WE",
                        "meetingStartTime": "17:00",
                        "meetingEndTime": "18:00",
                        "meetingScheduleId": "283766",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198298",
                "teachingMethod": "TUT",
                "sectionNumber": "5102",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "10",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-5103": {
                "schedule": {
                    "WE-283770": {
                        "meetingDay": "WE",
                        "meetingStartTime": "17:00",
                        "meetingEndTime": "18:00",
                        "meetingScheduleId": "283770",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198299",
                "teachingMethod": "TUT",
                "sectionNumber": "5103",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "5",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-5201": {
                "schedule": {
                    "WE-283774": {
                        "meetingDay": "WE",
                        "meetingStartTime": "20:00",
                        "meetingEndTime": "21:00",
                        "meetingScheduleId": "283774",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198300",
                "teachingMethod": "TUT",
                "sectionNumber": "5201",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "10",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            },
            "TUT-5202": {
                "schedule": {
                    "WE-283776": {
                        "meetingDay": "WE",
                        "meetingStartTime": "20:00",
                        "meetingEndTime": "21:00",
                        "meetingScheduleId": "283776",
                        "assignedRoom1": "",
                        "assignedRoom2": null
                    }
                },
                "instructors": [],
                "meetingId": "198301",
                "teachingMethod": "TUT",
                "sectionNumber": "5202",
                "subtitle": "",
                "cancel": "",
                "waitlist": "N",
                "deliveryMode": "ONLSYNC",
                "online": "Online - Synchronous (See Delivery Instructions.)",
                "enrollmentCapacity": "25",
                "actualEnrolment": "3",
                "actualWaitlist": "0",
                "enrollmentIndicator": null,
                "meetingStatusNotes": null,
                "enrollmentControls": []
            }
        }
    }`)
