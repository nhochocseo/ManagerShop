import { APP_CONSTANT } from "./api.constants";

export const APP_CONFIG = {
    EnumProjectStatus: [
        {
            value: APP_CONSTANT.EnumProjectStatus.Active,
            name: 'Active'
        },
        {
            value: APP_CONSTANT.EnumProjectStatus.Deactive,
            name: 'Deactive'
        }
    ],
    // EnumProjectType: {
    //     Timeandmaterials: 0,
    //     Fixedfee: 1,
    //     Nonbillable: 2
    // },
    EnumTaskType: [
        {
            value: APP_CONSTANT.EnumTaskType.Commontask,
            name: 'Common Task'
        },
        {
            value: APP_CONSTANT.EnumTaskType.Orthertask,
            name: 'Other Task'
        }
    ],
    EnumTypeOfWork: [
        {
            value: APP_CONSTANT.EnumTypeOfWork.Normalworkinghours,
            name: 'Normal working hours'
        },
        {
            value: APP_CONSTANT.EnumTypeOfWork.Overtime,
            name: 'Overtime'
        }
    ],
    TimesheetStatus: [
        {
            value: APP_CONSTANT.TimesheetStatus.None,
            name: 'None'
        },
        {
            value: APP_CONSTANT.TimesheetStatus.Pending,
            name: 'Pending'
        },
        {
            value: APP_CONSTANT.TimesheetStatus.Approve,
            name: 'Approve'
        },
        {
            value: APP_CONSTANT.TimesheetStatus.Reject,
            name: 'Reject'
        }
    ],
    EnumDayOfWeek: [
        {
            value: APP_CONSTANT.EnumDayOfWeek.Monday,
            name: 'Monday'
        },
        {
            value: APP_CONSTANT.EnumDayOfWeek.Tuesday,
            name: 'Tuesday'
        },
        {
            value: APP_CONSTANT.EnumDayOfWeek.Wednesday,
            name: 'Wednesday'
        },
        {
            value: APP_CONSTANT.EnumDayOfWeek.Thursday,
            name: 'Thursday'
        },
        {
            value: APP_CONSTANT.EnumDayOfWeek.Friday,
            name: 'Friday'
        },
        {
            value: APP_CONSTANT.EnumDayOfWeek.Saturday,
            name: 'Saturday'
        },
        {
            value: APP_CONSTANT.EnumDayOfWeek.Sunday,
            name: 'Sunday'
        } 
    ]
}