'use client';

import { SignOut } from "@/lib/auth-action";

const page = () => {
  return (
    <div className="px-4 md:px-8 py-4">
        <button onClick={() => SignOut()}>SignOut</button>
    </div>
  )
}

export default page
