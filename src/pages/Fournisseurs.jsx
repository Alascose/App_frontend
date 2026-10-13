import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export default function Fournisseur() {
  const [open, setOpen] = useState(false);
  const [dettes, setDette] = useState([]);
  const [fournisseurs, setFournisseur] = useState([]);
  const [nomFournisseur, setNomFournisseur] = useState("");
  const links = [
    {
      label: "Accueil",
      path: "/Dashboard",
    },
    {
      label: "Stocks",
      path: "/Stock",
    },
    {
      label: "Ventes",
      path: "/Vente",
    },
    {
      label: "Clients",
      path: "/Client",
    },
    {
      label: "Finances",
      path: "/Finance",
    },
    {
      label: "Fournisseurs",
      path: "/Fournisseur",
    },
    {
      label: "Paramàtres",
      path: "/Paramàtres",
    },
  ];
  const [activeTable, setActiveTable] = useState("Liste de Fournisseurs");
  //Charger les dettes
  useEffect(() => {
    fetch("http://localhost:4000/dettes")
      .then((res) => res.json())
      .then((data) => {
        setDette(data);
        console.log("Données de dette chargés avec succès!", data);
      })
      .catch((err) => console.error("Erreur de chargement de dettes", err));
  }, []);

  //Charger les fournisseurs
  useEffect(() => {
    fetch("http://localhost:4000/fournisseurs")
      .then((res) => res.json())
      .then((data) => {
        setFournisseur(data);
        console.log("Donnees de fournisseurs chargées avec succès", data);
      })
      .catch((err) => console.error("Erreur GET Fournisseurs"));
  }, []);
  return (
    <div className="flex-1 overflow-y-auto max-h-screen">
      <div className="flex justify-start ms-1">
        <button
          className="md:hidden text-black font-bold text-lg mt-3 p-4"
          onClick={() => setOpen(!open)}
        >
          {open ? "X" : "☰"}
        </button>
      </div>
      <aside
        className={`fixed top-0 left-0 bg-gray-800 w-64 overflow-hidden h-screen transform transition-transform duration-300 p-4 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="">
          <button
            className="md:hidden text-white text-lg p-4"
            onClick={() => setOpen(!open)}
          >
            {open ? "X" : "☰"}
          </button>
        </div>
        <h1 className="text-xl font-bold text-white p-3 mb-5">Dashboard</h1>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block rounded-lg p-3 text-white ${isActive ? "bg-blue-600 p-3" : "hover:bg-blue-600 p-3 hover:scale-105 transition duration-300"}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex justify-center w-full shadow-xl p-4 space-y-2 bg-gray-100">
        <h1 className="text-xl lg:text-2xl font-bold text-center">
          Gestion de Fournisseurs
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-100 gap-2 mt-4">
        <button
          onClick={() => setActiveTable("Liste de Fournisseurs")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Liste de Fournisseurs" ? "bg-white text-blue-600" : ""}`}
        >
          Liste de Fournisseurs
        </button>

        <button
          onClick={() => setActiveTable("Historique de transactions")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Historique de transactions" ? "bg-white text-blue-600" : ""}`}
        >
          Historique de transactions
        </button>
        <button
          onClick={() => setActiveTable("Notification")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Notification" ? "bg-white text-blue-600" : ""}`}
        >
          Notification
        </button>
      </div>
      <div className="flex-1 justify-center">
        {activeTable === "Liste de Fournisseurs" && (
          <div className="mt-5">
            <div className="text-center mt-10">
              <h1>Liste de Fournisseurs</h1>
            </div>
            <div className="p-3 overfow-x-auto overflow-y-auto">
              <table className="min-w-full overflow-x-auto">
                <thead className="text-blue-600 text-left">
                  <tr className="bg-gray-100 border">
                    <th className="p-3">Nom Fournisseur</th>
                    <th className="p-3">Numero Telephone</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Siège Social</th>
                  </tr>
                </thead>
                <tbody className="text-left text-xs border p-3">
                  {fournisseurs.map((fournisseur) => (
                    <tr
                      key={fournisseur.id}
                      value={fournisseur.id}
                      className="hover:bg-gray-100 p-3 border-b"
                    >
                      <td className="p-3 font-bold">
                        {fournisseur.nomFournisseur}
                      </td>
                      <td className="p-3">{fournisseur.contact}</td>
                      <td className="p-3">{fournisseur.email}</td>
                      <td className="p-3">{fournisseur.siege}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTable === "Clients fidèles" && (
          <div className="text-center mt-5">
            <h1 className="text-bold">Liste de Clients fidèles</h1>
          </div>
        )}
        {activeTable === "Historique de transactions" && (
          <div className="mt-10 text-center">
            <h1>Liste des Transactions</h1>
            <div className="p-3 overfow-x-auto overflow-y-auto">
              <table className="min-w-full overflow-x-auto">
                <thead className="text-blue-600 text-left">
                  <tr className="bg-gray-100 border">
                    <th className="p-3">Nom Fournisseur</th>
                    <th className="p-3">Produit</th>
                    <th className="p-3">Prix Unitaire</th>
                    <th className="p-3">Quantite</th>
                    <th className="p-3">Montant</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="text-left text-xs border p-3">
                  {dettes.map((dette) => (
                    <tr
                      key={dette.id}
                      value={dette.id}
                      className="hover:bg-gray-100 p-3 border-b"
                    >
                      <td className="p-3 font-bold">
                        {dette.fournisseur.nomFournisseur}
                      </td>
                      <td className="p-3">{dette.produit.nomProduit}</td>
                      <td className="p-3">{dette.prixUnitaire} FCFA</td>
                      <td className="p-3">{dette.quantite}</td>
                      <td className="p-3 text-red-500 font-bold">
                        {dette.montant} FCFA
                      </td>
                      <td className="p-3">
                        {new Date(dette.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTable === "Notification" && <div className="mt-2"></div>}
      </div>
    </div>
  );
}
