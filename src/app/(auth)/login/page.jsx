"use client"

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { loginSchema } from './validation';
import { toast } from 'sonner';
import ButtonPrimary from '@/app/components/ButtonPrimary';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import LoginFormWrapper from './LoginFormWrapper';


export default function LoginPage() {
  const session = useSession()
  const router = useRouter()

  const [data, setData] = useState({ email: '', password: '' });
  const [captchaValue, setCaptchaValue] = useState("null");
  const [formErrors, setFormErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!captchaValue){

      toast.error('Please verify captcha')
      return
    }

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
        callbackUrl: '/dashboard'
      });
      if (res?.error) {
        toast.error('Sign-in failed. Please try again.');
      } else {
        toast.success('Connected !');
        router.push('/dashboard')
      }
      // Proceed with login API call
    }


    // if (res?.error) {
    //   setError('Invalid credentials');
    // } else {
    //   // Redirect to a protected page
    //   window.location.href = '/dashboard';
    // }
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
  router.push('register')
  }

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <LoginFormWrapper signUp={signUp}  data={data} googleLogin={googleLogin} >
        <form onSubmit={handleSubmit} className=' gap-5 grid space-y-5'>
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

            <ButtonPrimary className={'w-full'} type="submit">Login</ButtonPrimary>
          </div>
        </form>
    </LoginFormWrapper>

  );
}
