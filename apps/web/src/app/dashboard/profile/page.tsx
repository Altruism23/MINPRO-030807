import { cookies } from "next/headers"

export default async function Page() {
    const data = await fetch("http://localhost:8000/api/users/profile", {
        headers: {Cookie: cookies().toString()}
    })
    
    const user = await data.json()

    return (
    <div>
        {JSON.stringify(user)}
    </div>
  )
}
