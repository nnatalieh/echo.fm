"use client";

import React, { useState, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

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
              className="flex items-center gap-x-2 px-4 py-2 text-primary-light-pink hover:bg-primary-dark-pink"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              <FaRegUserCircle />
              <p className="text-sm font-medium">Dashboard</p>
            </a>
            <hr className="mx-2 my-1 text-primary-light-pink" />
            <a
              href="#"
              className="flex items-center gap-x-2 px-4 py-2 text-primary-light-pink hover:bg-primary-dark-pink"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <FiLogOut />
              <p className="text-sm font-medium">Logout</p>
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
            className="text-lg font-bold text-primary-light-pink rounded-full hover:text-primary-pink bg-primary-pink hover:bg-primary-white"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            <div className="flex items-center gap-x-1 py-2 px-3">
              <img className="w-6 lg:w-8 h-6 lg:h-8 rounded-full" src={session?.user.image} alt="profile picture" />
              <p className="truncate text-sm lg:text-lg pl-2">{session?.user.name}</p>
              <IoMdArrowDropdown className="text-xl" />
            </div>
          </button>
          {dropdownOpen && <MyDropdown />}
        </>
      ) : (
        <button
          className="py-2 px-3 rounded-full text-primary-light-pink hover:text-primary-pink bg-primary-pink hover:bg-primary-light-pink"
          onClick={() => signIn('spotify', { callbackUrl: '/dashboard' } )}
        >
          <span className="truncate text-sm lg:text-lg font-bold">Login with Spotify</span>
        </button>
      )}
    </div>
  );
};

export default LoginButton;
