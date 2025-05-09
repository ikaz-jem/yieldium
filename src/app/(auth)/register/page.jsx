"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import ButtonPrimary from '@/app/components/ButtonPrimary';
 import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter()
  const [data, setData] = useState({ email: '', password: '' });

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const res = await axios.post('api/users/register',data).then((res)=>res.data)
    console.log(res.success)
    if (res.success) {
        toast.success(res.message + " Please Check Your Email !");
        router.push(`/verification?email=${data?.email}`);
    } else {
        toast.error(res.message);
      }
  };


  const handleChange = async (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  
  const login = async (e) => {
  router.push('/login')
  }


  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center  '>



      <div className='bg-[url(/assets/images/3.png)] bg-contain bg-no-repeat bg-center w-screen h-screen absolute top-0 z-[-1] grayscale-40 opacity-80'>
        <span className="bg-pink-500 rounded-full h-[300px] w-[300px] blur-[250px] absolute top-0 left-0 z-0 "></span>
        <span className="bg-primary rounded-full h-[300px] w-[300px] blur-[250px] absolute bottom-0 right-0 z-0 "></span>
      </div>


      <div className='bg-black/5 backdrop-blur-xl p-10 pb-10 rounded-xl max-w-md w-full space-y-5 border border-primary/10  shadow-xl shadow-black  '>
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
              className='bg-white/10 text-white rounded h-10 p-3 text-sm outline-none focus:border-primary/50 focus:border'
              name="email"
              type="email"
              placeholder="Email"
              value={data?.email}
              onChange={handleChange}
              required
            />

          </div>
          <div className='grid gap-3'>

            <div className='flex justify-between items-baseline'>
              <p className='text-sm font-semibold'>Password</p>
              <p className='text-xs !text-primary'>Forgot Password ?</p>
            </div>
            <input
              className='bg-white/10 text-white rounded h-10 p-3 text-sm outline-none focus:border-primary/50 focus:border'
              name="password"
              type="password"
              placeholder="Password"
              value={data?.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='w-full'>

            <ButtonPrimary className={'w-full'} type="submit">Create Account</ButtonPrimary>
          </div>
        </form>
        <p className='text-xs text-center !text-white/80'>Already Have an Account ? <span className='!text-primary cursor-pointer' onClick={login}> Login</span> </p>
       
      </div>
    </div>
  );
}
