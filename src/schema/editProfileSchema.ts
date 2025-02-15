import * as yup from 'yup';

export const editProfileSchema = yup.object().shape({
  profileImg: yup.string().nullable().optional(),
  username: yup.string().nullable().optional(),
  email: yup.string().email('Please enter valid email address.').nullable().optional(),
  accountType: yup.string().nullable().optional(),
});
