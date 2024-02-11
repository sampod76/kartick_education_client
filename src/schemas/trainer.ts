import * as yup from "yup";

export const trainerSchema = yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
    }),
    gender: yup.string().oneOf(['male', 'female', 'other']).required('Gender is required'),
    dateOfBirth: yup.string().required('Date of birth is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    address: yup.string(),
    img: yup.string(),
    details: yup.string(),
    user_bio: yup.string(),
  });
  