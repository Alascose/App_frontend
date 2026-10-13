import { Profiler, useState, useEffect } from "react";
import Card from "../components/Card";
import SearchField from "../components/SearchField";
import { GrNotification } from "react-icons/gr";
import { NavLink } from "react-router-dom";
export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [produits, setProduits] = useState([]);
  const [ventes, setVentes] = useState([]);
  const [clients, setClient] = useState([]);
  const [fournisseurs, setFournisseur] = useState([]);
  const alerteProduits = produits.filter(
    (produit) => produit.quantiteStock < 5,
  );
  const [messageLu, setMessageLu] = useState(false);
  const afficherNotification = alerteProduits.length;
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
    fetch("http://localhost:4000/produits")
      .then((res) => res.json())
      .then((data) => {
        console.log("Données de produit chargées avec succès!");
        setProduits(data);
      })
      .catch((error) => console.error("Erreur GET produit", error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:4000/ventes")
      .then((res) => res.json())
      .then((data) => {
        setVentes(data);
        console.log("Donnée de vente chargée avec succès!", data);
      })
      .catch((err) => console.error("Erreur GET ventes", err));
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
  const nombreProduit = produits.length;
  const nombreVente = ventes.length;
  const nombreClient = clients.length;
  const nombreFournisseur = fournisseurs.length;
  return (
    <div className="flex-1 overflow-y-auto max-h-screen bg-gray-100">
      <div className="flex justify-between">
        <button
          className="md:hidden text-black font-bold text-lg ps-4"
          onClick={() => setOpen(!open)}
        >
          {open ? "X" : "☰"}
        </button>
        <aside
          className={`fixed top-0 left-0 bg-gray-800 w-64 h-screen transform transition-transform duration-500 p-4 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="">
            <button
              className="md:hidden text-white text-lg ps-4"
              onClick={() => setOpen(!open)}
            >
              {open ? "X" : "☰"}
            </button>
          </div>
          <h1 className="text-xl font-bold text-white mt-5">Dashboard</h1>
          <ul className="space-y-4">
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
        <div className="hidden md:flex p-5">
          <h1 className="text-2xl font-bold text-gray-600 p-2 ms-2">
            Tableau de Bord
          </h1>
        </div>
        <SearchField />
        <div
          className={`mt-3 overflow-auto transition-all duration-500 ${openNotif ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {alerteProduits && (
            <div
              className={`fixed bg-gray-200 h-screen overflow-hidden space-y-2 top-0 w-64 right-0 transform transition-transform duration-500 pt-12 ${openNotif ? "translate-x-0" : "-translate-x-full"}`}
            >
              {alerteProduits.map((produit) => (
                <div      
                  className="text-xs text-center"
                  key={produit.id}
                  value={produit.id}
                >
                  <button
                    className={`${messageLu ? "bg-white" : ""}`}
                    onClick={() => setMessageLu(true)}
                  >
                    <p className="text-center p-2">
                      ⚠ Reapprovisionnement necessaire pour le produit{" "}
                      <span className="text-violet-600">
                        {produit.nomProduit}
                      </span>
                      <span className="p-2">
                        Quantité en stock :{" "}
                        <span className="text-red-500 font-bold p-2">
                          {produit.quantiteStock}
                        </span>
                      </span>
                    </p>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            className="p-5 mb-2 text-2xl relative"
            onClick={() => setOpenNotif(!openNotif)}
          >
            <GrNotification />
            {afficherNotification === 0 ? (
              ""
            ) : (
              <span className="absolute top-5 left-6 text-red-500 text-xs text-white bg-red-600 rounded-full px-1">
                {afficherNotification}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3 text-center">
        <Card title="Produits " value={nombreProduit} color="bg-white/50" />
        <Card title="Ventes " value={nombreVente} color="bg-white/50" />
        <Card title="Clients " value={nombreClient} color="bg-white/50" />
        <Card
          title="Fournisseurs"
          value={nombreFournisseur}
          color="bg-white/50"
        />
      </div>
      <div className="flex-col justify-center">
        <h1 className="font-bold text-lg py-5 text-center">
          Statistiques Complètes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
          <div className="p-4 rounded-full shadow-lg">
            <p className="p-3">Produit</p>
          </div>
          <div className="p-3 rounded-full shadow-lg">Ventes</div>
          <div className="p-3 rounded-full shadow-lg">Ventes</div>
          <div className="p-3 rounded-full shadow-lg">Ventes</div>
        </div>
      </div>
    </div>
  );
}
