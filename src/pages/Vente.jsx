import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
export default function Vente() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [ventes, setVentes] = useState([]);
  const [produits, setProduits] = useState([]);
  const [clientName, setClientName] = useState("");
  const [produitId, setProduitId] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prixProduit, setPrixProduit] = useState("");
  const montantTotal = prixProduit * quantite;
  const [clientTel, setClientTel] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clients, setClient] = useState([]);
  const [venteId, setVenteId] = useState(null);
  const [clientId, setClientId] = useState("");
  const [isOpenModalClient, setIsOpenModalClient] = useState(false);
  const [isOpenModalVente, setIsOpenModalVente] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const produitSelect = produits.find((produit) => produit.id === produitId);
  //Animation du message
  const afficherMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };
  // Fonction pour renitialiser les state
  const StateReset = () => {
    setVenteId(null);
    setClientId("");
    setProduitId("");
    setQuantite("");
    setPrixProduit("");
  };
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
        console.log("Donnée de vente chargée avec succès!", data);
      })
      .catch((err) => console.error("Erreur GET ventes", err));
  }, []);
  const handleVente = (e) => {
    e.preventDefault();
    if (!clientId || !produitId || !quantite || !prixProduit || !montantTotal) {
      afficherMessage("Tous les champs doivent être remplir!", "info");
      return;
    }
    if (produitSelect.quantiteStock < quantite) {
      afficherMessage(
        `Quantité insuffisante en stock. Produiit en stock ${produitSelect.quantiteStock}`,
        "echec",
      );
      return;
    }
    fetch("http://localhost:4000/ventes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        produitId,
        quantite,
        prixProduit,
        montantTotal,
      }),
    })
      .then((res) => res.json())
      .then((newVente) => {
        setVentes((prevVente) => [...prevVente, newVente]);
        afficherMessage("Vente enregistrée avec succès!", "succes");
        StateReset();
      })
      .catch((error) => console.error("Erreur POST vente", error));
  };
  // Preparer le modal pour la modif
  const handleEdit = (id) => {
    const ventesSelectionne = ventes.find((vente) => vente.id === id);
    if (!ventesSelectionne) {
      return;
    }
    setVenteId(ventesSelectionne.id); // On retient l'id de la venteSelectionner
    setClientId(ventesSelectionne.clientId);
    setProduitId(ventesSelectionne.produitId);
    setQuantite(ventesSelectionne.quantite);
    setPrixProduit(ventesSelectionne.prixProduit);
    setIsOpenModalVente(true);
  };
  // Modifier le vente
  const handleUpdateVente = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/ventes/${venteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        produitId,
        quantite,
        prixProduit,
        montantTotal,
      }),
    })
      .then((res) => res.json())
      .then((updateVente) => {
        setVentes((prevVente) =>
          prevVente.map((vente) =>
            vente.id === venteId ? updateVente : vente,
          ),
        );
        afficherMessage("Vente modifier avec succès!", "succes");
        StateReset();
      })
      .catch((err) => console.error("Erreur PUT vente", err));
  };
  //Supprimer une vente
  const deleteVente = (id) => {
    const selectVente = ventes.find((vente) => vente.id === id);
    if (!selectVente) return;
    setVenteId(selectVente.id);
    setOpenDelete(true);
  };
  const handleVenteDelete = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/ventes/${venteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setVentes((prevVente) =>
          prevVente.filter((vente) => vente.id !== venteId),
        );
        afficherMessage("Vente supprimée avec succès!", "succes");
      })
      .catch((err) => console.error("Erreur DELETE vente", err));
    afficherMessage("Echec de la suppression de vente", "echec");
  };
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
  useEffect(() => {
    fetch("http://localhost:4000/produits")
      .then((res) => res.json())
      .then((data) => {
        console.log("Données de produit chargées avec succès!");
        setProduits(data);
      })
      .catch((error) => console.error("Erreur GET produit", error));
  }, []);
  // Formulaire d'enregistrement du client
  const handleClienSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientTel) {
      return afficherMessage(
        "Nom et numéro telephone du client obligatoire.",
        "info",
      );
    }
    fetch("http://localhost:4000/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientName, clientTel, clientEmail }),
    })
      .then((res) => res.json())
      .then((newClient) => {
        setClient((prevClient) => [...prevClient, newClient]);
        afficherMessage("Client ajouté avec succès!", "succes");
        setClientName("");
        setClientTel("");
        setClientEmail("");
      })
      .catch((error) => console.error("Erreur POST client", error));
  };

  const [activeTable, setActiveTable] = useState("Vente");
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
        className={`fixed top-0 left-0 bg-gray-800 w-64 overflow-hidden h-screen transform transition-transform duration-500 p-4 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="">
          <button
            className="md:hidden text-white text-lg p-4"
            onClick={() => setOpen(!open)}
          >
            {open ? "X" : "☰"}
          </button>
        </div>
        <h1 className="text- font-bold text-white p-3 mb-6">Dashboard</h1>
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
          Gestion de Ventes
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-100 gap-2 mt-4">
        <button
          onClick={() => setActiveTable("Vente")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Vente" ? "bg-white text-blue-600" : ""}`}
        >
          Vente
        </button>
        <button
          onClick={() => setActiveTable("Factures")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Factures" ? "bg-white text-blue-600" : ""}`}
        >
          Factures
        </button>
      </div>
      <div className="flex-1">
        {activeTable === "Vente" && (
          <div className="p-3 space-y-2">
            <div className="flex justify-center items-center">
              <div
                className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-all duration-500 ${openDelete ? "opacity-100" : "opacity-0 pointer-events-none"} p-5`}
                //pointer events-none fait que lorsque le modal est fermé le rend invisible empêche les elements de bloquer les clicks sur tout ce qui est derrière
              >
                <div
                  className={`realtive w-full max-w-md rounded-lg bg-gray-100 transition-all duration-500 ${openDelete ? "opacity-100 scale-100" : "opacity-0 scale-95"} p-2`}
                >
                  <button
                    className="absolute right-3 top-1 text-xl"
                    onClick={() => setOpenDelete(false)}
                  >
                    X
                  </button>
                  <h1 className="text-center font-bold p-4">
                    Suppression de vente N° 000{venteId}
                  </h1>
                  <form
                    className="flex-col space-y-5"
                    onSubmit={handleVenteDelete}
                  >
                    <p className="p-5">
                      Voulez-vous réèllement supprimer la vente ?
                    </p>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setOpenDelete(false)}
                        className="text-xs p-2 bg-blue-500 text-white"
                      >
                        Annuler
                      </button>
                      <button className="text-xs p-2 bg-red-500 text-white">
                        Supprimer
                      </button>
                    </div>
                  </form>
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
                </div>
              </div>
              <div
                className={`bg-black/50 inset-0 fixed flex justify-center items-center transition duration-500 ${isOpenModalClient ? "opacity-100" : "opacity-0 pointer-events-none"} p-4`}
              >
                <div
                  className={`relative bg-white w-full max-w-md rounded-lg shadow-lg transition duration-500 ${isOpenModalClient ? "opacity-100 scale-100" : "opacity-0 scale-95"} text-xs p-8`}
                >
                  <div className="absolute right-6 top-4">
                    <button
                      className="text-xl"
                      onClick={() => setIsOpenModalClient(false)}
                    >
                      X
                    </button>
                  </div>
                  <div className="text-center font-bold text-lg p-2">
                    <h1>Nouveau Client</h1>
                  </div>
                  <form onSubmit={handleClienSubmit} className="space-y-2 p-2">
                    <input
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring ring-blue-500"
                      type="text"
                      value={clientName}
                      placeholder="Nom Client"
                      onChange={(e) => setClientName(e.target.value)}
                    />
                    <input
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring ring-blue-500"
                      type="tel"
                      value={clientTel}
                      placeholder="Numéro Telephone"
                      onChange={(e) => setClientTel(e.target.value)}
                    />
                    <input
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring ring-blue-500"
                      type="email"
                      value={clientEmail}
                      placeholder="Email"
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="w-full border border-gray-300 text-white rounded-lg p-2 bg-blue-400 hover:bg-blue-600 hover:text-white"
                    >
                      Ajouter
                    </button>
                  </form>
                  <span
                    className="text-xs p-2"
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
                </div>
              </div>

              <div
                className={`bg-black/50 inset-0 fixed flex justify-center items-center transition-all duration-500 ${isOpenModalVente ? "opacity-100" : "opacity-0 pointer-events-none"} p-4`}
              >
                <div
                  className={`relative bg-white w-full max-w-md rounded-lg shadow-lg transition-all duration-500 ${isOpenModalVente ? "opacity-100 scale-100" : "opacity-0 scale-95"} text-xs p-10`}
                >
                  <div className="absolute right-6 top-2">
                    <button
                      className="text-lg"
                      onClick={() => setIsOpenModalVente(false)}
                    >
                      X
                    </button>
                  </div>
                  <h1 className="text-center text-xl p-2 font-bold mb-2">
                    Ajout de ventes
                  </h1>
                  <form
                    onSubmit={venteId ? handleUpdateVente : handleVente}
                    className="flex-col w-full space-y-2"
                  >
                    <select
                      name="clientId"
                      id="clientId"
                      value={clientId}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring ring-blue-500 text-xs"
                      onChange={(e) => setClientId(Number(e.target.value))}
                    >
                      <option value="">--Selectionner un Client--</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.clientName}
                        </option>
                      ))}
                    </select>
                    <select
                      name="produitId"
                      id="produitId"
                      value={produitId}
                      // On remplie le prix automatiquement en fonction du produit selectionné
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        setProduitId(id);
                        const produitSelectionne = produits.find(
                          (produit) => produit.id === id,
                        );
                        if (produitSelectionne) {
                          setPrixProduit(produitSelectionne.prixProduit);
                        }
                      }}
                      className=" overflow-hidden border border-gray-300 text-xs w-full rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
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
                      onChange={(e) => setQuantite(Number(e.target.value))}
                      placeholder="Quantité achètée"
                      className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring ring-blue-500"
                    />
                    <input
                      type="number"
                      value={prixProduit}
                      placeholder="Prix Unitaire"
                      className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring ring-blue-500"
                      readOnly
                    />
                    <input
                      type="number"
                      value={montantTotal}
                      placeholder="Montant Total"
                      className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring ring-blue-500"
                      readOnly
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg p-2 bg-green-500 text-white hover:bg-green-600"
                    >
                      {venteId ? "Modifier" : "Enregistrer"}
                    </button>
                  </form>
                  <span
                    className="text-xs p-3 ps-0"
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
                </div>
              </div>
            </div>
            <div className="flex justify-between p-2">
              <button
                className="text-xs bg-green-500 text-white border rounded-lg  hover:bg-green-700 p-2"
                onClick={() => setIsOpenModalVente(true)}
              >
                + Nouvelle vente
              </button>
              <button
                className="text-xs bg-violet-500 text-white border rounded-lg  hover:bg-violet-700 p-2"
                onClick={() => setIsOpenModalClient(true)}
              >
                + Nouveau Client
              </button>
            </div>
            <div className="text-center">
              <h1 className="p-2">Liste de Ventes</h1>
            </div>
            <div className="max-h-screen overflow-x-auto p-2">
              <table className="min-w-full p-2">
                <thead className="bg-gray-100 text-sm p-4 text-blue-600">
                  <tr className="border border-b">
                    <th className="text-start p-3">Client</th>
                    <th className="text-start p-3">Produits</th>
                    <th className="text-start p-3">Quantité</th>
                    <th className="text-start p-3">Montant Total</th>
                    <th className="text-start p-3">Date</th>
                    <th className="text-start p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {ventes.map((vente) => (
                    <tr
                      key={vente.id}
                      value={vente.id}
                      className="border hover:bg-gray-200"
                    >
                      <td className="text-start border-t p-3">
                        {vente.client.clientName}
                      </td>
                      <td className="text-start border-t p-3">
                        {vente.produit.nomProduit}
                      </td>
                      <td className="text-start border-t p-3">
                        {vente.quantite}
                      </td>
                      <td className="text-start border-t p-3">
                        {vente.montantTotal} CFA
                      </td>
                      <td className="text-start border-t p-3">
                        {new Date(vente.createdAt).toLocaleString()}
                      </td>
                      <td className="text-start border-t p-3">
                        <button
                          className="p-2 bg-blue-500 text-xs border text-white hover:bg-blue-600"
                          onClick={() => handleEdit(vente.id)}
                        >
                          <BiEdit />
                        </button>
                        <button
                          className="p-2 bg-red-500 text-xs border text-white hover:bg-red-600"
                          onClick={() => deleteVente(vente.id)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTable === "Factures" && (
          <div className="flex-col justify-center items-center text-md p-5 max-h-screen space-y-2 overflow-y-auto">
            <h1 className="font-bold text-center my-5">Liste de Factures</h1>
            {ventes.map((vente) => (
              <div
                key={vente.id}
                value={vente.id}
                className="p-8 border border-gray-400 bg-gray-100 space-y-4"
              >
                <h2 className="text-center font-bold border-b border-gray-400 p-5">
                  Facture{" "}
                  <span className="text-blue-600">N° 000{vente.id}</span>
                </h2>
                <p>
                  <span className="font-bold text-blue-900">Nom Client :</span>{" "}
                  {vente.client.clientName}
                </p>
                <p>
                  <span className="font-bold text-blue-900">
                    Produit achèté :
                  </span>{" "}
                  {vente.produit.nomProduit}
                </p>
                <p>
                  <span className="font-bold text-blue-900">Quantité :</span>{" "}
                  {vente.quantite}
                </p>
                <p>
                  <span className="font-bold text-blue-900">
                    Montant Total :
                  </span>{" "}
                  {vente.montantTotal} CFA
                </p>
                <p>
                  <span className="font-bold text-blue-900">Date :</span>{" "}
                  {new Date(vente.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
