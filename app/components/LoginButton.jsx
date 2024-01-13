"use client";

import React, { useState, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";


const LoginButton = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const MyDropdown = () => {
    return (
      <div className="relative inline-block text-left">
        <div
          className="absolute origin-top-right right-0 mt-5 w-48 rounded-lg shadow-lg bg-primary-pink ring-1 ring-opacity-5 ring-primary-dark-gray "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <a
              href="/dashboard"
              className="text-sm font-medium px-4 py-2 text-primary-white hover:bg-primary-dark-pink block"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-sm font-medium px-4 py-2 text-primary-white hover:bg-primary-dark-pink block"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Settings
            </a>
            <a
              href="#"
              className="text-sm font-medium px-4 py-2 text-primary-white hover:bg-primary-dark-pink block"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </a>
          </div>
        </div> 
      </div> 
    );
  };

  return (
    <div ref={dropdownRef}>
      {session ? (
        <>
          <button
            type="button"
            className="text-lg font-bold text-primary-white rounded-full hover:text-primary-dark-gray bg-primary-pink hover:bg-primary-white"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            <div className="flex items-center gap-x-2 py-2 px-3">
              <img className="w-6 lg:w-8 h-6 lg:h-8 rounded-full" src={session?.user.image} alt="profile picture" />
              <p className="truncate text-sm lg:text-lg">{session?.user.name}</p>
            </div>
          </button>
          {dropdownOpen && <MyDropdown />}
        </>
      ) : (
        <button
          className="py-2 px-3 rounded-full bg-primary-pink hover:bg-primary-white"
          onClick={() => signIn('spotify', { callbackUrl: '/dashboard' } )}
        >
          <span className="truncate text-sm lg:text-lg font-bold text-primary-white hover:text-primary-dark-gray">Login with Spotify</span>
        </button>
      )}
    </div>
  );
};

export default LoginButton;
