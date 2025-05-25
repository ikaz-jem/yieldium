"use client"

import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { loginSchema } from './validation';
import { toast } from 'sonner';
import ButtonPrimary from '@/app/components/ButtonPrimary';
import { useRouter } from 'next/navigation';
import LoginFormWrapper from './LoginFormWrapper';
import { appBaseRoutes } from '@/routes';

export default function LoginPage() {
  const session = useSession()
  const router = useRouter()

  const [data, setData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isPending,startTransition]=useTransition()

  const handleSubmit = async (e) => {
    e.preventDefault();

    startTransition(async ()=> {
 
    let result = loginSchema?.safeParse(data)
    
    if (!result.success) {
      const fieldErrors = result.error.format();
      
      if (!result.success) {
        const fieldErrors = result.error.format();
        setFormErrors({
          email: fieldErrors.email?._errors[0],
          password: fieldErrors.password?._errors[0]
        });
      }


      if (fieldErrors.password) {
        toast.error(fieldErrors.password?._errors[0])
      }
      if (fieldErrors.email) {
        toast.error(fieldErrors.email?._errors[0])
      }
    } else {
      toast.info('signing in ...')
      const res = await signIn('credentials', {
        redirect: false,
        email: data?.email,
        password: data?.password,
        // callbackUrl: '/dashboard'
      });
      if (res?.ok) {
    // Force a page reload or session refresh
    // window.location.href = '/dashboard'; // hard reload
    // OR (less reliable):
    // router.refresh(); if using app router
  } 
      if (res?.error) {
        toast.error('Sign-in failed. Please try again.');
      } else {
        toast.success('Connected !');
        router.push('/dashboard')
      }
      // Proceed with login API call
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

  const googleLogin = async (e) => {
    await signIn('google');
    e.preventDefault();
  }
  
  const signUp = async (e) => {
  router.push(appBaseRoutes?.singUp)
  }

  const forgotPasword = (value) => {
  router.push(appBaseRoutes?.resetPassword)
  };

  return (
    <LoginFormWrapper signUp={signUp}  data={data} googleLogin={googleLogin} router={router} loading={isPending} >
        <form onSubmit={handleSubmit} className=' gap-5 grid space-y-5 relative'>


          <div className='grid gap-3'>
            <p className='text-sm font-semibold'>Email</p>
            <input
              className='bg-white/10 aria-selected:bg-none auto text-white rounded h-10 p-3 text-sm outline-none focus:border-primary/50 focus:border disabled:cursor-not-allowed disabled:bg-neutral-400/30'
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
              <p className='text-xs !text-primary/50 hover:!text-primary cursor-pointer' onClick={forgotPasword} >Forgot Password ?</p>
            </div>
            <input
        
              className='bg-white/10  text-white rounded h-10 p-3 text-sm outline-none focus:border-primary/50 focus:border disabled:cursor-not-allowed disabled:bg-neutral-400/30'
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

            <ButtonPrimary className={'w-full'} loading={isPending} type="submit">Login</ButtonPrimary>
          </div>
        </form>
    </LoginFormWrapper>

  );
}
