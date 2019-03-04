
export const PROJECT_MANAGER = {
    searchProject: '/api/services/app/ProjectService/Filter',
}

export const APP_CONSTANT = {
    EnumProjectStatus: {
        Active: 0,
        Deactive: 1
    },
    EnumProjectType: {
        Timeandmaterials: 0,
        Fixedfee: 1,
        Nonbillable: 2
    },
    EnumTaskType: {
        Commontask: 0,
        Orthertask: 1
    },
    EnumTypeOfWork: {
        Normalworkinghours: 0,
        Overtime: 1
    },
    TimesheetStatus: {
        None: 0,
        Pending: 1,
        Approve: 2,
        Reject: 3
    },
    EnumDayOfWeek: {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    }
}