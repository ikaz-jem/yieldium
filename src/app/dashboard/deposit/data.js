import { FaGooglePay } from "react-icons/fa6";
import { FaPaypal } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";
import { SiWise } from "react-icons/si";
import { BsBank2 } from "react-icons/bs";



export const cryptoDeposits = [
  { id: 1, name: 'USDT - BEP20', address: "CPNxdZRBxvjrYPo6uaLSQEs4TmGKKt12JTjaBvisx3ep" },
  { id: 2, name: 'USDT - TRC20', address: "2QcWX9wrvCbMU2YFQc1xayuP8zr8T6Bqh5HbCAtGYMHx" },
  { id: 3, name: 'BNB - BEP20', address: "JBdB3uFvA3886SmTcPaqGXUg6S1AAbDPEqoy2JG8muib" },
  { id: 4, name: 'SOLANA - BEP20', address: "8NpNmntfm9eGHdELmciNPtTVnrAXhScF7vggfzRtTdnr" },
  { id: 5, name: 'SOLANA - SOL', address: "G6EYhKMupMissPYx8emRospQAvQGQcVPn3RPy3gFVVgT" },
]


export const onlinePayments = [
  {
    title: 'Paypal',
    icon: <FaPaypal className='text-3xl text-white/80' />,
    desc: '',
  },
  {
    title: 'Google Pay',
    icon: <FaGooglePay className='text-3xl text-white/80' />,
    desc: '',
  },
  {
    title: 'Wise',
    icon: <SiWise className='text-3xl text-white/80' />,
    desc: '',
  },
  {
    title: 'Bank Transfer',
    icon: <BsBank2 className='text-3xl text-white/80' />,
    desc: '',
  },
  {
    title: 'Local Cards',
    icon: <RiVisaFill className='text-3xl text-white/80' />,
    desc: '',
  },
]