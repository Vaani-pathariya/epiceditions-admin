"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function login (){
    const router = useRouter();
    const [loading,setLoading]=useState(false);
    const [disabledButton,setDisabledButton]=useState(false);
    const [user,setUser]=useState({
        email:"",
        password :""
    })
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0)
        {
            setDisabledButton(false);
        }
        else {
            setDisabledButton(true);
        }
    },[user])
    const Login=async()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/admin/login",user);
            console.log("Login successful", response.data);
            router.push("/allbooks");
        } catch (error:any) {
            console.log("Signup failed", error.message)
        }finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <div>{loading?"Processing":"Login"}</div>
            <label htmlFor="email">Email</label>
            <input type="text" value={user.email} id ="email" onChange={(e)=>setUser({...user,email:e.target.value})} className="bg-slate-300"></input>
            <label htmlFor="password">Password</label>
            <input type="password" value={user.password} id="password" onChange={(e)=>setUser({...user,password:e.target.value})} className="bg-slate-300"></input>
            <button className="bg-blue-300" onClick={Login}>{disabledButton?"No Login":"Login"}</button>
  
        </div>
    )
}