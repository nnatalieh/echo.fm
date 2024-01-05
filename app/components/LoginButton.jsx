"use client";

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <button
      className="text-white bg-pink-600 p-2"
      onClick={() => signIn("spotify", { callbackUrl: `/${session?.user.name}` })}
    >
      LoginButton
    </button>
  );
};

export default LoginButton;
