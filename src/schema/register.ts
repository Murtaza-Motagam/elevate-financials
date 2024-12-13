import * as yup from 'yup';
import { mobNoValidate } from '@/lib/regex';

export const personalDetails = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    dob: yup
        .date()
        .typeError("Invalid date format")
        .required("Date of birth is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    genderNm: yup.string().required("Gender is required"),
    mobNo: yup.string().matches(mobNoValidate, 'Mobile number should must be 10 digits.').required("Mobile number is required"),
});