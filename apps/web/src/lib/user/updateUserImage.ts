'use server';

import Cookies from 'js-cookie';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const updateUserImage = async (formData: FormData) => {
  try {
    console.log(formData, 'values disini');
    // const formData = new FormData()
    // formData.append('image', values.image)

    // console.log(formData)
    
    const res = await fetch(
      'http://localhost:8000/api/users/updateimage',
      {
        method: 'PATCH',
        headers: {
          Cookie: cookies().toString(),
        },
        body: formData
      },
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  revalidateTag('profile');
  redirect('/dashboard/user/profile');
};
