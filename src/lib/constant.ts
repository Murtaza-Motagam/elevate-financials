import { ArrowLeftRight, Briefcase, CreditCard, Gift, Info, LayoutGrid, Lock, ShieldCheck, UserRoundPlus } from "lucide-react";
import { LocalStorage } from "./localStorage";

export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const backendUrlUpload = process.env.NEXT_PUBLIC_BACKEND_URL_UPLOAD;
export const backendUrlPreview = process.env.NEXT_PUBLIC_BACKEND_URL_PREVIEW;
export const compNm = 'Elevate Financials';

export const checkForModule = LocalStorage.getJSON('authDetails');
export const token = checkForModule.token;

export const navLinks = [
  {
    name: 'Card',
    redirectLink: '/card',
  },
  {
    name: 'Travel',
    redirectLink: '/travel',
  },
  {
    name: 'Rewards',
    redirectLink: '/rewards',
  },
  {
    name: 'Insurance',
    redirectLink: '/insurance',
  },
  {
    name: 'Business',
    redirectLink: '/business',
  },
];

export const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
]

export const PROTECTED_ROUTES = [
  '/profile'
]

export const accountTypeOptions = [
  { value: 'Savings', label: 'Savings' },
  { value: 'Current', label: 'Current' },
  { value: 'Fixed Deposits', label: 'Fixed Deposits' },
  { value: 'Recurring', label: 'Recurring' },
]

export const addressProofOptions = [
  { value: 'Aadhar Card', label: 'Aadhar Card' },
  { value: 'Voter ID', label: 'Voter ID' },
  { value: 'Passport', label: 'Passport' },
  { value: 'Driving Licence', label: 'Driving Licence' },
  { value: 'Utility Bill', label: 'Utility Bill' },
  { value: 'House Bill', label: 'House Bill' },
  { value: 'Ration Card', label: 'Ration Card' },
  { value: 'Bank Statement', label: 'Bank Statement' },
];


export const KEYS = {
  personalDetails: 'personalDetails',
  documentDetails: 'documentDetails',
  bankingDetails: 'bankingDetails',
  authDetails: 'authDetails',
}

export const sidebarLinks = [
  {
    category: 'Account Overview',
    links: [
      {
        name: 'Dashboard',
        icon: LayoutGrid,
      },
      {
        name: 'My Account',
        icon: UserRoundPlus,
      },
    ],
  },
  {
    category: 'Financial Transactions',
    links: [
      {
        name: 'Transactions',
        icon: ArrowLeftRight,
      },
    ],
  },
  {
    category: 'Security & Privacy',
    links: [
      {
        name: 'Security Settings',
        icon: Lock,
      },
      {
        name: 'Privacy Settings',
        icon: ShieldCheck,
      },
    ],
  },
  {
    category: 'Loans & Credit Management',
    links: [
      {
        name: 'Loans & Credit',
        icon: CreditCard,
      },
      {
        name: 'Rewards & Offers',
        icon: Gift,
      },
    ],
  },
  {
    category: 'Customer Support & Assistance',
    links: [
      {
        name: 'Contact Support',
        icon: Info,
      },
      {
        name: 'Tax & Investment',
        icon: Briefcase,
      },
    ],
  },
];
