import React, { useState } from "react";
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="max-w-lg rounded-lg shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white p-6">
        <h1 className="text-2xl font-bold p-3 mb-5">Profil utilisateur</h1>
        <p className="p-3">Nom : Makassi</p>
        <p className="p-3">Email : makassit@gmail.com</p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-blue-500 rounded-lg p-3"
        >
          {darkMode ? "☀️Mode clair" : "🌙Mode sombre"}
        </button>
      </div>
    </div>
  );
}
