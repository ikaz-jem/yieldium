import { Switch } from '@headlessui/react'
import { useState } from 'react'

export default function AutoCompoundSwitch({enabled,setEnabled}) {

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out  data-checked:bg-primary/30  "
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
      />
    </Switch>
  )
}