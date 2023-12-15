import * as yup from "yup";

export const adminSchema = yup.object().shape({
    name: yup.string(),
    password: yup.string().required('Password is required'),
    gender: yup.string(),
    dateOfBirth: yup.string(),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.string(),
    address: yup.string(),
    profileImage: yup.string(),
    status: yup.string().oneOf(['active', 'deactive']),
  })

export const userSchema = yup.object().shape({
    name: yup.string(),
    password: yup.string().required('Password is required'),
    gender: yup.string(),
    dateOfBirth: yup.string(),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.string(),
    address: yup.string(),
    profileImage: yup.string(),
    status: yup.string().oneOf(['active', 'deactive']),
  })