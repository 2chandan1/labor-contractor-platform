import { useEffect, useState } from "react";
import axiosInstance from "../services/api/axios.config";

export const useUser =()=>{
    const [user,setUser]= useState<any>(null);
    const [loading,setLoading]  = useState(true);
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const mobileNumber=JSON.parse(localStorage.getItem("user_data")||"{}")?.mobileNumber;
                if(!mobileNumber) return;
                const response= await axiosInstance.get(`/users/${mobileNumber}`);
                setUser(response.data);
            }catch(error){
                console.error("Error fetching user data",error);
            }finally{
                setLoading(false);
            }
        };
        fetchUser();
    },[]);
    return {user,loading};
}