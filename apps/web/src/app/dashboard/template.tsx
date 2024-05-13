import Sidebar  from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/navbar';
import Link from 'next/link';

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      <Sidebar childrenMenu={
          <div className='flex flex-col gap-3'>
            <li>
                <Link href={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
                <Link href={"/dashboard/events"}>Events</Link>
            </li>
            <li>
                <a>Transaction</a>
            </li>
        </div>
      }>
          {children}
        
      </Sidebar>
    </div>
  );
}
