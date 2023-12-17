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

// export const createStudentSchema = yup.object().shape({
//     name: yup.string(),
//     password: yup.string().required('Password is required'),
//     gender: yup.string(),
//     dateOfBirth: yup.string(),
//     email: yup.string().email('Invalid email').required('Email is required'),
//     phoneNumber: yup.string(),
//     address: yup.string(),
//     profileImage: yup.string(),
//     status: yup.string().oneOf(['active', 'deactive']),
//   })

export const createStudentSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  student: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string(),
      lastName: yup.string().optional(),
      middleName: yup.string(),
    }),
    gender: yup.string(),
    dateOfBirth: yup.string(),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.string(),
    bloodGroup: yup.string(),
    address: yup.string(),
    img: yup.string(),
  }),
  status: yup.string().oneOf(['active', 'deactive']),
});