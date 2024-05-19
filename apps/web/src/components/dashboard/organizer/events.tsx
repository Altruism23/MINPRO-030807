'use client'
import { getEvents } from '@/lib/organizer/getEvent';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const formatRupiah = (amount: number | bigint) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

interface Event {
    id?: number,
    name?: string,
    startDate?: Date,
    location?: string,
    price?: number
}

interface EventResponse {
    events?: Event[]
}

export default function ContentEvents() {
  const params = useParams()
  const [events, setEvents] = useState<EventResponse>({})
  const getMoreEvent = async (slug: any) => {
    try {
      const res =  await getEvents(slug)
      setEvents(res)
    } catch (error) {
        console.log(error)
    }
  }
  console.log(events)

  useEffect(() => {
    getMoreEvent(params.slug)
  }, [])
  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <h1 className="text-3xl font-bold mb-5">Event List</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.events?.map((item) => {
          const d1 = new Date(item.startDate!);
          const date = d1.toDateString();
          const formattedPrice = formatRupiah(item.price!);
          return (
            <Link href={`/events/${item.id}`}>
            <div key={item.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-1"><strong>Date:</strong> {date}</p>
              <p className="text-gray-600 mb-1"><strong>Location:</strong> {item.location}</p>
              <p className="text-gray-800"><strong>Price:</strong> {formattedPrice}</p>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
