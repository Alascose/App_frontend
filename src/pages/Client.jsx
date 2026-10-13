import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export default function Client() {
  const [open, setOpen] = useState(false);
  const [clients, setClient] = useState([]);
  const [ventes, setVentes] = useState([]);
  const clientFidel = clients.filter((client) => {
    const nombreVente = ventes.filter(
      (vente) => vente.clientId === client.id,
    ).length;
    return nombreVente >= 5;
  });
  //Charger les clients
  useEffect(() => {
    fetch("http://localhost:4000/clients")
      .then((res) => res.json())
      .then((data) => {
        setClient(data);
        console.log("Données de clients chargées avec succès!", data);
      })
      .catch((err) => console.error("Erreur GET client", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/ventes")
      .then((res) => res.json())
      .then((data) => {
        setVentes(data);
        console.log("Données de ventes chargées avec succès");
      })
      .catch((error) => console.error("Erreur GET ventes", error));
  });

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
      label: "Paramètres",
      path: "/Parametre",
    },
  ];
  const [activeTable, setActiveTable] = useState("Liste de Clients");

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
          Gestion de Clients
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-100 gap-2 mt-4">
        <button
          onClick={() => setActiveTable("Liste de Clients")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Liste de Clients" ? "bg-white text-blue-600" : ""}`}
        >
          Liste de Clients
        </button>

        <button
          onClick={() => setActiveTable("Clients fidèles")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Clients fidèles" ? "bg-white text-blue-600" : ""}`}
        >
          Clients fidèles
        </button>
        <button
          onClick={() => setActiveTable("Historique de transactions")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Historique de transactions" ? "bg-white text-blue-600" : ""}`}
        >
          Historique de transactions
        </button>
      </div>
      <div className="flex-1 justify-center">
        {activeTable === "Liste de Clients" && (
          <div className="text-center mt-9">
            <h1>Liste de Clients</h1>
            <div className="flex justify-start items-start text-md mb-2 p-4 overflow-x-auto">
              <table className="w-full p-2">
                <thead className="bg-gray-100 text-blue-600 p-4">
                  <tr className="border border-b">
                    <th className="text-start p-3">Client</th>
                    <th className="text-start p-3">Telephone</th>
                    <th className="text-start p-3">Email</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {clients.map((client) => (
                    <tr
                      key={client.id}
                      value={client.id}
                      className="border hover:bg-gray-100"
                    >
                      <td className="text-start p-3">{client.clientName}</td>
                      <td className="text-start p-3">
                        {!client.clientTel ? "Nom renseigné" : client.clientTel}
                      </td>
                      <td className="text-start p-3">
                        {!client.clientEmail
                          ? "Non renseigner"
                          : client.clientEmail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTable === "Clients fidèles" && (
          <div className="text-center mt-5">
            <h1 className="font-bold">Liste de Clients fidèles</h1>
            <div>
              <table className="w-full p-2">
                <thead className="bg-gray-100 text-blue-600 p-4">
                  <tr className="border border-b">
                    <th className="text-start p-3">Client</th>
                    <th className="text-start p-3">Telephone</th>
                    <th className="text-start p-3">Email</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {clientFidel.map((client) => (
                    <tr
                      key={client.id}
                      value={client.id}
                      className="border hover:bg-gray-100"
                    >
                      <td className="text-start p-3">{client.clientName}</td>
                      <td className="text-start p-3">{client.clientTel}</td>
                      <td className="text-start p-3">{client.clientEmail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTable === "Historique de transactions" && (
          <div className="mt-5 p-3 min-h-screen">
            <h1 className="text-center mb-5">Liste de Transactions</h1>
            <div className="max-h-screen overflow-y-auto overflow-x-auto">
              <table className="w-full p-2">
                <thead className="bg-gray-100 p-4 text-blue-800">
                  <tr className="border border-b">
                    <th className="text-start p-3">Nom Client</th>
                    <th className="text-start p-3">Produit achèté</th>
                    <th className="text-start p-3">Quantité</th>
                    <th className="text-start p-3">Montant Total</th>
                    <th className="text-start p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {ventes.map((vente) => (
                    <tr
                      key={vente.id}
                      value={vente.id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="text-start p-3">
                        {vente.client.clientName}
                      </td>
                      <td className="text-start p-3">
                        {vente.produit.nomProduit}
                      </td>
                      <td className="text-start p-3">{vente.quantite}</td>
                      <td className="text-start p-3">
                        {vente.montantTotal} CFA
                      </td>
                      <td className="text-start p-3">
                        {new Date(vente.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
