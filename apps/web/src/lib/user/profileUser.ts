'use server';
import { cookies } from 'next/headers';

export const profileUser = async () => {
  try {
    const data = await fetch('http://localhost:8000/api/users/profile', {
      method: 'GET',
      headers: { Cookie: cookies().toString() },
      next: {tags: ['profile']}
    }
);
    const user = await data.json();

    const {username, email, firstName, lastName, password, image, referralCode, Point } = user

    // console.log(user)
    // return JSON.parse(JSON.stringify(user));
    return {username, email, firstName, lastName, password, image, referralCode, Point}
  } catch (error) {
    console.log(error);
  }
};
