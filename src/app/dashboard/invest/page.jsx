"use client"

//   const binancePrice = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT').then(res => res.data);
//   console.log({ binancePrice })

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { useEffect, useState, useTransition } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import ButtonPrimary from '@/app/components/ButtonPrimary';
import ButtonSecondary from '@/app/components/ButtonSecondary';

import { useSession } from 'next-auth/react';

import axios, { Axios } from 'axios';
import { toast } from 'sonner';
import { useMemo } from 'react';
import BalanceChart from '../components/charts/BalanceChart';
import { useRouter } from 'next/navigation';
import AutoCompoundSwitch from './AutoCompoundSwitch';
import Link from 'next/link';
import { appBaseRoutes } from '@/routes';
import BorderEffect from '../components/BorderEffect/BorderEffect';







function PackageViewer({ lockingPackage }) {
    const days = [7,15, 21, 31, 60, 90, 120,360];
    const session = useSession()
    const user = session?.data?.user
    const router = useRouter()

    const [amount, setAmount] = useState(1500)
    const [isPending, startTransition] = useTransition()
    const [balance, setBalance] = useState(0)
    const [selected, setSelected] = useState(days[days.length - 1])
    const [auto,setAuto] = useState(true)
    

    const [stats, setStats] = useState({
        roi: 0.5,
        returns: 0,
        total: 0

    })

    async function getBalance() {
        const balance = await axios.get('/api/balance?currency=usdt').then((res) => res.data)
        if (balance.success) {
            if (balance.currencyBalance?.amount > 0) {
                setBalance(balance.currencyBalance.amount)
            }
        }
    }


    function calculatePercentOnInv(inv) {
        if (inv >= 151 && inv <= 500) {
            return 1;
        } else if (inv >= 501 && inv <= 1000) {
            return 1.5;
        } else if (inv >= 1001 && inv <= 2500) {
            return 2;
        } else if (inv >= 2501 && inv <= 5000) {
            return 2.5;
        } else if (inv >= 5001) {
            return 3;
        } else {
            return 0.7;
        }
    }


    function calculateInvestmentProfits() {
        let percent = calculatePercentOnInv(Number(amount))
        let dailyPercent = (percent * Number(amount)) / 100
        let result = dailyPercent * selected
        if (isNaN(result) || result == 0) { return 0 }
        let formated = parseFloat(Number(result.toFixed(2)))
        return Number(formated)
    }



    useEffect(() => {
        if (!balance) {
            getBalance()
        }
    }, [])


    useEffect(() => {
        if (selected && amount) {

            calculateCompoundInterest(amount, 0.5, selected)

        }
    }, [selected, amount])


const data = useMemo(() => {
    const points = [];
    let compoundedBalance = Number(amount); // only compound this
    let flatProfitTotal = 0; // track flat daily profits separately

    const percent = calculatePercentOnInv(compoundedBalance); // e.g., 2%
    const extraDailyProfit = (percent * amount) / 100; // e.g., 30

    for (let i = 0; i <= selected; i++) {
        const totalBalance =auto ? compoundedBalance + flatProfitTotal : flatProfitTotal + amount;

        points.push({
            date: `Day ${i}`,
            balance: Number(totalBalance.toFixed(2)),
        });

        // Apply only 0.5% daily compound to the compoundedBalance
        compoundedBalance *= 1 + 0.5 / 100;

        // Add fixed daily profit separately (not compounded)
        flatProfitTotal += extraDailyProfit;
    }

    return points;
}, [selected, amount ,auto]);




    function calculateCompoundInterest(initialAmount, dailyRatePercent, days) {
        const dailyRate = dailyRatePercent / 100;
        const finalAmount = initialAmount * Math.pow((1 + dailyRate), days);
        const roi = ((finalAmount - initialAmount) / initialAmount) * 100;
        if (isNaN(roi)) {
            return
        }
        setStats({
            roi: roi.toFixed(2),
            total: finalAmount.toFixed(2),
            returns: (Number(finalAmount) - initialAmount).toFixed(2)
        })
        return {
            finalAmount: finalAmount.toFixed(2),
            roi: roi.toFixed(2)
        };
    }


    const convert = async (e) => {
        e.preventDefault()
        startTransition(async () => {

            let res = await axios.post('/api/convert', {
                from: selected?.symbol,
                to: "usdt",
                amount: amount,
                pair: selected?.pair
            }).then((res) => res.data)
            if (res.success) {
                toast.success(
                    res.message)

            } else {
                toast.error(
                    res.message
                )

            }

        })
        e.preventDefault()
    }

    const amountChange = async (e) => {
                    setAmount(Number(e.target.value))

        // if (e.target.value >= balance) {
        //     setAmount(Number(balance.toFixed(2)))

        // } else {
        //     setAmount(Number(e.target.value))
        // }
    }


    async function Stake() {

            if (Number(amount <=9)){
               return toast.error('Min investment Contract is 10 USDT')
            }


        if (Number(amount)>=Number(balance) ){
            toast.error('insuffisant balance ')
            return
        }
        startTransition(async()=>{
            let profits = auto ? (Number(stats.returns) + (calculateInvestmentProfits())).toFixed(2) : calculateInvestmentProfits()
            let percent = calculatePercentOnInv(Number(amount))
            
            const balance = await axios.get('/api/balance?currency=usdt').then((res) => res.data)
            if (balance.success) {
            if (balance.currencyBalance?.amount < Number(amount)) {
                toast.error('You dont have enough Balance Activate')
            } else {
                const stake = await axios.post('/api/staking', {
                    duration: selected,
                    amount: Number(amount),
                    profits: Number(profits),
                    rate: Number(percent)
                    
                }).then((res) => res.data)
                
                if (stake?.success){
                    toast.success(`successfully invested ${amount.toFixed()} usdt `)
                    router.push('/dashboard/contracts')
                }else{
                    toast.error(stake?.message)
                }
                
            }
        }
    })
    }



    function DaysSelector() {

        return (
            <div className='grid gap-3'>

                <div className='grid w-full gap-2'>
                    <p className='text-sm'>Period</p>


                    <Listbox value={selected} onChange={(e) => setSelected(e)}>
                        <ListboxButton
                            className={clsx(
                                'relative flex gap-2 h-10 items-center w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white ',

                            )}
                        >

                            {`${selected}  Days`}
                            <FaChevronDown
                                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </ListboxButton>
                        <ListboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                                'w-(--button-width) backdrop-blur z-5 rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] focus:outline-none outline-none',
                                'transition duration-100 ease-in data-leave:data-closed:opacity-0'
                            )}
                        >
                            {days.map((day) => (
                                <ListboxOption
                                    key={day}
                                    value={day}
                                    className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                                >
                                    {/* <FaCheck className="invisible size-4 fill-white group-data-selected:visible" /> */}
                                    <div className="text-sm/6 text-white">{`${day} Days`}</div>

                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>


            </div>
        )

    }



    return (

        <div className="grid gap-5 w-full p-5">


            <div className='flex justify-between items-center'>

                <div className='flex gap-2 items-end  '>
                    <img src="/assets/images/crypto/usdt.svg" className='w-8 h-8' alt="" />
                    <div className='flex flex-col '>
                    <p className='text-xs  !text-primary'>Balance</p>
                    <p className='text-xl  font-semibold'>{balance.toFixed(2)} USDT</p>
                    </div>
                </div>
                <div className='flex flex-col gap-1 items-end'>

                <AutoCompoundSwitch  enabled={auto} setEnabled={setAuto} />
                <p className={clsx('  text-[10px] bg-green-500/20 rounded border  w-max p-1' , auto ?"!text-green-500 border-green-500 bg-green-500/20 " : "border-red-500 bg-red-500/20 !text-red-500" )}>+0.5 % auto Compound {auto ? "ON" : "OFF"} </p>
                </div>
            </div>

            <div className='grid'>

                <div className='flex items-center justify-between'>
                    <p className='text-sm '>0.5% autoCompound Daily ROI : </p>
                    <p className=' !text-green-500 text-lg '> +{ auto ?stats.roi : 0}%</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-sm'>Investment Daily ROI : </p>
                    <p className=' !text-green-500  text-lg'> +{calculatePercentOnInv(Number(amount))}%</p>
                    {/* <InvestModal /> */}
                </div>
            </div>


            <div className='flex flex-col gap-3'>

                <DaysSelector />

                <div className='bg-white/10 rounded flex justify-between  items-center'>

                    <input
                        className=' aria-selected:bg-none auto text-white rounded h-full w-full p-3 text-sm outline-none  disabled:cursor-not-allowed disabled:bg-transparent'
                        name="amount"
                        type="number"
                        placeholder={`USDT Amount`}
                        onChange={amountChange}
                        value={amount}
                        min={0.01}
                        step={0.01}
                        required

                    />
                    <div className='flex flex-col gap-1'>
                        <ButtonSecondary onClick={(e) => setAmount(Number(balance.toFixed(2)))} >Max</ButtonSecondary>
                    </div>
                </div>

                <div className='flex justify-between items-center gap-2 !text-green-500'>
                    <p className='text-sm '>Compound Profits :</p>
                    <p className='text-sm '> { auto ? stats.returns : 0} $ </p>
                </div>
                <div className='flex justify-between items-center gap-2 !text-green-500'>
                    <p className='text-sm '>Investment Profits :</p>
                    <p className='text-sm '>{calculateInvestmentProfits()}$ </p>
                </div>

                <div className='flex justify-between items-center gap-2 !text-green-500'>
                    <p className='text-sm'>Total Returns :</p>
                    <p className=' !text-green-500 text-sm'>{ auto ? (Number(stats.returns) + (calculateInvestmentProfits())).toFixed(2) :  (calculateInvestmentProfits()).toFixed(2) }$</p>
                </div>
                <div className='flex justify-between items-center gap-2 !text-green-500'>
                    <p className='text-sm'>Withdawabal Profits </p>
                    <p className=' !text-green-500 text-2xl font-semiBold'>{ auto ? (Number(stats.returns) + (calculateInvestmentProfits()) + Number(amount)).toFixed(2)  :  (calculateInvestmentProfits() + Number(amount)).toFixed(2) }$</p>
                </div>


                <BalanceChart data={data} className={'  md:!h-60'} />
            </div>
            {
                <div className='w-full space-y-5 flex items-center justify-center flex-col'>
                    { balance ==0 && 
                    <div className='flex justify-center items-center flex-col gap-2 w-full'>

                    <p className='text-sm !text-red-500 '>insuffisant balance </p>
                    <div className='flex items-center gap-5'>
                    <Link href={appBaseRoutes.deposit} className='text-sm !text-primary hover:!text-accent'>Deposit </Link>
                    <p className='text-md '>Or </p>
                    <Link href={appBaseRoutes.convert} className='text-sm !text-primary hover:!text-accent'>Convert </Link>
                    </div>
                    </div>
                        
                        }


                    {balance >= 0 + 1 && <ButtonPrimary loading={isPending} disabled={isPending} onClick={(e) => Stake(lockingPackage)} className={'w-full px-4'}>Activate</ButtonPrimary>}
                </div>
            }
            <p className='text-sm '>+1 USDT Service Fees</p>
        </div>
    )
}



export default function page() {


    const packages = [
        {
            title: '',
            price: 25,
            percent: 0.5
        },


    ]






    function StackingTypes() {
        return (
            <div className="  w-full  pt-5 ">
                <div className="w-full flex items-center justify-center">
                    {packages?.map((pack, key) => <TabGroup key={key} className='w-full max-w-lg'>
                        <TabPanels className="mt-3 w-full  ">
                            <TabPanel className="rounded-xl bg-card backdrop-blur-xl w-full  ">
                                <BorderEffect/>

                                <PackageViewer lockingPackage={pack} />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>)}
                </div>
            </div>
        )
    }



    return (
        <>
            <div className='w-full mx-auto  '>

                <StackingTypes />
            </div>

        </>
    )
}