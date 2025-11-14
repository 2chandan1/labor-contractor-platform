import { useUser } from "../../hooks/useUser";

export default function Index() {
  const { user, loading } = useUser();

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1>No user found</h1>;

  const profile = user.profile || {};

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {profile.fullName}</h1>

      <div className="bg-slate-800 rounded-xl p-6 shadow-lg space-y-3">
        <p><span className="font-semibold">Mobile:</span> {user.user.mobileNumber}</p>
        <p><span className="font-semibold">Age:</span> {profile.age}</p>
        <p><span className="font-semibold">Gender:</span> {profile.gender}</p>
        <p><span className="font-semibold">Experience:</span> {profile.experience} years</p>
        <p><span className="font-semibold">Address:</span> {profile.address}</p>
        <p><span className="font-semibold">City:</span> {profile.city}</p>

        {profile.aadhaarCard && (
          <div className="mt-4">
            <span className="font-semibold">Aadhaar:</span><br />
            <img
              src={`http://localhost:5000/${profile.aadhaarCard.replace(/\\/g, "/")}`}
              alt="Aadhaar"
              className="w-40 mt-2 rounded-lg border border-slate-700"
            />
          </div>
        )}
      </div>
    </div>
  );
}
