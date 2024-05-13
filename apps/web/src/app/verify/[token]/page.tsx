'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const handleVerify = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/organizers/verifyorganizer', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${params.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      alert('Verify Success');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-5">
      <p>Please click the verify button below!</p>
      <Link
        className="ring-1 bg-black text-white px-8 rounded-md mx-auto max-w-[1200px] btn"
        onClick={handleVerify}
        href={'/login'}
      >
        Verify
      </Link>
    </div>
  );
}
