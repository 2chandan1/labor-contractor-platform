import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="p-6 w-full min-h-[77dvh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">

      {/* Floating shapes using only built-in Tailwind animations */}
      <div className="absolute w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl -top-10 -left-10 animate-pulse" />
      <div className="absolute w-32 h-32 rotate-45 bg-blue-400/20 blur-2xl top-28 -right-10 animate-ping" />
      <div className="absolute w-40 h-40 rounded-full border border-purple-300/20 bottom-12 left-1/4 animate-spin" />
      <div className="absolute w-24 h-24 rounded-full bg-white/10 blur-xl bottom-28 right-1/3 animate-bounce" />

      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl relative z-10">
        <CardContent className="text-center p-10">

          <h1 className="text-7xl font-extrabold text-white mb-4 drop-shadow-lg animate-bounce">
            404
          </h1>

          <p className="text-xl text-gray-200 mb-2">
            Page Not Found
          </p>

          <p className="text-gray-300 mb-8">
            The page you're looking for doesn’t exist or may have been moved.
          </p>

          {/* FIXED: This no longer reloads the whole page */}
          <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
            <Link to="/">Return Home</Link>
          </Button>

        </CardContent>
      </Card>
      
    </div>
  );
};

export default NotFound;
