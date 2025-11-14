import { useEffect, useState } from "react";
import axiosInstance from "../services/api/axios.config";

export const useUser =()=>{
    const [user,setUser]= useState<any>(()=>{
        const stored=localStorage.getItem("user_data");
        return stored? JSON.parse(stored):null;
    });
    const [loading,setLoading]  = useState(!user);
    console.log("user",user.mobileNumber);
    
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const response= await axiosInstance.get(`/users/${user.mobileNumber??user.user.mobileNumber}`);
                setUser(response.data);
                localStorage.setItem("user_data",JSON.stringify(response.data));
            }catch(error){
                console.error("Error fetching user data",error);
            }finally{
                setLoading(false);
            }
        };
        fetchUser();
    },[user?.mobileNumber]);
    return {user,loading};
}