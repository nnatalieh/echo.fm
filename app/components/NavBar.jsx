import Link from "next/link";

import LoginButton from "./LoginButton";

const NavBar = () => (
  <nav>
    <div className="flex items-center justify-between px-3 lg:px-8 py-3">
      <Link 
        className="flex items-center gap-x-2 flex-grow"
        href="/"
      >
        <img className="h-8 lg:h-12" src="/favicon.ico" alt="logo" />
        <span className="text-3xl lg:text-4xl font-bold text-primary-pink hover:text-primary-white">echo.fm</span>
      </Link>
      <div className="flex-shrink">
        <LoginButton />
      </div>
    </div>
  </nav>
);

export default NavBar;
