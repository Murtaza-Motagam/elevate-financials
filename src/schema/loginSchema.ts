import { REQUIRED } from '@/lib/constant';
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required(REQUIRED),
  password: yup.string().trim().required(REQUIRED),
});
