import { REQUIRED } from '@/lib/constant';
import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
  receiverAccNum: yup
    .string()
    .required(REQUIRED)
    .matches(/^\d+$/, 'Only numbers are allowed')
    .min(12, 'Minimum 12 digits required'),
  ifscCodeNumber: yup.string().required(REQUIRED).min(12, 'Minimum 12 digits required'),
  amt: yup
    .string()
    .required(REQUIRED)
    .matches(/^\d+$/, 'Only numbers are allowed') // Ensures only numbers
    .test('is-greater-than-zero', 'Amount must be greater than 0', (value) => {
      return Number(value) > 0;
    }),
  remarks: yup.string().optional(),
  transactionTypeNm: yup.string().required(REQUIRED),
});
