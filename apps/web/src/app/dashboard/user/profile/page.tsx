import Profile from "@/components/dashboard/user/profile"
import { cookies } from "next/headers"

export default async function Page() {
    // const data = await fetch("http://localhost:8000/api/users/profile", {
    //     headers: {Cookie: cookies().toString()}
    // })
    
    // const user = await data.json()

    return (
    <div>
        <Profile/>
    </div>
  )
}
