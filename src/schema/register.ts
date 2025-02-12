import * as yup from 'yup';
import { alphanumeric, mobNoValidate, passwordValidate } from '@/lib/regex';

export const personalDetails = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  dob: yup.date().typeError('Invalid date format').required('Date of birth is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  genderNm: yup.string().required('Gender is required'),
  mobNo: yup
    .string()
    .matches(mobNoValidate, 'Mobile number should must be 10 digits.')
    .required('Mobile number is required'),
});

export const documentDetails = yup.object().shape({
  aadharNo: yup.string().required('Aadhar number is required'),
  panNo: yup
    .string()
    .matches(alphanumeric, 'Pancard number must be alphanumeric')
    .required('Pancard number is required'),
  driverLicence: yup.string().optional(),
  profileImg: yup.string().optional(),
  addressProofType: yup.string().required('Address proof is required'),
  addressProofImg: yup.string().required('Address proof image is required'),
});

export const bankingDetails = yup.object().shape({
  accountType: yup.string().required('Account type is required'),
  username: yup.string().required('Account type is required'),
  password: yup
    .string()
    .matches(passwordValidate, 'Password should must validate')
    .required('Account type is required'),
});
