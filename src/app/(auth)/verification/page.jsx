"use client"

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import ButtonPrimary from '@/app/components/ButtonPrimary';
 import { useRouter, useSearchParams } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { generateVerificationToken } from '@/app/lib/tokens';
import ButtonSecondary from '@/app/components/ButtonSecondary';
import { isUuid } from 'uuidv4';

export default function ValidateEmail() {
  const session = useSession()
  const router = useRouter()

  const params = useSearchParams()
  const email = params?.get('email')
  const token = params?.get('verify')
  console.log(email)


  const [verificationCode, setVerificationCode] = useState(token || '');
  const [captchaValue, setCaptchaValue] = useState(null);

  
  const handleVerify = async (e) => {
    e.preventDefault();

    const code = isUuid(verificationCode)

    if (code) {
      console.log({code})
    }else {
      
      console.log('not uuid')
      console.log({code})
    }
    return
    const res = await axios.post('api/users/register',data).then((res)=>res.data)
    if (res.success) {
        toast.success(res.message);
        router.push('/login');
        // Automatically sign the user in after registration
    } else {
        toast.error(res.message);
        router.push('/login');
      }
  };



  const handleChange = async (e) => {
    setVerificationCode(e.target.value)
  }



  const login = async (e) => {
  router.push('/login')
  }

  
  const goToDashboard = async (e) => {
  router.push('/dashboard')
  }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center  '>



      <div className='bg-[url(/assets/images/3.png)] bg-contain bg-no-repeat bg-center w-screen h-screen absolute top-0 z-[-1] grayscale-40 opacity-80'>
        <span className="bg-pink-500 rounded-full h-[300px] w-[300px] blur-[250px] absolute top-0 left-0 z-0 "></span>
        <span className="bg-primary rounded-full h-[300px] w-[300px] blur-[250px] absolute bottom-0 right-0 z-0 "></span>
      </div>


      <div className='bg-black/5 backdrop-blur-xl p-10 pb-10 rounded-xl max-w-xl w-full space-y-10 border border-primary/10  shadow-xl shadow-black  '>
        <div className="flex items-center gap-2 justify-center cursor-pointer " onClick={()=>router.push('.')}>
          <img src="/assets/images/logo.png" alt="" loading="lazy" className="rounded-full h-10 w-10" />
          <h5 className="font-light  tracking-wide text-xl ">Yieldium</h5>
        </div>
        <div className='grid gap-2 text-center'>

          <h1 className='text-2xl font-semibold'>Check Your Email !
          </h1>
          <p className='text-sm !text-white/50'>we have sent you an email with a Verification code !
          </p>

        </div>

        <form onSubmit={handleVerify}  className=' gap-5 grid space-y-2'>
          <div className='grid gap-3'>

            <p className='text-sm font-semibold'>Verification Code</p>
<div className='flex w-fullgap-2 bg-white/10 p-2 rounded'>


            <input
              className=' text-white  h-10 p-3 text-sm outline-none  w-full  '
              name="verification"
              type="text"
              placeholder="eg : 1b817622-589e-4288-b788-7b8df83010a3"
              value={verificationCode}
              onChange={handleChange}
              required
              />
            <ButtonPrimary type="submit" >Verify</ButtonPrimary>

              </div>
          </div>

          <div className='w-full gap-5 flex'>
            <ButtonSecondary  onClick={goToDashboard}>Verify Later</ButtonSecondary>
          </div>
        </form>       
      </div>
    </div>
  );
}
