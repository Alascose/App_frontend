import React, { useState } from "react";
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-blue-700  gap-4">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-white text-2xl">Mon Site</h1>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
        <ul className="hidden md:flex text-white gap-4">
          <li className="hover:scale-105 transition duration-300 hover:text-gray-300 cursor-pointer">
            Accueil
          </li>
          <li className="hover:scale-105 transition duration-300 hover:text-gray-300 cursor-pointer">
            Service
          </li>
          <li className="hover:scale-105 transition duration-300 hover:text-gray-300 cursor-pointer">
            Blog
          </li>
          <li className="hover:scale-105 transition duration-300 hover:text-gray-300 cursor-pointer">
            Contact
          </li>
        </ul>
      </div>
      <ul
        className={`
          md:hidden flex flex-col gap-4 bg-blue-600 rounded-lg text-white overflow-hidden 
          ${isOpen ? "max-h-60 p-4" : "max-h-0 p-0"} transition-all duration-500 ease in out `}
      >
        <li className="hover:scale-105 hover:bg-blue-800 rounded-lg p-2 transition duration-300 hover:text-white cursor-pointer">
          Accueil
        </li>
        <li className="hover:scale-105 hover:bg-blue-800 rounded-lg p-2 transition duration-300 hover:text-white cursor-pointer">
          Service
        </li>
        <li className="hover:scale-105 hover:bg-blue-800 rounded-lg p-2 transition duration-300 hover:text-white cursor-pointer">
          Blog
        </li>
        <li className="hover:scale-105 hover:bg-blue-800 rounded-lg p-2 transition duration-300 hover:text-white cursor-pointer">
          Contact
        </li>
      </ul>
    </nav>
  );
}
