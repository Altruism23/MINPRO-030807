'use server'


export const activateOrganizer = async (token: any) => {
  try {

    const res = await fetch('http://localhost:8000/api/organizers/verifyorganizer', {
      method: 'GET',
      headers: {
        'Cookie': `session=${token}`
      },
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
