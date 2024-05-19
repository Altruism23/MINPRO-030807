'use server'

import { cookies } from "next/headers";


export const getEvents = async (slug: any) => {
  try {

    const res = await fetch(`http://localhost:8000/api/events/getevents/${slug}`, {
      method: 'GET',
      headers: {
        Cookie: cookies().toString()
      },
    });
    const data = await res.json();
    return data
  } catch (err) {
    console.log(err);
  }
};
