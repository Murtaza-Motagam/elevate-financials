import { profile_tabs } from '@/lib/constant';
import { Landmark, CreditCard, Send, QrCode, FileText, CircleUser, Activity, PiggyBank, ReceiptIndianRupee, MonitorCheck, Rotate3D, Wallet, ReceiptText, Contact, Users } from 'lucide-react';
import UpiIcon from '@/icons/Upi'

const routes = {
    accountActivity: `/profile/?tab=${profile_tabs.dashboard}`,
    accountOverview: `/profile/?tab=${profile_tabs.accounts}`,
    transaction: `/profile/?tab=${profile_tabs.transaction}`,
    fixedRecurring: '#',
    digitalRupee: '#',
    activeMoney: '#',
    transferMoney: '#',
    billpay: '#',
    upi: '#',
    qrPay: '#',
    oneTime: '#',
    payContact: '#',
    manageBen: '#',
}

export const servicesData = [
    {
        sectionName: 'Bank',
        icon: Landmark,
        iconClass: 'w-6 h-6 text-primary',
        subSections: [
            { name: 'Account overview', icon: CircleUser, link: routes.accountOverview, className: '', iconClass: 'text-primary' },
            { name: 'Account activity', icon: Activity, link: routes.accountActivity, className: '', iconClass: 'text-yellow-500' },
            { name: 'Statements', icon: FileText, link: routes.transaction, className: '', iconClass: 'text-blue-500' },
            { name: 'Fixed recurring deposits', icon: PiggyBank, link: routes.fixedRecurring, className: '', iconClass: 'text-pink-500' },
            { name: 'Digital rupee', icon: ReceiptIndianRupee, link: routes.digitalRupee, className: '', iconClass: 'text-red-400' },
            { name: 'Active money', icon: MonitorCheck, link: routes.activeMoney, className: '', iconClass: 'text-blue-500' },
        ],
    },
    {
        sectionName: 'Pay & Transfer',
        icon: Send,
        iconClass: 'w-6 h-6 text-blue-500',
        subSections: [
            { name: 'Transfer money', icon: Rotate3D, link: routes.transferMoney, className: '', iconClass: 'text-blue-500' },
            { name: 'Bill Pay & recharge', icon: ReceiptText, link: routes.billpay, className: '', iconClass: 'text-yellow-500' },
            { name: 'BHIM/UPI', icon: UpiIcon, link: routes.upi, className: '', iconClass: 'w-6 h-6 text-red-500' },
            { name: 'Scan QR & Pay', icon: QrCode, link: routes.qrPay, className: '', iconClass: 'text-green-500' },
            { name: 'One time transfer', icon: Wallet, link: routes.oneTime, className: '', iconClass: 'text-yellow-500' },
            { name: 'Pay your contact', icon: Contact, link: routes.payContact, className: '', iconClass: 'text-purple-500' },
            { name: 'Manage beneficiaries', icon: Users, link: routes.manageBen, className: '', iconClass: 'text-pink-500' },
        ],
    },
    {
        sectionName: 'Investments',
        icon: CreditCard,
        iconClass: 'w-6 h-6 text-green-500',
        subSections: [
            { name: 'Mutual funds', icon: PiggyBank, link: '#', className: '', iconClass: 'text-blue-500' },
            { name: 'Stocks & Trading', icon: Activity, link: '#', className: '', iconClass: 'text-yellow-500' },
            { name: 'Bonds & Securities', icon: FileText, link: '#', className: '', iconClass: 'text-red-500' },
            { name: 'Gold investments', icon: ReceiptIndianRupee, link: '#', className: '', iconClass: 'text-orange-500' },
        ],
    },
    {
        sectionName: 'Loans & Credit',
        icon: CreditCard,
        iconClass: 'w-6 h-6 text-purple-500',
        subSections: [
            { name: 'Apply for loan', icon: ReceiptText, link: '#', className: '', iconClass: 'text-blue-500' },
            { name: 'Credit card services', icon: CreditCard, link: '#', className: '', iconClass: 'text-green-500' },
            { name: 'EMI calculator', icon: Rotate3D, link: '#', className: '', iconClass: 'text-yellow-500' },
            { name: 'Loan repayment', icon: Wallet, link: '#', className: '', iconClass: 'text-red-500' },
        ],
    },
    {
        sectionName: 'Support & Services',
        icon: CircleUser,
        iconClass: 'w-6 h-6 text-blue-700',
        subSections: [
            { name: 'Customer support', icon: Contact, link: '#', className: '', iconClass: 'text-green-500' },
            { name: 'FAQs & help center', icon: FileText, link: '#', className: '', iconClass: 'text-purple-500' },
            { name: 'Manage profile', icon: Users, link: '#', className: '', iconClass: 'text-blue-500' },
            { name: 'Security settings', icon: MonitorCheck, link: '#', className: '', iconClass: 'text-red-500' },
        ],
    }
];