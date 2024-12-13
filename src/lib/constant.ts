export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
  {value: 'Male', label: 'Male'},
  {value: 'Female', label: 'Female'},
  {value: 'Other', label: 'Other'},
]

export const KEYS = {
  personalDetails: 'personalDetails',
  documentDetails: 'documentDetails',
  bankingDetails: 'bankingDetails',
}