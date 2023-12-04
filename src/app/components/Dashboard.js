"use client"

import { useRouter } from "next/navigation";
import { signOutUser } from "../../../firebase/authentication";

export default function Dashboard() {
    const router = useRouter();

    function handleSignOut(event) {
        event.preventDefault();

        let response = signOutUser();

        if(response) {
            router.push("/");
        } else {
            console.log("SOMETHING WENT WRONG!!!")
        }
    }
    return (
        <div className="flex flex-col">
            <h1 className="text-5xl">Welcome to your dashboard</h1>
            <button 
                className="bg-emerald-600 px-5 py-3 text-3xl text-white hover:bg-emerald-500 rounded-xl mx-5 my-10"
                onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}