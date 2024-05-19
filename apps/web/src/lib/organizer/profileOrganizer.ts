'use server';
import { cookies } from 'next/headers';

export const profileOrganizer = async () => {
  try {
    const data = await fetch('http://localhost:8000/api/organizers/profile', {
      method: 'GET',
      headers: { Cookie: cookies().toString() },
      next: {tags: ['profile']}
    }
);
    const user = await data.json();

    const {organizerName, email, password, image } = user

    // console.log(user)
    // return JSON.parse(JSON.stringify(user));
    return {organizerName, email, password, image}
  } catch (error) {
    console.log(error);
  }
};
