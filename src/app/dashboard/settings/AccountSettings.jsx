'use client'

import { useState } from 'react';
import ButtonPrimary from '@/app/components/ButtonPrimary';
import ButtonSecondary from '@/app/components/ButtonSecondary';
import { ClipLoader } from 'react-spinners';
import { countries } from './countries'; // You’ll need a country list
import { toast } from 'sonner';
import axios from 'axios';

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'

import { FaCheck } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

import clsx from 'clsx'

export default function AccountSettings({user}) {
  const [name, setName] = useState(user.name);
  const [country, setCountry] = useState(user.country || "Set country");
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.email)
  const [selected, setSelected] = useState( user?.country || countries[1])
  const [phone, setPhone] = useState(user.phone || "set Phone");
  
  const [isPending, setIsPending] = useState(false);

console.log(user)


  const handleUpdate = async () => {
    setIsPending(true);
    try {
      await axios.post('/api/user/update-profile', {
        name, country, phone, password,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Update failed');
    }
    setIsPending(false);
  };

  return (
    <div className="space-y-6 p-5 relative w-full">
      {isPending && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-10">
          <ClipLoader size={30} color="white" />
        </div>
      )}

      <h2 className="text-lg font-semibold">Profile Settings</h2>

      <div className="space-y-3">
        <p className="font-medium">{email}</p>
        <p className="text-sm font-medium">Full Name</p>
        <input
          className="w-full p-3 text-sm text-white bg-white/10 rounded outline-none"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p className="text-sm font-medium">Country</p>
        {/* <select
          className="w-full p-3 text-sm text-white bg-white/10 rounded outline-none"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select your country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </select> */}
        <CountrySelect selected={selected} setSelected={setSelected}/>

{/*      
        <p className="text-sm font-medium">Phone Number</p>
        <input
          className="w-full p-3 text-sm text-white bg-white/10 rounded outline-none"
          type="tel"
          placeholder="+123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <ButtonSecondary onClick={() => toast('Verification code sent')}>
          Verify Phone
        </ButtonSecondary> */}

        <p className="text-sm font-medium">Old Password</p>
        <input
          className="w-full p-3 text-sm text-white bg-white/10 rounded outline-none"
          type="password"
          placeholder="Old Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-sm font-medium">New Password</p>
        <input
          className="w-full p-3 text-sm text-white bg-white/10 rounded outline-none"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="pt-4">
        <ButtonPrimary className='w-full' onClick={handleUpdate} disabled={isPending}> 
          Save Changes
        </ButtonPrimary>
      </div>
    </div>
  );
}




export function CountrySelect({ selected ,setSelected}) {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? countries
      : countries.filter((country) => {
          return country.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="mx-auto   ">
      <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
            )}
            displayValue={(person) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <FaChevronDown className="size-4 fill-white/60 group-data-hover:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-(--input-width) rounded-xl border border-white/5 backdrop-blur bg-white/5 p-1 [--anchor-gap:--spacing(1)] empty:invisible',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0'
          )}
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
            >
              <FaCheck className="invisible size-4 fill-white group-data-selected:visible" />
              <div className="text-sm/6 text-white">{person.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}