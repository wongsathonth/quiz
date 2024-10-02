"use client"

import Link from "next/link"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Page(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [error,setError] = useState(false)
    const [message,setMessage] = useState("")
    const router = useRouter();

    const signUp = async () => {
        try{
            const res = await axios.post("/api/auth/signup",{
                email,
                password,
            });
            if(res.status == 201){
                setSuccess(true);
                setMessage(res.data.message);
            }else{
                setError(true);
            }
            setMessage(res.data.message);
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {success && (<p className='text-green-600 font-semibold my-4'>{message}</p>)}
                {error && (<p className='text-red-600 font-semibold my-4'>{message}</p>)}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        onChange={(e)=>setEmail(e.target.value)} 
                        id="email" 
                        type="email" 
                        placeholder="Add email" 
                        value={email}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        onChange={(e)=>setPassword(e.target.value)} 
                        id="password" 
                        type="password" 
                        placeholder="Add password" 
                        value={password}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <button 
                        type="button" 
                        onClick={signUp} 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full"
                    >
                        Sign Up
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                    Already have an account? <Link href="../login" className="text-indigo-600 hover:text-indigo-700 font-semibold">Login</Link>
                </p>
            </div>
        </div>
    )
}
