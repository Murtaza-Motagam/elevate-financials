import { profile_tabs } from '@/lib/constant';
import { Landmark, CreditCard, Send, QrCode, FileText, CircleUser, Activity, PiggyBank, ReceiptIndianRupee, MonitorCheck, Rotate3D, Wallet } from 'lucide-react';

export const servicesData = [
    {
        sectionName: 'Bank',
        icon: Landmark,
        iconClass: 'w-6 h-6 text-primary',
        subSections: [
            { name: 'Account Overview', icon: CircleUser, link: `/profile/?tab=${profile_tabs.accounts}`, className: '', iconClass: 'text-primary' },
            { name: 'Account Activity', icon: Activity, link: `/profile/?tab=${profile_tabs.accounts}`, className: '', iconClass: 'text-yellow-500' },
            { name: 'Statements', icon: FileText, link: `/profile/?tab=${profile_tabs.transaction}`, className: '', iconClass: 'text-blue-500' },
            { name: 'Fixed Recurring Deposits', icon: PiggyBank, link: '/fixed-deposits', className: '', iconClass: 'text-pink-500' },
            { name: 'Digital Rupee', icon: ReceiptIndianRupee, link: '/digital-rupee', className: '', iconClass: 'text-red-400' },
            { name: 'Active Money', icon: MonitorCheck, link: '/active-money', className: '', iconClass: 'text-blue-500' },
        ],
    },
    {
        sectionName: 'Pay & Transfer',
        icon: Send,
        iconClass: 'w-6 h-6 text-blue-500',
        subSections: [
            { name: 'Transfer Money', icon: Rotate3D, link: '/transfer - money', className: '', iconClass: 'text-blue-500' },
            { name: 'Bill Pay & Recharge', icon: CreditCard, link: '/bill - pay', className: '', iconClass: 'text-yellow-500' },
            { name: 'BHIM/UPI', icon: CreditCard, link: '/bhim - upi', className: '', iconClass: 'text-red-500' },
            { name: 'Scan QR & Pay', icon: QrCode, link: '/scan - pay', className: '', iconClass: 'text-green-500' },
            { name: 'One Time Transfer', icon: Wallet, link: '/one-time-transfer', className: '', iconClass: 'text-yellow-500' },
            { name: 'Pay Your Contact', icon: CreditCard, link: '/pay - contact', className: '', iconClass: 'text-purple-500' },
            { name: 'Manage Beneficiaries', icon: CreditCard, link: '/manage - beneficiaries', className: '', iconClass: 'text-pink-500' },
        ],
    },
];