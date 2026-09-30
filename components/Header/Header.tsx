"use client";

import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState();
  return (
    <header className="fixed top-0 bg-white/95 backdrop-blur-sm w-full shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <span className="capitalize text-gray-500 text-2xl font-bold">
              Wego zain
            </span>
          </Link>
          <Navbar />

          <button className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <IoMenu className="w-6 h-6" />
            )}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button className="bg-blue-600 hover:bg-blue-800 text-white rounded-md px-4 py-2 ">
              <Link href={"/login"}>Login</Link>
            </button>
            <button className="bg-blue-600 hover:bg-blue-800 text-white rounded-md px-4 py-2 ">
              <Link href={"/register"}> Register</Link>
            </button>
          </div>
        </div>
      </div>
      {isOpen && ( 
        <nav className="md:hidden flex flex-col items-center space-y-6 mt-4 pb-4">
          <Link
            className="text-gray-600 hover:text-blue-600 transition-colors capitalize"
            href={"/about"}
          >
            About
          </Link>

          <Link
            className="text-gray-600 hover:text-blue-600 transition-colors capitalize"
            href={"/products"}
          >
            Products
          </Link>
          <Link
            className="text-gray-600 hover:text-blue-600 transition-colors capitalize"
            href={"/products/search"}
          >
            Search
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
