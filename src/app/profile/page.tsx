"use client"
import axios from "axios"
import { useRouter } from "next/navigation";

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
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}