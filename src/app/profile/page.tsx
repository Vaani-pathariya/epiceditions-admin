"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import Logo from "../_components/Logo";

export default function Profile (){
    const router = useRouter();
    const logout = async()=>{
        try{
            await axios.get("/api/admin/logout");
            router.push("/");
        }catch(error: any){
            console.log("Error encountered :",error.message)
        }
    }
    return(
        <div className="text-center">
            <Logo/>
            <button onClick={logout} className="bg-chocolate text-white p-2 m-1 rounded-md">Logout</button>
        </div>
    )
}