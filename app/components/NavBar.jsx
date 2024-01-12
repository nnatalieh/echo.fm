import Link from "next/link";

import LoginButton from "./LoginButton";

const NavBar = () => (
  <nav>
    <div className="flex items-center justify-between px-6 py-2">
      <Link 
        className="text-4xl font-bold text-primary-pink hover:text-primary-white"
        href="/"
      >
        echo.fm
      </Link>
      <LoginButton />
    </div>
  </nav>
);

export default NavBar;
