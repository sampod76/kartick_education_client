import { USER_ROLE } from "./role";

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
export const roleOptions = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Student",
    value: "student",
  },
  {
    label: USER_ROLE.TRAINER,
    value: USER_ROLE.TRAINER,
  },
  {
    label: USER_ROLE.SELLER,
    value: USER_ROLE.SELLER,
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
export const singleQuizTypes = [
  "select",
  "multiple_select",
  "input",
  "find",
  "drag",
  "audio",
];
