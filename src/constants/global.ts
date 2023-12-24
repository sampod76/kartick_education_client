export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];


export const bloodGroupOptions = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
];
export const priceTypeOptions = [
  {
    label: "free",
    value: "free",
  },
  {
    label: "paid",
    value: "paid",
  },
  {
    label: "open",
    value: "open",
  },
  {
    label: "close",
    value: "close",
  },
  {
    label: "recurrig",
    value: "recurrig",
  },
  
];
export const courseStatusOptions = [
  {
    label: "active",
    value: "active",
  },
  {
    label: "deactivate",
    value: "deactivate",
  },
  {
    label: "save",
    value: "save",
  },
  {
    label: "disable",
    value: "disable",
  },
  {
    label: "block",
    value: "block",
  },
  
];



export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthOptions = months?.map((month: string) => {
  return {
    label: month,
    value: month,
  };
});

export const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];
export const daysOptions = days?.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});

export const serviceStatus = ["available", "upcoming", "unavailable"];
// 'available' | 'upcoming' | 'unavailable'

export enum ExamType {
  FINAL = "FINAL",
  MIDTERM = "MIDTERM",
}

export enum ENUM_STATUS {
  ACTIVE = "active",
  DEACTIVATE = "deactivate",

}
// 'pending' | 'accept' | 'reject' | 'complete'|'cancel'
export enum ENUM_BOOKING_STATUS {
  PENDING = "pending",
  ACCEPT = "accept",
  REJECT = "reject",
  COMPLETE = "complete",
  CANCEL = "cancel",
}
