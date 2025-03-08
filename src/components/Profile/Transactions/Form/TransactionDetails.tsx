import { DialogFooter } from '@/components/ui/dialog';
import { dateTimeDisplay, formatWithCommas } from '@/lib/common';
import DefaultButton from '@/widgets/DefaultButton';
import LayoutModal from '@/widgets/LayoutModal';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import React, { SetStateAction } from 'react';
import { Tooltip } from 'react-tooltip';

interface TransactionDetailProps {
  open: boolean;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

const TransactionDetails: React.FC<TransactionDetailProps> = ({
  open,
  setOpen = () => {},
  data,
}) => {
  const transactionData = [
    { index: 1, name: 'Transaction ID:', data: data.transactionId },
    { index: 2, name: 'Account number:', data: data.accountNumber },
    { index: 3, name: 'IFSC code:', data: data.ifscCodeNumber },
    { index: 4, name: 'Payment method:', data: data.paymentMethod },
    { index: 5, name: 'Total amount:', data: formatWithCommas(data.totalAmount) },
    { index: 6, name: 'Balance before:', data: formatWithCommas(data.balanceBefore) },
    { index: 7, name: 'Balance after:', data: formatWithCommas(data.balanceAfter) },
    { index: 8, name: 'Payment status:', data: data.paymentStatus },
    { index: 9, name: 'Transaction date:', data: dateTimeDisplay(data.transactionDate) },
    { index: 10, name: 'Transaction fee:', data: data.transactionFee },
    { index: 11, name: 'Device info:', data: data.deviceInfo },
    { index: 12, name: 'Remarks:', data: data.remarks },
  ];

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'Success':
        return 'text-green-500';
      case 'Failed':
        return 'text-red-600';
      case 'Pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-700'; // Fallback for unknown statuses
    }
  };

  return (
    <LayoutModal open={open} setOpen={setOpen}>
      <div className='w-full flex flex-col gap-y-2'>
        <h1 className='w-full text-center text-lg md:text-xl font-semibold border-b-2 border-gray-400 pb-2'>
          Transaction details
        </h1>

        {transactionData.map((item) => (
          <div
            key={item.index}
            className='flex justify-between items-center text-gray-700 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700 pb-2'
          >
            <h1 className='font-semibold'>{item.name}</h1>
            {item.name === 'Payment Status:' ? (
              <p
                className={`font-bold uppercase flex items-center gap-x-1 text-right ${getStatusColor(item.data)}`}
              >
                {item.data === 'Success' && <CircleCheck size={15} />}
                {item.data === 'Pending' && <CircleAlert size={15} />}
                {item.data === 'Failed' && <CircleX size={15} />}
                {item.data}
              </p>
            ) : (
              <p
                data-tooltip-id='data'
                data-tooltip-content={String(item.data)}
                className='font-bold text-right cursor-pointer'
              >
                {String(item.data)?.length <= 20
                  ? String(item.data)
                  : `${String(item.data).substring(0, 20)}...`}
              </p>
            )}
          </div>
        ))}
        <Tooltip id='data' place='top' />
        <DialogFooter>
          <DefaultButton onClick={() => setOpen(false)} title='Close' className='w-full' />
        </DialogFooter>
      </div>
    </LayoutModal>
  );
};

export default TransactionDetails;
