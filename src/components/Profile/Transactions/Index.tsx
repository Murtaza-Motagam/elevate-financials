'use client';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useClickOutside from '@/hooks/useClickOutside';
import DefaultButton from '@/widgets/DefaultButton'
import { ChevronDown, Download, FilePlus, Search } from 'lucide-react'
import React, { useRef, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import LayoutModal from '@/widgets/LayoutModal';

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
        accountNumber: "1234567890",
        transactionDate: "2024-12-01",
        transactionId: "TXN1001",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
        accountNumber: "0987654321",
        transactionDate: "2024-12-05",
        transactionId: "TXN1002",
    },
    {
        invoice: "INV003",
        paymentStatus: "Failed",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
        accountNumber: "1122334455",
        transactionDate: "2024-12-10",
        transactionId: "TXN1003",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
        accountNumber: "2233445566",
        transactionDate: "2024-12-12",
        transactionId: "TXN1004",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
        accountNumber: "3344556677",
        transactionDate: "2024-12-14",
        transactionId: "TXN1005",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
        accountNumber: "4455667788",
        transactionDate: "2024-12-18",
        transactionId: "TXN1006",
    },
    {
        invoice: "INV007",
        paymentStatus: "Failed",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
        accountNumber: "5566778899",
        transactionDate: "2024-12-20",
        transactionId: "TXN1007",
    },
];

const getPaymentMethod = (paymentMethod: string | undefined) => {
    switch (paymentMethod) {
        case 'Paid':
            return (
                <TableCell className='text-green-500 font-bold'>{paymentMethod}</TableCell>
            );
        case 'Pending':
            return (
                <TableCell className='text-yellow-500 font-bold' color='#f59e0b'>{paymentMethod}</TableCell>
            );
        case 'Failed':
            return (
                <TableCell className='text-red-600 font-bold'>{paymentMethod}</TableCell>
            );
        default:
            return (
                <TableCell className='font-bold'>{paymentMethod}</TableCell>
            );
    }
}


const Transactions = () => {

    const [ddOpen, setDdOpen] = useState<boolean>(false)
    const [openTransactionModal, setTransactionOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Correctly typed ref
    useClickOutside(dropdownRef, () => setDdOpen(false));


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

            <Table className={`${ddOpen ? 'mt-7' : 'mt-3'}`}>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Transaction Date</TableHead>
                        <TableHead>Transaction Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell>{invoice.transactionId}</TableCell>
                            <TableCell>{invoice.accountNumber}</TableCell>
                            <TableCell>{invoice.paymentMethod}</TableCell>
                            <TableCell>{invoice.totalAmount}</TableCell>
                            <TableCell>{invoice.transactionDate}</TableCell>
                            {getPaymentMethod(invoice.paymentStatus)}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>


            <LayoutModal open={openTransactionModal} setOpen={setTransactionOpen} />
        </div>
    )
}

export default Transactions
