import Sidebar  from '@/components/dashboard/user/Sidebar';
import Navbar from '@/components/dashboard/user/navbar';
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
                <Link href={"/dashboard/user"}>Dashboard</Link>
            </li>
            <li>
                <Link href={"/dashboard/user/events"}>Events</Link>
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
