'use server'

export const verifyEmail = async (token: any) => {
    try {
        const res = await fetch('http://localhost:8000/api/organizers/verifyupdateemail', {
            method: 'PATCH',
            headers: {
             "Cookie": `session=${token}`,
            //  "Content-Type": 'application/json'
            }, 
          });
          const data = await res.json();
          console.log(data);
          return data
    } catch (error) {
        console.log(error)
    }
}