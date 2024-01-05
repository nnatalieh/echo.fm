"use client";

import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      className="text-white bg-pink-600 p-2"
      onClick={() => signIn("spotify", { callbackUrl: "/" })}
    >
      LoginButton
    </button>
  );
};

export default LoginButton;
