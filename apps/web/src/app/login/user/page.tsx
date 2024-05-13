import LoginForm from '../../../components/login/LoginForm';
import { cookies } from 'next/headers';

export default async function Page() {
  
  const data = await fetch("http://localhost:8000/api/users/profile", {
    headers: {
      "Cookie": cookies().toString()
    }
  })

  const session = await data.json()
  console.log(session)

  return (
    <div className="flex justify-center w-full p-32 h-full">
      <div className="flex flex-col shadow-2xl p-32 gap-4">
        <p className="flex justify-center text-xl text-blue-600">Login</p>
        <LoginForm/>
      </div>
    </div>
  );
}
