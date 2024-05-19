'use client'

import { verifyEmail } from '@/lib/organizer/verifyemail';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  console.log(params)
  const handleVerify = async () => {
    try {
      await verifyEmail(params.token)
      alert('Update Email Success');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-5">
      <p>Please click the update email button below!</p>
      <Link
        className="ring-1 bg-black text-white px-8 rounded-md mx-auto max-w-[1200px] btn"
        onClick={handleVerify}
        href={'/dashboard/organizer/profile'}
      >
        Update email
      </Link>
    </div>
  );
}
