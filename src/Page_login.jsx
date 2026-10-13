import React from "react";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md  hover:shadow-2xl transition duration-500">
        <h1 className="text-3xl text-blue-800 text-center font-bold mb-6 ">
          Connexion
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter votre email"
            className="border p-3 rounded-lg focus:outline-none  focus:ring-2 focus:ring-blue-500" // ring etant les contours de input
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white p-3 rounded-xl hover:scale-105 transition duration-500 hover:bg-blue-700">
            Se Connecter
          </button>
          <div className="text-md text-center text-blue-600 hover:underline cursor-pointer">
            <p>Mot de passe oublié ?</p>
          </div>
        </form>
      </div>
    </div>
  );
}
