"use client"
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";

export default function Navcrot() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch('/api/checkLoginStatus');
            if (response.ok) {
                const data = await response.json();
                const { loggedIn, role } = data;
                setLoggedIn(loggedIn);
                setUserRole(role);
            } else {
                console.error("Failed to check login status");
            }
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    }

    const handleLogin = async (role: string) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role })
            });
            if (response.ok) {
                setLoggedIn(true);
                setUserRole(role);
            } else {
                console.error("Login failed:", response);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout');
            if (response.ok) {
                setLoggedIn(false);
                setUserRole(null);
            } else {
                console.error("Logout failed:", response);
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-orange-800 h-32 py-2">
            <div className="flex flex-col sm:flex-row justify-between py-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-10">
                <div className="flex justify-center items-center">
                    <button className="font-extrabold text-2xl text-white">
                        Event
                    </button>
                </div>
                <div className="flex justify-center items-center ml-4">
                    <div className="relative">
                        <CiSearch className="text-white absolute left-0 top-1/2 transform -translate-y-1/2 ml-2" />
                        <input type="text" placeholder="search" className="rounded-full w-[200px] flex-shrink text-white pl-8" />
                    </div>
                </div>
                <div className="flex justify-center items-center text-xl">
                    {loggedIn ? (
                        <>
                            {userRole === 'organizer' && (
                                <a href="#" className="mx-1 text-white">Create Event</a>
                            )}
                            <button onClick={handleLogout} className="mx-1 bg-black w-24 h-10 rounded-full hover:bg-gray-700 text-white">Logout</button>
                        </>
                    ) : (
                        <>
                            <a href="#" className="mx-1 text-white">Find Event</a>
                            <div className="">
                                <button onClick={() => handleLogin('user')} className="mx-1 bg-black w-24 h-10 rounded-full hover:bg-gray-700 text-white">Login</button>
                                <button onClick={() => handleLogin('organizer')} className="mx-1 bg-black w-24 h-10 rounded-full hover:bg-gray-700 text-white">Sign Up</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
