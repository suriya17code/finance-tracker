import {
  TrendingUp as TrendingUpIcon,   
  CreditCard as CreditCardIcon,
  Receipt as ReceiptIcon,
  Business as BusinessIcon,
  EmojiEvents as TrophyIcon,
  AccountBalanceWallet as WalletIcon,
  Payments as BanknoteIcon, 
} from '@mui/icons-material';


 export const incomeCategories = ['Register Sales', 'Sales Tax', 'Lotto', 'Instant Lottery', 'Other'];
 export const outgoingCategories = ['Cash', 'Credit Card', 'Lotto Payout', 'Bank Deposit', 'Other']; 

export const iconComponents = {
  'Register Sales': ReceiptIcon,
  'Sales Tax': BusinessIcon,
  'Lotto': TrophyIcon,
  'Instant Lottery': TrendingUpIcon,
  'Cash': BanknoteIcon,
  'Credit Card': CreditCardIcon,
  'Lotto Payout': TrophyIcon,
  'Bank Deposit': WalletIcon
};
 export  const analyticsData = [
    { month: 'Jan', income: 8200, outcome: 6100, net: 2100 },
    { month: 'Feb', income: 7800, outcome: 6300, net: 1500 },
    { month: 'Mar', income: 9100, outcome: 6800, net: 2300 },
    { month: 'Apr', income: 8900, outcome: 6500, net: 2400 },
    { month: 'May', income: 8300, outcome: 7200, net: 1100 },
    { month: 'Jun', income: 9200, outcome: 6900, net: 2300 },
    { month: 'Jul', income: 8750, outcome: 6420, net: 2330 },
    { month: 'Aug', income: 8600, outcome: 6700, net: 1900 },
    { month: 'Sep', income: 8400, outcome: 6800, net: 1600 },
    { month: 'Oct', income: 9000, outcome: 6600, net: 2400 },
    { month: 'Nov', income: 8800, outcome: 6900, net: 1900 },
    { month: 'Dec', income: 8750, outcome: 6420, net: 2330 }
  ];