"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();

  const handleButton = () => {
    if (session) {
      signOut({ callbackUrl: "/" });
    } else {
      signIn("spotify", { callbackUrl: `/${session?.user.name}` });
    }
  };

  return (
    <button
      className="text-white hover:text-black bg-pink-600 hover:bg-white text-lg font-bold rounded-lg p-2 "
      onClick={handleButton}
    >
      {/* TODO: change "Logged in" to the user's profile pic and name */}
      {session ? "Logged in" : "Login with Spotify"}
    </button>
  );
};

export default LoginButton;
