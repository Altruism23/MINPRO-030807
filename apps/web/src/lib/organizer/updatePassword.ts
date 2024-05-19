'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const updateOrganizerPassword = async (values: any) => {
  try {
    console.log(values, 'values disini');
    const res = await fetch(
      'http://localhost:8000/api/organizers/updatepassword',
      {
        method: 'PATCH',
        headers: {
          Cookie: cookies().toString(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      },
    );
    const data = await res.json();
    console.log(data);

  } catch (error) {
    console.log(error);
  }

  revalidateTag('profile');
  redirect('/dashboard/organizer/profile');
};
