
import React from 'react'
import { Button } from '../ui/button'
import { auth, signOut } from "@/auth";
import Link from 'next/link';




const Header = async () => {
  const session = await auth();
  return (
    <div className="border-b flex justify-between p-10">
      <div className="text-4xl"><Link href={'/'}>Home</Link></div>
      {session?.user?.name ? (
        <div>
 
          <a href='/myblog'>{session.user.name}</a> 
        
        </div>
      ) : (
        <Button className="text-white px-4 py-4">Sign In</Button>
      )}
    </div>
  );
}


export default Header
