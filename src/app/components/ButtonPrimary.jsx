"use client"
import React from 'react'

export default function ButtonPrimary({className,children , onClick}) {



  return (
    <button onClick={onClick} className={`${className} !text-sm !rounded-lg cursor-pointer before:ease relative h-10 w-28 overflow-hidden border border-primary/40 bg-primary !text-black shadow-lg transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:bg-white before:opacity-40 before:duration-700 hover:shadow-primary/20 hover:before:-translate-x-40`}>
      <span className="relative z-10">{children || 'button'}</span>
    </button>
  )
}
