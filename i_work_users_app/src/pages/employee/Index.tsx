import  { useEffect, useState } from "react";
export default function Index()  {
    const [user, setUser] = useState<any>(null);
    useEffect(()=>{
        const storeData=localStorage.getItem("user_data");
        if(storeData){
            console.log("storeData",storeData);
            
            setUser(JSON.parse(storeData));
        }
    },[])
    if(!user) return <h1>Loading...</h1>
    return(
                <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.fullName}</h1>

      <div className="bg-slate-800 rounded-xl p-6 shadow-lg space-y-3">
        <p><span className="font-semibold">Mobile:</span> {user.mobile}</p>
        <p><span className="font-semibold">Age:</span> {user.age}</p>
        <p><span className="font-semibold">Gender:</span> {user.gender}</p>
        <p><span className="font-semibold">Experience:</span> {user.experience} years</p>
        <p><span className="font-semibold">Location:</span> {user.location}</p>

        {user.aadhaarCard && (
          <div className="mt-4">
            <span className="font-semibold">Aadhaar:</span><br />
            <img
              src={user.aadhaarCard}
              alt="Aadhaar"
              className="w-40 mt-2 rounded-lg border border-slate-700"
            />
          </div>
        )}
      </div>
    </div>
    )
}