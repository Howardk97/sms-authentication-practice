"use client"

import { useState } from "react";
import { signUpUser } from "../../../firebase/authentication";
import { useRouter } from "next/navigation";

export default function SignUp () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    console.log(email, password)

    function handleSignUp(event) {
        event.preventDefault();

        const {response, error} = signUpUser(email, password);

        if(error) {
            console.log("SIGN UP ERROR: ", error);
        }
        
        router.push("/dashboard");
    }

    return (
        <form onSubmit={handleSignUp} className="bg-red-500 text-white rounded-xl">
            <h1 className="text-5xl p-5">Sign Up!</h1>
            <div className="flex flex-col p-5">
                <input 
                    className="rounded-lg p-3 text-xl my-5 text-black" 
                    placeholder="Email"
                    onChange={(event) => {setEmail(event.target.value)}}
                />
                <input 
                    className="rounded-lg p-3 text-xl my-5 text-black" 
                    placeholder="Password"
                    onChange={(event) => {setPassword(event.target.value)}}
                />
            </div>
            <div className="flex justify-center items-center">
                <button className="bg-emerald-600 px-5 py-3 text-3xl text-white hover:bg-emerald-500 rounded-xl mx-5 my-10">SUBMIT!</button>
            </div>
        </form>
    )
}