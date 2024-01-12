"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();

  const handleButton = () => {
    if (session) {
      signOut({ callbackUrl: "/" });
    } else {  
      signIn("spotify", { callbackUrl: "/dashboard" });
    }
  };

  return (
    <div>
      <button
        className="text-primary-white hover:text-primary-dark-gray bg-primary-pink hover:bg-primary-white text-lg font-bold rounded-lg p-2"
        onClick={handleButton}
      >
        {/* TODO: change "Logged in" to the user's profile pic and name */}
        {session ? "Logged in" : "Login with Spotify"}
      </button>
    </div>
  );
};

export default LoginButton;
