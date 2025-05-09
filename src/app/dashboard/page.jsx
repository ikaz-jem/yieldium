"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { signOut } from 'next-auth/react'

export default function page() {
const session = useSession()

async function getData(){
  const data = await axios.get('/api/data')
  console.log(data.data)}

  return (
    <div>
<h1 className='text-8xl'>Dahsboard</h1>

<div className='container mx-auto'>
    <button className='bg-primary p-2 x-5 !text-black' onClick={()=>signOut()}>Logout</button>
  <div className='flex items-center justify-center'>

    <div className='w-80 h-full p-5 bg-neutral-800'>

    <button className='bg-primary p-2 x-5 !text-black' onClick={()=>getData()}>Get Data</button>

    </div>
  </div>

</div>



    </div>
  )
}
