import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
  receiverAccNum: yup
    .string()
    .required('Receiver account is required')
    .matches(/^\d+$/, 'Only numbers are allowed')
    .min(12, 'Minimum 12 digits required'),
  amt: yup
    .string()
    .required('Amount is required')
    .matches(/^\d+$/, 'Only numbers are allowed') // Ensures only numbers
    .test('is-greater-than-zero', 'Amount must be greater than 0', (value) => {
      return Number(value) > 0;
    }),
  remarks: yup.string().optional(),
  transactionTypeNm: yup.string().required('Transaction type is required'),
});
