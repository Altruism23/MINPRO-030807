export default function Page() {
  return (
    <div className="flex justify-center w-full h-full p-32">
      <div className="flex flex-col shadow-2xl p-32 gap-4">
        <p className="flex justify-center text-xl text-blue-600">Register</p>
        <form>
          <div className="flex flex-col gap-2">
            <p>Username</p>
            <input
              type="text"
              placeholder="Your Username"
              className="border-2 border-solid border-black rounded-lg"
            />
            <p>Email</p>
            <input
              type="email"
              placeholder="Your email"
              className="border-2 border-solid border-black rounded-lg"
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Your password"
              className="border-2 border-solid border-black rounded-lg"
            />
            <p>Role:</p>
            <select className="select border-2 border-solid border-black w-full">
              <option disabled selected>
                Select Role:
              </option>
                <option>User</option>
                <option>Event Organizer</option>
            </select>
            <p>Referral Code:</p>
            <input type="text" placeholder="Your Referral Code" className="border-2 border-solid border-black rounded-lg"/>
            <button
              className="border bg-blue-600 rounded-lg mt-3 text-white shadow-md btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
