import { useEffect, useState } from "react";
import axiosInstance from "../services/api/axios.config";

export const useUser = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("user_data");
        if (!stored) {
            setLoading(false);
            return;
        }

        const storedUser = JSON.parse(stored);
        setUser(storedUser);

        const mobile = storedUser.mobileNumber || storedUser.user?.mobileNumber;
        if (!mobile) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(`/users/${mobile}`);
                setUser(response.data);
                localStorage.setItem("user_data", JSON.stringify(response.data));
            } catch (error) {
                console.error("Error fetching user data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
};
