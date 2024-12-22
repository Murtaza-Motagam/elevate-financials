'use client';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useClickOutside from '@/hooks/useClickOutside';
import DefaultButton from '@/widgets/DefaultButton'
import { ChevronDown, CircleAlert, CircleCheck, CircleX, Download, FilePlus, Search } from 'lucide-react'
import React, { useRef, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useTransaction from './hooks/useTransaction';
import AddTransaction from './Form/AddTransaction';
import TransactionDetails from './Form/TransactionDetails';
import { dateTimeDisplay } from '@/lib/common';


const getPaymentMethod = (paymentMethod: string | undefined) => {
    switch (paymentMethod) {
        case 'Success':
            return (
                <TableCell className='text-green-500 font-bold uppercase flex items-center mt-6 gap-x-1'><CircleCheck size={15} />{paymentMethod}</TableCell>
            );
        case 'Pending':
            return (
                <TableCell className='text-yellow-500 font-bold uppercase flex items-center mt-6 gap-x-1' color='#f59e0b'><CircleAlert size={15} />{paymentMethod}</TableCell>
            );
        case 'Failed':
            return (
                <TableCell className='text-red-600 font-bold uppercase flex items-center mt-6 gap-x-1'><CircleX size={15} />{paymentMethod}</TableCell>
            );
        default:
            return (
                <TableCell className='font-bold uppercase'>{paymentMethod}</TableCell>
            );
    }
}

const Transactions = () => {

    const [ddOpen, setDdOpen] = useState<boolean>(false)
    const [openTransactionModal, setTransactionOpen] = useState<boolean>(false)
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(dropdownRef, () => setDdOpen(false));

    const { invoices, ...dt } = useTransaction();


    return (
        <div className='w-full mx-4 pr-4'>
            <h1 className="border-b border-gray-400 pb-2 font-semibold text-lg md:text-xl">
                Transactions
            </h1>
            <div className="w-full flex justify-between items-center my-3">
                <div className="w-1/4">
                    <div className="relative w-full">
                        <Search size={20} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search transaction"
                            className="pl-10" // Add padding to leave space for the icon
                        />
                    </div>
                </div>
                <div ref={dropdownRef} className="relative flex items-center">
                    <DefaultButton onClick={() => setTransactionOpen(true)} className='rounded-r-none' icon={<FilePlus />} title='Create transaction' />
                    <Button onClick={() => setDdOpen(!ddOpen)} className='rounded-l-none px-2 border-l-2'><ChevronDown /></Button>

                    {ddOpen && (
                        <Button
                            variant='outline'
                            className='w-[200px] absolute top-10 right-0 rounded-[5px] bg-white text-black dark:hover:bg-gray-700 z-10'>
                            <Download />
                            Download history
                        </Button>
                    )}
                </div>

            </div>

            <Table className={`${ddOpen ? 'mt-7' : 'mt-3'} border-2 h-[50vh] overflow-y-scroll overflow-x-hidden`}>
                <TableHeader>
                    <TableRow className='uppercase'>
                        <TableHead>ID</TableHead>
                        <TableHead>A/C Number</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Remarks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {invoices.map((data: any) => (
                        <TableRow onClick={() => dt.handleTransactionDetails(data, setDetailsOpen)} className='cursor-pointer' key={data.transactionId}>
                            <TableCell>{data.transactionId}</TableCell>
                            <TableCell>{data.accountNumber}</TableCell>
                            <TableCell>{data.paymentMethod}</TableCell>
                            <TableCell>{data.totalAmount}</TableCell>
                            <TableCell>{data.deviceInfo}</TableCell>
                            <TableCell>{dateTimeDisplay(data.transactionDate)}</TableCell>
                            {getPaymentMethod(data.paymentStatus)}
                            <TableCell>{data.remarks}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <AddTransaction
                open={openTransactionModal}
                setOpen={setTransactionOpen}
            />

            <TransactionDetails
                open={detailsOpen}
                setOpen={setDetailsOpen}
                data={dt.trData}
            />
        </div>
    )
}

export default Transactions
