import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Stock() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [nomProduit, setNomProduit] = useState("");
  const [prixProduit, setPrixProduit] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [quantiteStock, setQuantiteStock] = useState("");
  const [quantite, setQuantite] = useState("");
  const [nom, setNom] = useState("");
  const [produitId, setProduitId] = useState("");
  const [openId, setOpenId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
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
  const [activeTable, setActiveTable] = useState("Catégories/Produits");
  //Animation du message
  const afficherMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };
  // Get Categories
  useEffect(() => {
    fetch("http://localhost:4000/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Donnée de categorie chargées avec succès!", data);
        setCategories(data);
      })
      .catch((err) => console.error("Erreur GET categories", err));
  }, []);

  //GetProduits
  useEffect(() => {
    fetch("http://localhost:4000/produits")
      .then((res) => res.json())
      .then((data) => {
        console.log("Données de produits chargées avec succès!", data);
        setProduits(data);
      })
      .catch((err) => console.error("Erreur get Produit", err));
  }, []);
  const handleSubmitCategorie = (e) => {
    e.preventDefault();
    if (!nom) {
      return afficherMessage("Nom de la catégorie obligatoire!", "echec");
    }
    fetch("http://localhost:4000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom }),
    })
      .then((res) => res.json())
      .then((newCategorie) => {
        setCategories((prevCategorie) => [...prevCategorie, newCategorie]);
        afficherMessage("Catégorie ajoutée avec succès!", "succes");
        setNom("");
      })
      .catch((err) => console.error("Erreur d'ajout de catégorie", err));
  };
  const handleSubmitProduit = (e) => {
    e.preventDefault();
    if (!nomProduit || !prixProduit || !quantiteStock || !categorieId) {
      return afficherMessage("Tous les champs doivent être remplir!", "echec");
    }
    fetch("http://localhost:4000/produits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomProduit,
        prixProduit,
        quantiteStock,
        categorieId,
      }),
    })
      .then((res) => res.json())
      .then((newProduit) => {
        setProduits((prevProduit) => [...prevProduit, newProduit]);
        afficherMessage("Produit ajouté avec succès!", "succes");
        setCategorieId("");
        setNomProduit("");
        setPrixProduit("");
        setQuantiteStock("");
      })
      .catch((err) => console.error("Erreur d'ajout de produit", err));
  };
  // Reapprovisionnement
  const handleReapprovisionnement = (e) => {
    e.preventDefault();
    if (!produitId || !quantite) {
      return afficherMessage("Tous les champs doivent être remplir!", "echec");
    }
    fetch("http://localhost:4000/reapprovisionnement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        produitId,
        quantite,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Reapprovision effectué", data);
        afficherMessage("Reapprovisionnement effectué avec succès!", "succes");
        setProduitId("");
        setQuantite("");
      })
      .catch((err) => console.error("Erreur de reapprovisionnement!", err));
  };
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
      <div className="flex justify-center w-full shadow-xl p-4 space-y-2 bg-gray-100 border-b">
        <h1 className="text-xl lg:text-2xl font-bold text-center">
          Gestion de Stocks
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-100 gap-2 mt-4">
        <button
          onClick={() => setActiveTable("Catégories/Produits")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Catégories/Produits" ? "bg-white text-blue-600" : ""}`}
        >
          Catégories/Produits
        </button>

        <button
          onClick={() => setActiveTable("Ajouter une catégoris")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Ajouter une catégoris" ? "bg-white text-blue-600" : ""}`}
        >
          Ajouter une catégorie
        </button>
        <button
          onClick={() => setActiveTable("Ajouter un produit")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Ajouter un produit" ? "bg-white text-blue-600" : ""}`}
        >
          Ajouter un produit
        </button>
        <button
          onClick={() => setActiveTable("Reaprovisionnement")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Reaprovisionnement" ? "bg-white text-blue-600" : ""}`}
        >
          Reaprovisionnement
        </button>
      </div>
      <div className="flex-1">
        {activeTable === "Catégories/Produits" && (
          <div className="text-center">
            <div className="mt-10">
              <h1 className="font-bold">Liste de stocks</h1>
            </div>
            {categories.map((categorie) => (
              <div
                key={categorie.id}
                className={`text-xs p-2 transition-all duration-500 ${openId === categorie.id ? "max-h-80 p-2" : "max-h-64 p-0 ease in out"}`}
              >
                <button
                  className="w-full bg-blue-500 text-white rounded-t-md font-bold p-4"
                  onClick={() =>
                    setOpenId(openId === categorie.id ? null : categorie.id)
                  }
                >
                  {categories.length === 0 ? (
                    <p className="font-bold">
                      "Aucune Catégorie disponible pour le moment"
                    </p>
                  ) : (
                    categorie.nom.toUpperCase()
                  )}
                </button>
                {openId === categorie.id && (
                  <div className="shadow-lg">
                    {produits.length === 0 ? (
                      <p className="font-bold">
                        "Aucun produit disponible pour le moment"
                      </p>
                    ) : (
                      <table className="w-full overflow-auto p-2">
                        <thead className="bg-gray-100 p-4">
                          <tr className="border border-b">
                            <th className="text-start p-3">ID</th>
                            <th className="text-start p-3">Produits</th>
                            <th className="text-start p-3">Prix Unitaire</th>
                            <th className="text-start p-3">
                              Quantité en stock
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {produits
                            .filter(
                              (produit) => produit.categorieId === categorie.id,
                            )
                            .map((produit) => (
                              <tr key={produit.id}>
                                <td className="text-start p-3">{produit.id}</td>
                                <td className="text-start p-3">
                                  {produit.nomProduit}
                                </td>
                                <td className="text-start p-3">
                                  {produit.prixProduit} CFA
                                </td>
                                <td className="text-start p-3">
                                  {produit.quantiteStock}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {activeTable === "Reaprovisionnement" && (
          <div className="flex justify-center items-center md:min-h-screen text-xs p-5">
            <fieldset className="w-full max-w-md rounded-lg border border-gray-400  p-8">
              <legend className="w-full border-2 border-gray-400 text-center p-2">
                <h1>Réapprovisionnement</h1>
              </legend>
              <form
                onSubmit={handleReapprovisionnement}
                className="flex-col w-full space-y-5"
              >
                <select
                  id="produitId"
                  name="produitId"
                  value={produitId}
                  onChange={(e) => setProduitId(e.target.value)}
                  className="border border-gray-300 w-full rounded-lg p-3 focus:outline-none focus:ring ring-blue-500"
                >
                  <option value="">--Selectionner un Produit--</option>
                  {produits.map((produit) => (
                    <option key={produit.id} value={produit.id}>
                      {produit.nomProduit}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={quantite}
                  placeholder="Quantité"
                  onChange={(e) => setQuantite(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring ring-blue-500"
                />
                <span
                  className="text-xs"
                  style={{
                    color:
                      message.type === "succes"
                        ? "green"
                        : message.type === "info"
                          ? "blue"
                          : "red",
                  }}
                >
                  {message.text}
                </span>
                <button
                  type="submit"
                  className="w-full rounded-md text-white bg-green-500 p-2"
                >
                  Reapprovisionnement
                </button>
              </form>
            </fieldset>
          </div>
        )}
        {activeTable === "Ajouter une catégoris" && (
          <div className="flex justify-center items-center md:min-h-screen p-5">
            <fieldset className="w-full max-w-md rounded-lg border border-gray-400  p-8">
              <legend className="w-full border-2 border-gray-400 text-center p-2">
                <h1>Ajout de Catégorie</h1>
              </legend>
              <form
                onSubmit={handleSubmitCategorie}
                className="flex-col text-xs w-full space-y-8"
              >
                <input
                  type="text"
                  value={nom}
                  placeholder="Nom de la Catégorie"
                  onChange={(e) => setNom(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring ring-blue-500"
                />
                <span
                  className="text-xs"
                  style={{
                    color:
                      message.type === "succes"
                        ? "green"
                        : message.type === "info"
                          ? "blue"
                          : "red",
                  }}
                >
                  {message.text}
                </span>
                <button
                  type="submit"
                  className="w-full rounded-md text-white border bg-green-500 p-2"
                >
                  Ajouter
                </button>
              </form>
            </fieldset>
          </div>
        )}
        {activeTable === "Ajouter un produit" && (
          <div className="flex justify-center items-center md:min-h-screen p-5">
            <fieldset className="w-full max-w-md rounded-lg border border-gray-400  p-8">
              <legend className="w-full border-2 border-gray-400 text-center p-2">
                <h1>Ajout de produit</h1>
              </legend>
              <form
                onSubmit={handleSubmitProduit}
                className="flex-col text-xs w-full space-y-2"
              >
                <select
                  className="border border-gray-300 rounded-lg w-full text-xs text-center p-2 focus:outline-none focus:ring ring-blue-500"
                  name="categorieId"
                  id="categorieId"
                  value={categorieId}
                  onChange={(e) => setCategorieId(e.target.value)}
                >
                  <option>--Selectionner une Catégorie--</option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.nom}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Nom du Produit"
                  value={nomProduit}
                  onChange={(e) => setNomProduit(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring ring-blue-500"
                />
                <input
                  type="number"
                  value={prixProduit}
                  onChange={(e) => setPrixProduit(e.target.value)}
                  placeholder="Prix Unitaire"
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring ring-blue-500"
                  step="0.01"
                  min="0.01"
                />
                <input
                  type="number"
                  value={quantiteStock}
                  onChange={(e) => setQuantiteStock(e.target.value)}
                  placeholder="Quantité à ajouter"
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring ring-blue-500"
                />
                <span
                  className="text-xs"
                  style={{
                    color:
                      message.type === "succes"
                        ? "green"
                        : message.type === "info"
                          ? "blue"
                          : "red",
                  }}
                >
                  {message.text}
                </span>
                <button
                  type="submit"
                  className="w-full rounded-md text-white border bg-green-500 p-2"
                >
                  Ajouter
                </button>
              </form>
            </fieldset>
          </div>
        )}
      </div>
    </div>
  );
}
