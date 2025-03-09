import * as yup from 'yup';
import { alphanumeric, mobNoValidate, passwordValidate } from '@/lib/regex';
import { REQUIRED } from '@/lib/constant';

export const personalDetails = yup.object().shape({
  firstName: yup.string().required(REQUIRED),
  lastName: yup.string().required(REQUIRED),
  dob: yup.date().typeError('Invalid date format').required(REQUIRED),
  email: yup.string().email('Invalid email address').required(REQUIRED),
  genderNm: yup.string().required(REQUIRED),
  mobNo: yup
    .string()
    .matches(mobNoValidate, 'Mobile number should must be 10 digits.')
    .required(REQUIRED),
});

export const documentDetails = yup.object().shape({
  aadharNo: yup.string().required(REQUIRED),
  panNo: yup
    .string()
    .matches(alphanumeric, 'Pancard number must be alphanumeric')
    .required(REQUIRED),
  driverLicence: yup.string().optional(),
  profileImg: yup.string().optional(),
  addressProofType: yup.string().optional(),
  addressProofImg: yup.string().optional(),
});

export const bankingDetails = yup.object().shape({
  accountType: yup.string().required(REQUIRED),
  username: yup.string().required(REQUIRED),
  password: yup
    .string()
    .matches(passwordValidate, 'Password should must validate')
    .required(REQUIRED),
});
