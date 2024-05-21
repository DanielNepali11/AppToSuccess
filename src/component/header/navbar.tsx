import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="flex items-center h-16 bg-gray-800 text-white px-4">
      {/* Logo */}
      <div className="flex items-center mr-auto">
        <Link href={"/"}>
          <img src="" alt="Logo" className="h-8 w-auto mr-4" />
          <span className="text-xl font-bold">AppToSuccess</span>
        </Link>
      </div>

      {/* Menus */}
      <ul className="flex space-x-4 mx-auto">
        {" "}
        {/* Center menus */}
        <li>
          <Link href={"/"}>
            <p className="text-white hover:text-gray-200 px-3 py-2 rounded-md">
              Home
            </p>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <p className="text-white hover:text-gray-200 px-3 py-2 rounded-md">
              About
            </p>
          </Link>
        </li>
        {/* Add more menu items here */}
      </ul>

      {/* Login & Profile */}
      <div className="flex items-center ml-auto">
        <Link href={"/login"}>
          <p className="text-white hover:text-gray-200 px-3 py-2 rounded-md">
            Login
          </p>
        </Link>
        <Link href={"/profile"}>
          <p className="text-white hover:text-gray-200 px-3 py-2 rounded-md">
            Profile
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
