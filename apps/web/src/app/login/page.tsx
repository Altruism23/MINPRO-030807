export default function Page() {
    return (
      <div className="flex justify-center w-full p-32 h-full">
        <div className="flex flex-col shadow-2xl p-32 gap-4">
          <p className="flex justify-center text-xl text-blue-600">Login</p>
          <form>
            <div className="flex flex-col gap-2">
              <p>Email</p>
              <input
                type="text"
                placeholder="Your email"
                className="border rounded-lg"
              />
              <p>Password</p>
              <input
                type="password"
                placeholder="Your password"
                className="border rounded-lg"
              />
              <button
                className="border bg-blue-600 rounded-lg mt-3 text-white shadow-md"
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
  