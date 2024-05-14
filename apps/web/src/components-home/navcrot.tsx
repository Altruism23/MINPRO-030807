"use client"
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";


export default function Navcrot() {
    const [loggedIn, setLoggedIn] = useState(false); // State untuk melacak status login
    const [userRole, setUserRole] = useState(null); // State untuk melacak peran pengguna setelah login

    useEffect(() => {
        // Pemeriksaan status login saat komponen dimuat
        checkLoginStatus();
    }, []);

    // Fungsi untuk memeriksa status login
    const checkLoginStatus = async () => {
        try {
            // Kirim request ke backend untuk memeriksa status login
            const response = await axios.get('/api/checkLoginStatus');
            const { loggedIn, role } = response.data;
            setLoggedIn(loggedIn);
            setUserRole(role);
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    }

    // Fungsi untuk login
    const handleLogin = async (role: any ) => {
        try {
            // Kirim request ke backend untuk melakukan login
            const response = await axios.post('/api/login', { role });
            if (response.data.success) {
                // Login berhasil, perbarui status login dan peran pengguna
                setLoggedIn(true);
                setUserRole(role);
            } else {
                console.error("Login failed:", response.data.error);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    // Fungsi untuk logout
    const handleLogout = async () => {
        try {
            // Kirim request ke backend untuk melakukan logout
            const response = await axios.post('/api/logout');
            if (response.data.success) {
                // Logout berhasil, perbarui status login dan peran pengguna
                setLoggedIn(false);
                setUserRole(null);
            } else {
                console.error("Logout failed:", response.data.error);
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between py-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-10 bg-orange-800 h-32">
                <div className="flex justify-center items-center">
                    <button className="font-extrabold text-2xl">
                        Event
                    </button>
                </div>
                <div className="flex justify-center items-center ml-4">
                    <div className="relative">
                        <CiSearch className="text-white absolute left-0 top-1/2 transform -translate-y-1/2 ml-2" />
                        <input type="text" placeholder="search"
                         className="rounded-full w-[200px] flex-shrink text-white
                        pl-8" />
                    </div>
                </div>
                <div className="flex justify-center items-center text-xl">
                    {/* Perubahan terjadi di sini */}
                    {loggedIn ? (
                        <>
                            {userRole === 'organizer' && ( // Menampilkan "Create Event" hanya jika pengguna memiliki peran sebagai organizer
                                <a href="#" className="mx-1">
                                    Create Event
                                </a>
                            )}
                            <button onClick={handleLogout} className="mx-1 bg-black w-24 h-10 rounded-full hover:bg-neutral-800 ">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="#" className="mx-1">
                                Find Event
                            </a>
                        </>
                    )}
                    {!loggedIn && (
                        <div className="">
                            <button onClick={() => handleLogin('user')} className="mx-1 bg-black w-24 h-10 rounded-full hover:bg-neutral-800 ">
                                Login
                            </button>
                            <button onClick={() => handleLogin('organizer')} className="mx-1 bg-black w-24 h-10 rounded-full hover:bg-neutral-800">
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
