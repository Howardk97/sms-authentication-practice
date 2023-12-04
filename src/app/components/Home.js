"use client"
import { useRouter } from "next/navigation"

export default function Home () {
    const router = useRouter();
    return (
        <div className="bg-red-500 p-10 rounded-xl">
            <h1 className="text-5xl font-bold text-white mb-20">Firebase SMS Practice</h1>
            <div className="flex justify-around mt-20">
                <button 
                    className="bg-emerald-600 px-5 py-3 text-3xl text-white hover:bg-emerald-500 rounded-xl"
                    onClick={() => {router.push("/login")}}
                >
                    Login
                </button>
                <button 
                    className="bg-emerald-600 px-5 py-3 text-3xl text-white hover:bg-emerald-500 rounded-xl"
                    onClick={() => {router.push("/signup")}}
                >
                    Sign Up
                </button>
            </div>
        </div>
    )
}