import Sidebar  from '@/components/dashboard/organizer/Sidebar';
import Navbar from '@/components/dashboard/organizer/navbar';
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
                <Link href={"/dashboard/organizer"}>Dashboard</Link>
            </li>
            <li>
                <Link href={"/dashboard/organizer/events"}>Events</Link>
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
