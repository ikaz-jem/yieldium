"use client"
import React from 'react'

export default function ButtonSecondary({className,children , onClick,Icon}) {



  return (
    <button onClick={onClick} className={`${className}  flex items-center justify-center gap-5 !text-sm !rounded-lg cursor-pointer before:ease relative h-10 w-28 overflow-hidden border border-white/40   shadow-lg transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-40  before:bg-white before:opacity-40 before:duration-700 hover:shadow-primary/20 hover:before:-translate-x-40`}>
      <span className="relative z-10">{children || 'button'}  </span>
      {Icon && <Icon className='text-2xl' />}
    </button>
  )
}
