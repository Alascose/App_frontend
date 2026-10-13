import React from "react";
export default function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sibebar */}
      <aside className="w-64 bg-gray-900">
        <h1 className="text-3xl text-white font-bold p-4 mb-6">Dashboard</h1>
        <ul className="text-white space-y-4 p-4">
          <li className="hover:text-blue-500 hover:translate-x-4 transition duration-500 hover:bg-gray-800  p-2 rounded cursor-pointer">
            Accueil
          </li>
          <li className="hover:text-blue-500 hover:translate-x-4 transition duration-500 hover:bg-gray-800  p-2 rounded cursor-pointer">
            Produits
          </li>
          <li className="hover:text-blue-500 hover:translate-x-4 transition duration-500 hover:bg-gray-800  p-2 rounded cursor-pointer">
            Personaliser
          </li>
          <li className="hover:text-blue-500 hover:translate-x-4 transition duration-500 hover:bg-gray-800  p-2 rounded cursor-pointer">
            Commandes
          </li>
          <li className="hover:text-blue-500 hover:translate-x-4 transition duration-500 hover:bg-gray-800  p-2 rounded cursor-pointer">
            Paramètre
          </li>
          <li className="hover:text-blue-500 hover:translate-x-4 transition duration-500 hover:bg-gray-800  p-2 rounded cursor-pointer">
            Déconexion
          </li>
        </ul>
      </aside>
      {/* Contenu */}
      <main className="flex-1 p-4 bg-gray-200 overflow-auto">
        {" "}
        {/* flex-1 signifie prend tout espace restant*/}
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-600 rounded-lg text-white text-center text-lg hover:scale-105 transition duration-300 p-6">
            Produits: 120
          </div>
          <div className="bg-green-600 rounded-lg text-white text-center text-lg hover:scale-105 transition duration-300 p-6">
            Utilisateurs: 45
          </div>
          <div className="bg-red-600 rounded-lg text-white text-center text-lg hover:scale-105 transition duration-300 p-6">
            Ventes: 25
          </div>
          <div className="bg-yellow-600 rounded-lg text-white text-center text-lg hover:scale-105 transition duration-300 p-6">
            Graphiques:
          </div>
          <div className="bg-gray-600 rounded-lg text-white text-center text-lg hover:scale-105 transition duration-300 p-6">
            Statistiques:
          </div>
        </div>
      </main>
    </div>
  );
}
