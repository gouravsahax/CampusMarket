'use client';

import { SignIn } from '@/lib/auth-action'

const page = () => {
  return (
    <div className='w-screen h-[80vh] flex justify-center items-center'>
      <button onClick={() => SignIn()} className='cursor-pointer px-2 py-1 border-1 border-white hover:bg-white hover:text-black rounded-sm text-md'>Sign In With Google</button>
    </div>
  )
}

export default page
