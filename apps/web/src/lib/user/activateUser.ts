'use server'


export const activateUser = async (token: any) => {
  try {

    const res = await fetch('http://localhost:8000/api/users/verifyuser', {
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
