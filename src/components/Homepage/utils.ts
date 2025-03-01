import { CreditCard, Send, ShieldCheck, TrendingUp } from 'lucide-react';

export const sliderData = [
  { name: 'Visa', src: '/images/visa_logo.png' },
  { name: 'Mastercard', src: '/images/mastercard_logo.png' },
  { name: 'PayPal', src: '/images/paypal_logo.png' },
  { name: 'Razorpay', src: '/images/razorpay_logo.png' },
  { name: 'Stripe', src: '/images/stripe_logo.png' },
  { name: 'SBI Bank', src: '/images/sbi_logo.png' },
  { name: 'ICICI Bank', src: '/images/icici_logo.png' },
];

export const mainHeroContent = [
  {
    icon: ShieldCheck,
    iconClass: 'w-10 h-10 text-green-500',
    name: 'Secure Transactions',
    content: 'Bank with military-grade encryption',
  },
  {
    icon: CreditCard,
    iconClass: 'w-10 h-10 text-yellow-500',
    name: 'Virtual Cards',
    content: 'Generate & manage digital cards instantly.',
  },
  {
    icon: TrendingUp,
    iconClass: 'w-10 h-10 text-purple-500',
    name: 'Smart Insights',
    content: 'AI-driven analytics for better finance.',
  },
  {
    icon: Send,
    iconClass: 'w-10 h-10 text-blue-500',
    name: 'Instant Transfers',
    content: 'Send & receive money in real time.',
  },
];
