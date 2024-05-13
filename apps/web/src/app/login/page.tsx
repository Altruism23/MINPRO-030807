import Link from "next/link"

export default function Page() {
  return (
    <div className="flex justify-center w-full h-full p-32">
      <div className="flex flex-col shadow-2xl p-32 gap-4 text-center">
        <p className="flex justify-center text-xl text-blue-600">Login</p>
        <p>as</p>
        <Link href={"/login/user"} className="btn btn-outline">User</Link>
        <p>or</p>
        <Link href={"/login/organizer"} className="btn btn-outline">Organizer</Link>
        
      </div>
    </div>
  );
}
