"use client"

import { useState } from 'react';
import { toast } from 'sonner';
import ButtonPrimary from '@/app/components/ButtonPrimary';
 import { useRouter } from 'next/navigation';
import axios from 'axios';
import { appBaseRoutes } from '@/routes';
import { useTransition } from 'react';


export default function LoginPage() {
  const router = useRouter()
  const [data, setData] = useState({ email: '', password: '' });
  const [isPending,startTransition] = useTransition()

  const handleCreateAccount = async (e) => {
    e.preventDefault();
      startTransition(async()=>{
        const res = await axios.post('api/users/register',data).then((res)=>res.data)
        if (res.success) {
            toast.success(res.message + " Please Check Your Email !");
            router.push(`${appBaseRoutes?.verification}?email=${data?.email}`);
        } else {
            toast.error(res.message);
          }
      })
  };


  const handleChange = async (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  
  const login = async (e) => {
  router.push(appBaseRoutes?.login)
  }


  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center  '>



      <div className='bg-[url(/assets/images/3.png)] bg-contain bg-no-repeat bg-center w-screen h-screen absolute top-0 z-[-1] grayscale-40 opacity-80 mask-b-from-0  '>
        <span className="bg-pink-500 rounded-full h-[300px] w-[300px] blur-[250px] absolute top-0 left-0 z-0 "></span>
        <span className="bg-primary rounded-full h-[300px] w-[300px] blur-[250px] absolute bottom-0 right-0 z-0 "></span>
      </div>


      <div className='bg-black/5 backdrop-blur-xl p-10 pb-10 rounded-xl max-w-md w-full space-y-5 border border-primary/10  shadow-xl shadow-black m-2 '>
        <div className="flex items-center gap-2 justify-center cursor-pointer " onClick={()=>router.push('.')}>
          <img src="/assets/images/logo.png" alt="" loading="lazy" className="rounded-full h-10 w-10" />
          <h5 className="font-light  tracking-wide text-xl ">Yieldium</h5>
        </div>
        <div className='grid gap-2 text-center'>

          <h1 className='text-2xl font-semibold'>Create New Account
          </h1>
          <p className='text-sm'>Create your Account in 10S
          </p>

        </div>

        <form onSubmit={handleCreateAccount} className=' gap-5 grid space-y-5'>
          <div className='grid gap-3'>

            <p className='text-sm font-semibold'>Email</p>
            <input
              className='bg-white/10 text-white rounded h-10 p-3 text-sm outline-none focus:border-primary/50 focus:border disabled:cursor-not-allowed disabled:bg-neutral-500/30'
              name="email"
              type="email"
              placeholder="Email"
              value={data?.email}
              onChange={handleChange}
              required
              disabled={isPending}
            />

          </div>
          <div className='grid gap-3'>

            <div className='flex justify-between items-baseline'>
              <p className='text-sm font-semibold'>Password</p>
              <p className='text-xs !text-primary/50 hover:!text-primary cursor-pointer' onClick={()=>router.push(appBaseRoutes?.resetPassword)}>Forgot Password ?</p>
            </div>
            <input
              className='bg-white/10 text-white rounded h-10 p-3 text-sm outline-none focus:border-primary/50 focus:border disabled:cursor-not-allowed disabled:bg-neutral-500/30'
              name="password"
              type="password"
              placeholder="Password"
              value={data?.password}
              onChange={handleChange}
              required
              disabled={isPending}
            />
          </div>
          <div className='w-full'>

            <ButtonPrimary className={'w-full'} type="submit" loading={isPending}>Create Account</ButtonPrimary>
          </div>
        </form>
        <p className='text-xs text-center !text-white/80'>Already Have an Account ? <span className='text-xs !text-primary/50 hover:!text-primary cursor-pointer'onClick={login}> Login</span> </p>
       
      </div>
    </div>
  );
}
