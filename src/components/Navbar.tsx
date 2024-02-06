import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { LuHandMetal } from "react-icons/lu";

function Navbar() {
  return (
    <div className='bg-zinc-100 border-b border-s-zinc-200 w-full py-2 fixed z-10 top-0'>
      <div className='container flex justify-between items-center'>
        <Link href='/' className='text-4xl'><LuHandMetal /></Link>
        <Link href='/sign-in' className={buttonVariants()}>Sign in</Link>
      </div>
    </div>
  )
}

export default Navbar