import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
export default function Finance() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteCreance, setOpenDeleteCreance] = useState(false);
  const [openDeleteDette, setOpenDeleteDette] = useState(false);
  const [detteRembours, setDetteRembours] = useState(false);
  const [open, setOpen] = useState(false);
  const [produitId, setProduitId] = useState("");
  const [clientId, setClientId] = useState("");
  const [profession, setProfession] = useState("");
  const [clients, setClient] = useState([]);
  const [produits, setProduits] = useState([]);
  const [creances, setCreance] = useState([]);
  const [dettes, setDette] = useState([]);
  const [detteId, setDetteId] = useState("");
  const [fournisseurs, setFournisseur] = useState([]);
  const [nomFournisseur, setNomFournisseur] = useState("");
  const [fournisseurId, setFournisseurId] = useState("");
  const [prixUnitaire, setPrixUnitaire] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [siege, setSiege] = useState("");
  const [prixProduit, setPrixProduit] = useState("");
  const [quantite, setQuantite] = useState("");
  const [montant, setMontant] = useState(0);
  const [montantDette, setMontantDette] = useState("");
  const [montantTotal, setMontantTotal] = useState(0);
  const [montantInitial, setMontantInitial] = useState("");
  const [montantVerse, setMontantVerse] = useState("");
  const [creanceSoldes, setCreanceSolde] = useState([]);
  const montantRestant = montantTotal - montantVerse;
  const [message, setMessage] = useState({ text: "", type: "" });
  const [creanceId, setCreanceId] = useState("");
  const [dateSolde, setDateSolde] = useState("");
  const [montantRembourse, setMontantRembourse] = useState("");
  const [dateRembourse, setDateRembourse] = useState("");
  const [detteRembourses, setDetteRembourse] = useState([]);
  const montantReste = montantDette - montantRembourse;
  const produitSelect = produits.find((produit) => produit.id === produitId);
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
  const [activeTable, setActiveTable] = useState("Créance");
  //Animation de messagge
  const afficherMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => {
      afficherMessage((text = ""), (type = ""));
    }, 3000);
  };

  //Calcul des des montant total
  useEffect(() => {
    setMontantTotal(prixProduit * quantite);
  }, [prixProduit, quantite]);
  //Calcul de montant de dette
  useEffect(() => {
    setMontant(prixUnitaire * quantite);
  }, [prixUnitaire, quantite]);
  //Charger les creance
  useEffect(() => {
    fetch("http://localhost:4000/creances")
      .then((res) => res.json())
      .then((data) => {
        setCreance(data);
        console.log("Donnée de creance chargée avec succès!");
      })
      .catch((err) => console.error("Erreur de recuperation de creance", err));
  }, []);

  // Charger les fournisseurs
  useEffect(() => {
    fetch("http://localhost:4000/fournisseurs")
      .then((res) => res.json())
      .then((data) => {
        setFournisseur(data);
        console.log("Données de fournisseurs charger avec succès", data);
      })
      .catch((err) =>
        console.error("Echec de chargement de données fournisseur", err),
      );
  }, []);

  // Fonction reset form creance
  const resetCreanceForm = () => {
    setClientId("");
    setProduitId("");
    setProfession("");
    setQuantite("");
    setDateSolde("");
    setMontantVerse("");
  };
  // Fonction pour creance solde
  const handleSubmitCreanceSolde = async (e) => {
    e.preventDefault();
    if (!creanceId || !montantVerse) {
      return afficherMessage("Tous les champs doivent être remplir", "echec");
    }
    try {
      const reponse = await fetch("http://localhost:4000/creanceSoldes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ creanceId, montantVerse }),
      });
      const data = await reponse.json();
      if (!reponse.ok) {
        throw new Error(data.message);
      }
      afficherMessage("Payement effectué avec succès!", "succes");
      setCreanceId("");
      setMontantVerse("");
    } catch (error) {
      console.error("Erreur", error);
      afficherMessage(error.message, "echec");
    }
  };
  //Fonction pour rembourser une dette
  const handleDetteRembourseSubmit = async (e) => {
    e.preventDefault();
    if (!detteId || !montantRembourse) {
      return afficherMessage("Tous les champs doivent être remplir!");
    }
    try {
      const reponse = await fetch("http://localhost:4000/detteRembourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ detteId, montantRembourse }),
      });
      const data = await reponse.json();
      if (!reponse.ok) {
        throw new Error(data.message);
      }
      afficherMessage("Remboursement effectué avec succès", "succes");
      setDetteId(null);
      setProduitId("");
      setFournisseurId("");
      setQuantite("");
      setMontant("");
    } catch (error) {
      console.error("Erreur", error);
      afficherMessage(error.message, "echec");
    }
  };
  // Modidier une creance
  const editeCreance = (id) => {
    const creanceSelectionner = creances.find((creance) => creance.id === id);
    if (!creanceSelectionner) return;
    setCreanceId(creanceSelectionner.id);
    setClientId(creanceSelectionner.clientId);
    setProduitId(creanceSelectionner.produitId);
    setPrixProduit(creanceSelectionner.prixProduit);
    setQuantite(creanceSelectionner.quantite);
    setProfession(creanceSelectionner.profession);
    setDateSolde(creanceSelectionner.dateSolde);
    setIsOpenModal(true);
  };
  // Supprimer les creances
  const deleteCreance = (id) => {
    const selectCreance = creances.find((creance) => creance.id === id);
    if (!selectCreance) return;
    setCreanceId(selectCreance.id);
    setOpenDeleteCreance(true);
  };
  const handleDeleteCreance = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/creances/${creanceId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setCreance((prevCreance) =>
          prevCreance.filter((creance) => creance.id !== creanceId),
        );
        afficherMessage("Creance supprimer avec succès!", "succes");
      })
      .catch((err) => console.error("Erreur DELETE creance", err));
    afficherMessage("Echec de suppression de creance", "echec");
  };
  const handleEditeCreance = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/creances/${creanceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        produitId,
        prixProduit,
        quantite,
        profession,
        montantTotal,
        dateSolde,
      }),
    })
      .then((res) => res.json())
      .then((updateCreance) => {
        setCreance((prevCreance) =>
          prevCreance.map((creance) =>
            creance.id === Number(creanceId) ? updateCreance : creance,
          ),
        );
        afficherMessage("Creance modifier avec succès!", "succes");
        resetCreanceForm();
      })
      .catch((err) => console.error("Erreur editeCreance", err));
  };
  //Charger les dettes
  useEffect(() => {
    fetch("http://localhost:4000/dettes")
      .then((res) => res.json())
      .then((data) => {
        setDette(data);
        console.log("Données de dette chargés avec succès!");
      })
      .catch((err) =>
        console.error("Donnée de dette chargées avec succàs!", err),
      );
  }, []);

  //Charger les dettes remboursée
  useEffect(() => {
    fetch("http://localhost:4000/detteRembourses")
      .then((res) => res.json())
      .then((data) => {
        setDetteRembourse(data);
        console.log("Donnée de dette remboursé chargées avec succès!", data);
      })
      .catch((error) => console.error("Erreur GET detteRembourses", error));
  }, []);
  // Charger les creances soldes
  useEffect(() => {
    fetch("http://localhost:4000/creanceSoldes")
      .then((res) => res.json())
      .then((data) => {
        setCreanceSolde(data);
        console.log("Données de creances soldées avec succès!");
      })
      .catch((err) =>
        console.error("Erreur de chargement de creance solde", err),
      );
  }, []);
  // Modifier une dette
  const editeDette = (id) => {
    const detteSelectionner = dettes.find((dette) => dette.id === id);
    if (!detteSelectionner) return;
    setDetteId(detteSelectionner.id);
    setFournisseurId(detteSelectionner.fournisseurId);
    setProduitId(detteSelectionner.produitId);
    setQuantite(detteSelectionner.quantite);
    setPrixUnitaire(detteSelectionner.prixUnitaire);
    setDateRembourse(detteSelectionner.dateRembourse);
    setIsOpenModal(true);
  };
  const handleEditeDette = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/dettes/${detteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fournisseurId,
        produitId,
        quantite,
        prixUnitaire,
        montant,
        dateRembourse,
      }),
    })
      .then((res) => res.json())
      .then((updateDette) => {
        setDette((prevDette) =>
          prevDette.map((dette) =>
            dette.id === Number(detteId) ? updateDette : dette,
          ),
        );
        afficherMessage("Dette modifiée avec succès", "succes");
        setFournisseurId(null);
        setProduitId(null);
        setQuantite(null);
        setPrixUnitaire("");
        setDateRembourse("");
      });
  };

  // Supprimer une dette
  const deleteDette = (id) => {
    const detteSelect = dettes.find((dette) => dette.id === id);
    if (!detteSelect) return;
    setDetteId(detteSelect.id);
    setOpenDeleteDette(true);
  };
  const handleDetteDelete = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/dettes/${detteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setDette((prevDette) =>
          prevDette.filter((dette) => dette.id !== detteId),
        );
        afficherMessage("Dette supprimer avec succès!", "succes");
      })
      .catch((err) => console.error("Erreur delete Dette", err));
    afficherMessage("Erreur de suppression de la dette", "echec");
  };

  //Formulaire de fournisseur
  const handleFournisseur = (e) => {
    e.preventDefault();
    if (!nomFournisseur || !contact || !email) {
      return afficherMessage("Tous les champs doivent être remplir", "echec");
    }
    fetch("http://localhost:4000/fournisseurs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nomFournisseur, contact, email, siege }),
    })
      .then((res) => res.json())
      .then((newFournisseur) => {
        setFournisseur((prev) => [...prev, newFournisseur]);
        afficherMessage("Fournisseur ajouté avec succès!", "succes");
        setNomFournisseur("");
        setContact("");
        setEmail("");
        setSiege("");
      })
      .catch((error) => console.error("Erreur d'ajout de fournisseur", error));
  };

  //Formulaire de dette
  const handleDette = (e) => {
    e.preventDefault();
    if (
      !fournisseurId ||
      !produitId ||
      !quantite ||
      !prixUnitaire ||
      !montant ||
      !dateRembourse
    ) {
      return afficherMessage("Tous les champs doivent être remplir", "echec");
    }
    fetch("http://localhost:4000/dettes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fournisseurId,
        produitId,
        quantite,
        prixUnitaire,
        montant,
        dateRembourse,
      }),
    })
      .then((res) => res.json())
      .then((newDette) => {
        setDette((prevDette) => [...prevDette, newDette]);
        afficherMessage("Dette generée avec succès", "succes");
        setFournisseurId("");
        setProduitId("");
        setQuantite("");
        setPrixUnitaire("");
        setDateRembourse("");
      })
      .catch((err) => console.error("Erreur POST dette", err));
  };
  //Charger les clients
  useEffect(() => {
    fetch("http://localhost:4000/clients")
      .then((res) => res.json())
      .then((data) => {
        setClient(data);
        console.log("Données de clients chargées avec succès!");
      })
      .catch((err) => console.error("Erreur GET client", err));
  }, []);

  //Charger les produits
  useEffect(() => {
    fetch("http://localhost:4000/produits")
      .then((res) => res.json())
      .then((data) => {
        setProduits(data);
        console.log("Données de produits chargées avec succès!");
      })
      .catch((err) => console.error("Erreur get Produit", err));
  }, []);

  // Fonction handleSubmitCreance
  const handleCreance = (e) => {
    e.preventDefault();
    if (
      !clientId ||
      !produitId ||
      !prixProduit ||
      !quantite ||
      !profession ||
      !montantTotal ||
      !dateSolde
    ) {
      return afficherMessage("Tous les champs doivent être remplir!", "echec");
    }
    if (produitSelect.quantiteStock < quantite) {
      return afficherMessage(
        `Quantié insuffisante en stock. Produit en stock: ${produitSelect.quantiteStock}`,
        `echec`,
      );
    }
    fetch("http://localhost:4000/creances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        produitId,
        prixProduit,
        quantite,
        profession,
        montantTotal,
        montantVerse,
        montantRestant,
        dateSolde,
      }),
    })
      .then((res) => res.json())
      .then((newCreance) => {
        setCreance((prevCreance) => [...prevCreance, newCreance]);
        afficherMessage("Créance generer avec succès!", "succes");
        resetCreanceForm();
      })
      .catch((error) => console.error("Erreur POST creance", error));
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
        <h1 className="text-2xl font-bold text-white p-3 mb-5">Dashboard</h1>
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
          Gestion de Finances
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 bg-gray-100 gap-2 mt-4">
        <button
          onClick={() => setActiveTable("Créance")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Créance" ? "bg-white text-blue-600" : ""}`}
        >
          Créance
        </button>

        <button
          onClick={() => setActiveTable("Dette")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Dette" ? "bg-white text-blue-600" : ""}`}
        >
          Dette
        </button>
        <button
          onClick={() => setActiveTable("Créance soldée")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Créance soldée" ? "bg-white text-blue-600" : ""}`}
        >
          Créance Soldée
        </button>
        <button
          onClick={() => setActiveTable("Dette remboursée")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Dette remboursée" ? "bg-white text-blue-600" : ""}`}
        >
          Dette remboursée
        </button>
        <button
          onClick={() => setActiveTable("Factures")}
          className={`text-sm rounded-t-md font-bold p-3 ${activeTable === "Factures" ? "bg-white text-blue-600" : ""}`}
        >
          Factures
        </button>
        <button
          onClick={() => setActiveTable("Historique de Payement")}
          className={`text-sm rounded-t-md font-medium p-3 ${activeTable === "Historique de Payement" ? "bg-white text-blue-600" : ""}`}
        >
          Historique de Payement
        </button>
      </div>
      <div className="flex-1 justify-center">
        {activeTable === "Créance" && (
          <div className="mt-4">
            <div className="p-3 text-xs">
              <button
                onClick={() => setIsOpenModal(true)}
                className="rounded-lg bg-green-500 p-2 text-white text-xs"
              >
                + Nouvelle Creance
              </button>
            </div>
            <div
              className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-all duration-500 ${openDeleteCreance ? "opacity-100" : "opacity-0 pointer-events-none"} p-5`}
              //pointer events-none fait que lorsque le modal est fermé le rend invisible empêche les elements de bloquer les clicks sur tout ce qui est derrière
            >
              <div
                className={`relative w-full max-w-md rounded-lg bg-gray-200 transition-all duration-500 ${openDeleteCreance ? "opacity-100 scale-100" : "opacity-0 scale-95"} p-2`}
              >
                <button
                  className="absolute right-3 top-1 text-xl"
                  onClick={() => setOpenDeleteCreance(false)}
                >
                  X
                </button>
                <h1 className="text-center font-bold p-4">
                  Suppression de Creance N° 00CR0{creanceId}
                </h1>
                <form
                  className="flex-col space-y-5"
                  onSubmit={handleDeleteCreance}
                >
                  <p className="p-5">
                    Voulez-vous réèllement supprimer la creance ?
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setOpenDeleteCreance(false)}
                      className="text-xs p-1 bg-blue-600 text-white"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="text-xs p-1 bg-red-500 text-white"
                    >
                      Modifier
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

            <div className="text-center">
              <h1>Liste de Créances</h1>
            </div>
            <div className="flex justify-center items-center mb-2 p-3">
              <div
                className={`bg-black/50 fixed inset-0 flex justify-center items-center transition-all duration-500 ${isOpenModal ? "opacity-100" : "opacity-0 pointer-events-none"}  p-4`}
              >
                <div
                  className={`w-full max-w-md relative rounded-lg shadow-lg bg-gray-100 transition-all duration-500 ${isOpenModal ? "opacity-100 scale-100" : "opacity-0 scale-95"} p-3`}
                >
                  <button
                    onClick={() => setIsOpenModal(false)}
                    className="absolute right-6 top-2 text-xl"
                  >
                    X
                  </button>
                  <form
                    onSubmit={creanceId ? handleEditeCreance : handleCreance}
                    className="flex flex-col p-2 text-xs space-y-1"
                  >
                    <h1 className="font-bold text-lg p-2 text-blue-900">
                      {creanceId
                        ? "Modification de la Creance"
                        : "Enregistrer une Creance"}
                    </h1>
                    <select
                      name="clientId"
                      id="clientId"
                      value={clientId}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
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
                      className="border border-gray-300 w-full rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        setProduitId(id);
                        const produitSelect = produits.find(
                          (produit) => produit.id === id,
                        );
                        if (produitSelect) {
                          setPrixProduit(produitSelect.prixProduit);
                        }
                      }}
                    >
                      <option value="">--Selectionner un Produit--</option>
                      {produits.map((produit) => (
                        <option key={produit.id} value={produit.id}>
                          {produit.nomProduit}
                        </option>
                      ))}
                    </select>
                    <label className="ps-1 font-medium" htmlFor="profession">
                      Profession
                    </label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={profession}
                      placeholder="Profession"
                      className={`w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-600}`}
                      onChange={(e) => setProfession(e.target.value)}
                    />
                    <label className="ps-1 font-medium" htmlFor="quantite">
                      Quantité
                    </label>
                    <input
                      type="number"
                      value={quantite}
                      id="quantite"
                      name="quantite"
                      placeholder="Quantite"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      onChange={(e) => setQuantite(Number(e.target.value))}
                    />
                    <label className="ps-1 font-medium" htmlFor="prixProduit">
                      Prix Unitaire
                    </label>
                    <input
                      type="number"
                      id="prixProduit"
                      name="prixProduit"
                      value={prixProduit}
                      placeholder="Prix Unitaire"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      readOnly
                    />
                    <label className="ps-1 font-medium" htmlFor="dateSolde">
                      Date prévu de payement
                    </label>
                    <input
                      type="date"
                      id="dateSolde"
                      name="dateSolde"
                      value={dateSolde}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      onChange={(e) => setDateSolde(e.target.value)}
                    />
                    <label className="ps-1 font-medium" htmlFor="montantTotal">
                      Montant Total
                    </label>
                    <input
                      type="number"
                      id="montantTotal"
                      name="montantTotal"
                      value={montantTotal}
                      placeholder="Montant Total"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      readOnly
                    />
                    <input
                      type="number"
                      value={montantRestant}
                      className="hidden w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      readOnly
                    />
                    <button
                      type="submit"
                      className="p-2 bg-blue-500 rounded-lg text-white"
                    >
                      {creanceId ? "Modifier" : "Enregistrer"}
                    </button>
                  </form>
                  <span
                    className="text-xs p-2"
                    style={{
                      color:
                        message.type === "info"
                          ? "blue"
                          : message.type === "succes"
                            ? "green"
                            : "red",
                    }}
                  >
                    {message.text}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 overfow-x-auto overflow-y-auto">
              <table className="min-w-full overflow-x-auto">
                <thead className="text-blue-600 text-left">
                  <tr className="bg-gray-100 border text-md">
                    <th className="p-3">ID</th>
                    <th className="p-3">Creancier</th>
                    <th className="p-3">Produit</th>
                    <th className="p-3">Quantité</th>
                    <th className="p-3">Montant</th>
                    <th className="p-3">Restant</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-left text-xs border p-3">
                  {creances.map((creance) => (
                    <tr
                      key={creance.id}
                      value={creance.id}
                      className="hover:bg-gray-100 p-3 border-b"
                    >
                      <td className="p-3">{creance.id}</td>
                      <td className="p-3 font-bold">
                        {creance.client.clientName}
                      </td>
                      <td className="p-3">{creance.produit.nomProduit}</td>
                      <td className="p-3">{creance.quantite}</td>
                      <td className="p-3 font-medium">
                        {creance.montantTotal} CFA
                      </td>
                      <td className="p-3 font-medium text-green-500">
                        {creance.montantRestant} CFA
                      </td>
                      <td className="p-3">
                        {new Date(creance.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <p
                          className={`p-1 border rounded-lg bg-gray-100 shadow-md text-center font-bold ${creance.statusCreance === "Soldé" ? "text-green-500" : creance.statusCreance === "En cour" ? "text-red-500" : "text-violet-500"}`}
                        >
                          {creance.statusCreance}
                        </p>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => editeCreance(creance.id)}
                          className="p-2 text-xs border bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <BiEdit />
                        </button>
                        <button
                          onClick={() => deleteCreance(creance.id)}
                          className="p-2 text-xs border bg-red-500 hover:bg-red-600 text-gray-100"
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
          <div className="p-5 mt-2 space-y-4 max-h-screen">
            <h1 className="font-bold text-center">Liste de Factures</h1>
            {creances.map((creance) => (
              <div
                key={creance.id}
                value={creance.id}
                className="border bg-gray-100 border-gray-400 p-5 space-y-3"
              >
                <h1 className="text-center border-b border-gray-500 p-5 ms-3">
                  <span className="font-bold text-blue-900">
                    Facture Créance{" "}
                    <span className="text-gray-600">N° 00CR0{creance.id}</span>
                  </span>
                </h1>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Nom Créancier :
                  </span>{" "}
                  {creance.client.clientName}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Proféssion :
                  </span>
                  {creance.profession}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">Produit :</span>
                  {creance.produit.nomProduit}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Prix Unitaire :
                  </span>
                  {creance.produit.prixProduit} CFA
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Quantité :
                  </span>
                  {creance.quantite}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Montant Créance :
                  </span>
                  {creance.montantTotal} CFA
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">Date :</span>
                  {new Date(creance.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Date Prevue :
                  </span>
                  {new Date(creance.dateSolde).toLocaleString()}
                </p>
              </div>
            ))}
            {dettes.map((dette) => (
              <div
                key={dette.id}
                value={dette.id}
                className="border border-gray-400 bg-gray-100 p-5 space-y-3"
              >
                <h1 className="text-center border-b border-gray-500 p-5 ms-3">
                  <span className="font-bold text-blue-900">
                    Facture Dette{" "}
                    <span className="text-gray-600">N° 00DE0{dette.id}</span>
                  </span>
                </h1>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Nom Fournisseur :
                  </span>{" "}
                  {dette.fournisseur.nomFournisseur}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">Produit :</span>
                  {dette.produit.nomProduit}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Quantité :
                  </span>
                  {dette.quantite}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Prix Unitaire :
                  </span>
                  {dette.prixUnitaire}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Montant Dette :
                  </span>
                  {dette.montant} FCFA
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">Date:</span>
                  {new Date(dette.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-bold text-blue-900 p-3">
                    Date Prevue :
                  </span>
                  {new Date(dette.dateRembourse).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
        {activeTable === "Créance soldée" && (
          <div className="mt-2">
            <div className="p-4 text-xs">
              <button
                onClick={() => setIsOpenModal(true)}
                className="p-2 bg-green-500 hover:bg-green-700 text-white rounded-lg"
              >
                Solder une Creance
              </button>
            </div>
            <div className="text-center mt-2">
              <h1>Liste de Créance soldée</h1>
            </div>
            <div className="p-3">
              <table className="min-w-full overflow-x-auto">
                <thead className="text-blue-600 text-left">
                  <tr className="bg-gray-100 border text-md">
                    <th className="p-3">Creancier</th>
                    <th className="p-3">Produit</th>
                    <th className="p-3">Quantité</th>
                    <th className="p-3">Montant</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-left text-xs border p-3">
                  {creances
                    .filter(
                      (creanceStatus) =>
                        creanceStatus.statusCreance === "Soldé",
                    )
                    .map((creance) => (
                      <tr key={creance.id} value={creance.id}>
                        <td className="p-3 font-bold">
                          {creance.client.clientName}
                        </td>
                        <td className="p-3">{creance.produit.nomProduit}</td>
                        <td className="p-3">{creance.quantite}</td>
                        <td className="p-3 font-medium">
                          {creance.montantTotal} CFA
                        </td>
                        <td className="p-3">
                          {new Date(creance.createdAt).toLocaleString()}
                        </td>
                        <td className="p-3">
                          <p
                            className={`p-1 border rounded-lg bg-gray-100 shadow-md text-center font-bold ${creance.statusCreance === "Soldé" ? "text-green-500" : creance.statusCreance === "En cour" ? "text-red-500" : "text-violet-500"}`}
                          >
                            {creance.statusCreance}
                          </p>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex">
              <div
                className={`bg-black/50 fixed inset-0 flex justify-center items-center transition-all duration-500 ${isOpenModal ? "opacity-100" : "opacity-0 pointer-events-none"}  p-4`}
              >
                <div
                  className={`w-full max-w-md relative rounded-lg shadow-lg bg-gray-100 transition-all duration-500 ${isOpenModal ? "opacity-100 scale-100" : "opacity-0 scale-95"} p-3`}
                >
                  <button
                    onClick={() => setIsOpenModal(false)}
                    className="absolute right-6 top-2 text-xl"
                  >
                    X
                  </button>
                  <form
                    onSubmit={handleSubmitCreanceSolde}
                    className="flex flex-col p-2 space-y-1 text-xs"
                  >
                    <h1 className="font-bold text-lg p-2 text-blue-900">
                      Solder Créance
                    </h1>
                    <select
                      className="border border-gray-300 w-full rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      name="creanceId"
                      id="creanceId"
                      value={creanceId}
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        const creanceSelect = creances.find(
                          (creance) => creance.id === id,
                        );
                        setCreanceId(id);
                        if (creanceSelect) {
                          setClientId(creanceSelect.client.clientName);
                          setProduitId(creanceSelect.produit.nomProduit);
                          setQuantite(creanceSelect.quantite);
                          setMontantInitial(creanceSelect.montantTotal);
                        }
                      }}
                    >
                      <option value="">Selectionner une creance</option>
                      {creances.map((creance) => (
                        <option key={creance.id} value={creance.id}>
                          {creance.id}
                        </option>
                      ))}
                    </select>
                    <label className="font-medium ps-1" htmlFor="clientId">
                      Client
                    </label>
                    <input
                      className="border border-gray-300 w-full rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      type="text"
                      id="clientId"
                      name="clientId"
                      value={clientId}
                      readOnly
                    />
                    <label className="font-medium ps-1" htmlFor="produitId">
                      Produit
                    </label>
                    <input
                      className="border border-gray-300 w-full rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      type="text"
                      id="produitId"
                      name="produitId"
                      value={produitId}
                      readOnly
                    />
                    <label className="ps-1 font-medium" htmlFor="quantite">
                      Quantité
                    </label>
                    <input
                      type="number"
                      value={quantite}
                      id="quantite"
                      name="quantite"
                      placeholder="Quantite"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      readOnly
                    />
                    <label className="ps-1 font-medium" htmlFor="montantTotal">
                      Montant Total
                    </label>
                    <input
                      type="number"
                      id="montantTotal"
                      name="montantTotal"
                      value={montantInitial}
                      placeholder="Montant Total"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      readOnly
                    />
                    <label className="ps-1 font-medium" htmlFor="montantSolde">
                      Montant Soldé
                    </label>
                    <input
                      type="number"
                      id="montantSolde"
                      name="montantSolde"
                      value={montantVerse}
                      onChange={(e) => setMontantVerse(Number(e.target.value))}
                      placeholder="Entrer un montant"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                    />
                    <label
                      htmlFor="montantRestant"
                      className="hidden font-medium"
                    >
                      Montant Restant
                    </label>
                    <input
                      type="number"
                      id="montantRestant"
                      name="montantRestant"
                      value={montantRestant}
                      className="hidden w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring ring-blue-500"
                      readOnly
                    />
                    <button
                      type="submit"
                      className="p-2 bg-blue-500 rounded-lg text-white"
                    >
                      Enregistrer
                    </button>
                  </form>
                  <span
                    className="text-xs p-2"
                    style={{
                      color:
                        message.type === "info"
                          ? "blue"
                          : message.type === "succes"
                            ? "green"
                            : "red",
                    }}
                  >
                    {message.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTable === "Dette remboursée" && (
          <div className="mt-5">
            <div className="text-center">
              <h1>Liste de Dette rembourssée</h1>
            </div>
            <div className="p-3">
              <table className="min-w-full overflow-x-auto">
                <thead className="text-blue-600 text-left">
                  <tr className="bg-gray-100 border text-md">
                    <th className="p-3">Fournisseur</th>
                    <th className="p-3">Produit</th>
                    <th className="p-3">Quantité</th>
                    <th className="p-3">Montant Total</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-left text-xs border p-3">
                  {dettes
                    .filter(
                      (detteStatus) => detteStatus.statusDette === "Remboursée",
                    )
                    .map((dette) => (
                      <tr key={dette.id} value={dette.id} className="">
                        <td className="p-3 font-bold">
                          {dette.fournisseur.nomFournisseur}
                        </td>
                        <td className="p-3">{dette.produit.nomProduit}</td>
                        <td className="p-3">{dette.quantite}</td>
                        <td className="p-3">{dette.montant}</td>
                        <td className="p-3">
                          {new Date(dette.createdAt).toLocaleString()}
                        </td>
                        <td className="p-3 text-center">
                          <p className="p-1 border rounded-lg font-medium text-green-600 shadow-md">
                            {dette.statusDette}
                          </p>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="p-2 text-xs">
              <button
                className="rounded-lg bg-green-500 p-2 text-white"
                onClick={() => setDetteRembours(true)}
              >
                Rembourser une dette
              </button>
            </div>
            <div
              className={`bg-black/50 flex justify-center items-center transition-all duration-500 fixed inset-0 p-5 ${detteRembours ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div
                className={`w-full max-w-md transition-all duration-500 rounded-lg bg-gray-100 p-6 relative  ${detteRembours ? "opacity-95 scale-100" : "opacity-0 scale-95"}`}
              >
                <button
                  className="absolute right-4 top-2 text-xl"
                  onClick={() => setDetteRembours(false)}
                >
                  X
                </button>
                <div className="p-3 font-bold text-blue-600 text-lg">
                  <h1>Rembourser une Dette</h1>
                </div>
                <form
                  className="w-full flex flex-col text-xs max-w-md space-y-1 p-2"
                  onSubmit={handleDetteRembourseSubmit}
                >
                  <select
                    name="detteId"
                    id="detteId"
                    value={detteId}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      setDetteId(id);
                      const selectDette = dettes.find(
                        (dette) => dette.id === id,
                      );
                      if (selectDette) {
                        setFournisseurId(
                          selectDette.fournisseur.nomFournisseur,
                        );
                        setProduitId(selectDette.produit.nomProduit);
                        setQuantite(selectDette.quantite);
                        setMontantDette(selectDette.montant);
                      }
                    }}
                    className="focus:outline-none focus:ring ring-blue-500 w-full rounded-lg border p-2"
                  >
                    <option value="">--Selectionner une dette--</option>
                    {dettes.map((dette) => (
                      <option key={dette.id} value={dette.id}>
                        {dette.id}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="fournisseurId" className="font-medium ps-1">
                    Fournisseur
                  </label>
                  <input
                    type="text"
                    value={fournisseurId}
                    id="fournisseurId"
                    name="fournisseurId"
                    readOnly
                    className="focus:outline-none focus:ring ring-blue-500 w-full rounded-lg border p-2"
                  />
                  <label htmlFor="produitId" className="font-medium ps-1">
                    Produit
                  </label>
                  <input
                    type="text"
                    value={produitId}
                    id="produitId"
                    name="produitId"
                    readOnly
                    className="focus:outline-none focus:ring ring-blue-500 w-full rounded-lg border p-2"
                  />
                  <label htmlFor="quantite" className="font-medium ps-1">
                    Quantite
                  </label>
                  <input
                    type="number"
                    value={quantite}
                    id="quantite"
                    name="quantite"
                    readOnly
                    className="focus:outline-none focus:ring ring-blue-500 w-full rounded-lg border p-2"
                  />
                  <label htmlFor="montantTotal" className="ps-1 font-medium">
                    Montant Total
                  </label>
                  <input
                    type="number"
                    value={montantDette}
                    id="montantTotal"
                    name="montantTotal"
                    className="border rounded-lg focus:outline-none focus:ring ring-blue-600 p-2"
                    readOnly
                  />
                  <label htmlFor="montant" className="ps-1 font-medium">
                    Montant remboursé
                  </label>
                  <input
                    type="number"
                    value={montantRembourse}
                    id="montant"
                    name="montant"
                    className="border rounded-lg focus:outline-none focus:ring ring-blue-600 p-2"
                    onChange={(e) =>
                      setMontantRembourse(Number(e.target.value))
                    }
                  />
                  <label htmlFor="montant" className="hidden ps-1 font-medium">
                    Montant Restant
                  </label>
                  <input
                    type="number"
                    value={montantReste}
                    id="montant"
                    name="montant"
                    className="hidden border rounded-lg focus:outline-none focus:ring ring-blue-600 p-2"
                    readOnly
                  />
                  <button
                    type="submit"
                    className="bg-green-500 p-2 text-white rounded-lg"
                  >
                    Enregistrer
                  </button>
                  <span
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
                </form>
              </div>
            </div>
          </div>
        )}
        {activeTable === "Dette" && (
          <div className="mt-2">
            <div
              className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-all duration-500 ${openDeleteDette ? "opacity-100" : "opacity-0 pointer-events-none"} p-5`}
              //pointer events-none fait que lorsque le modal est fermé le rend invisible empêche les elements de bloquer les clicks sur tout ce qui est derrière
            >
              <div
                className={`relative w-full max-w-md rounded-lg bg-gray-200 transition-all duration-500 ${openDeleteDette ? "opacity-100 scale-100" : "opacity-0 scale-95"} p-2`}
              >
                <button
                  className="absolute right-3 top-1 text-xl"
                  onClick={() => setOpenDeleteDette(false)}
                >
                  X
                </button>
                <h1 className="text-center font-bold p-4">
                  Suppression de Dette N° 000{detteId}
                </h1>
                <form
                  className="flex-col space-y-5"
                  onSubmit={handleDetteDelete}
                >
                  <p className="p-5">
                    Voulez-vous réèllement supprimer la dette ?
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="submit"
                      className="text-xs p-1 bg-blue-500 text-white"
                    >
                      Supprimer
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenDeleteDette(false)}
                      className="text-xs p-1 bg-red-500 text-white"
                    >
                      Annuler
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
            <div className="flex justify-between p-4 text-xs text-white">
              <button
                className="rounded-md p-2 bg-green-500 hover:bg-green-600"
                onClick={() => setIsOpenModal(true)}
              >
                + Generer Dette
              </button>
              <button
                className="rounded-md p-2 bg-violet-500 hover:bg-violet-600"
                onClick={() => setOpenModal(true)}
              >
                + Ajouter Fournisseur
              </button>
            </div>
            <div className="text-center mt-5">
              <h1>Liste de Dettes</h1>
            </div>
            <div className="p-3 overfow-x-auto overflow-y-auto">
              <table className="min-w-full overflow-x-auto">
                <thead className="text-blue-600 text-left text-md">
                  <tr className="bg-gray-100 border">
                    <th className="p-3">ID</th>
                    <th className="p-3">Fournisseur</th>
                    <th className="p-3">Produit</th>
                    <th className="p-3">Prix Unitaire</th>
                    <th className="p-3">Quantite</th>
                    <th className="p-3">Montant</th>
                    <th className="p-3">Reste</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-left text-xs border p-3">
                  {dettes.map((dette) => (
                    <tr
                      key={dette.id}
                      value={dette.id}
                      className="hover:bg-gray-100 border-b"
                    >
                      <td className="p-3 font-bold">{dette.id}</td>
                      <td className="p-3 font-bold">
                        {dette.fournisseur.nomFournisseur}
                      </td>
                      <td className="p-3">{dette.produit.nomProduit}</td>
                      <td className="p-3">{dette.prixUnitaire} CFA</td>
                      <td className="p-3">{dette.quantite}</td>
                      <td className="p-3 text-red-600 font-bold">
                        {dette.montant} FCFA
                      </td>
                      <td className="p-3 text-green-600 font-bold">
                        {dette.montantReste === 0
                          ? dette.montantReste
                          : dette.montant}{" "}
                        CFA
                      </td>
                      <td className="p-3">
                        {new Date(dette.createdAt).toLocaleString()}
                      </td>
                      <td className="text-center">
                        <p
                          className={`border p-1 font-medium rounded-lg shadow-md ${
                            dette.statusDette === "En cour"
                              ? "text-red-600"
                              : dette.statusDette === "Partiellement remboursée"
                                ? "text-violet-600"
                                : "text-green-600"
                          }`}
                        >
                          {dette.statusDette}
                        </p>
                      </td>
                      <td className="p-3">
                        <button
                          className="border bg-blue-500 p-2 text-xs text-white"
                          onClick={() => editeDette(dette.id)}
                        >
                          <BiEdit />
                        </button>
                        <button
                          className="border bg-red-500 p-2 text-xs text-white"
                          onClick={() => deleteDette(dette.id)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={`bg-black/50 fixed inset-0 flex justify-center items-center p-5 transition-all duration-500 ${isOpenModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div
                className={`relative w-full max-w-md rounded-lg transition-all duration-500 ${isOpenModal ? "opacity-100 scale-100" : "opacity-0 scale-95"} bg-gray-100 p-8`}
              >
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="absolute right-4 top-2 p-2 text-xl"
                >
                  X
                </button>
                <h1 className="font-bold p-3 text-blue-800">Nouvelle Dette</h1>
                <form
                  onSubmit={detteId ? handleEditeDette : handleDette}
                  className="flex-col space-y-2 p-3 text-xs"
                >
                  <select
                    className="rounded-lg border border-gray-300 w-full p-2 focus:outline-none focus:ring ring-blue-500"
                    name="fournisseurId"
                    id="fournisseurId"
                    value={fournisseurId}
                    onChange={(e) => setFournisseurId(Number(e.target.value))}
                  >
                    <option value="">--Selectionner un Fournisseur--</option>
                    {fournisseurs.map((fournisseur) => (
                      <option key={fournisseur.id} value={fournisseur.id}>
                        {fournisseur.nomFournisseur}
                      </option>
                    ))}
                  </select>
                  <select
                    className="rounded-lg border border-gray-300 w-full p-2 focus:outline-none focus:ring ring-blue-500"
                    name="produitId"
                    id="produitId"
                    value={produitId}
                    onChange={(e) => setProduitId(Number(e.target.value))}
                  >
                    <option value="">--Selectionner un produit--</option>
                    {produits.map((produit) => (
                      <option key={produit.id} value={produit.id}>
                        {produit.nomProduit}
                      </option>
                    ))}
                  </select>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring ring-blue-500"
                    type="number"
                    value={quantite}
                    placeholder="Quantité"
                    onChange={(e) => setQuantite(Number(e.target.value))}
                    min="0.01"
                    step="0.01"
                  />
                  <input
                    className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring ring-blue-500"
                    type="number"
                    value={prixUnitaire}
                    placeholder="Prix Unitaire"
                    onChange={(e) => setPrixUnitaire(Number(e.target.value))}
                  />
                  <input
                    className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring ring-blue-500"
                    type="number"
                    value={montant}
                    placeholder="Siége Social"
                    readOnly
                  />
                  <input
                    className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring ring-blue-500"
                    type="date"
                    value={dateRembourse}
                    onChange={(e) => setDateRembourse(e.target.value)}
                  />
                  <span
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
                    className="p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-700"
                  >
                    {detteId ? "Modifier" : "Enregistrer"}
                  </button>
                </form>
              </div>
            </div>

            <div
              className={`bg-black/50 fixed inset-0 flex justify-center items-center p-5 transition-all duration-500 ${openModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <div
                className={`relative w-full max-w-lg rounded-lg bg-gray-100 transition-all duration-500 ${openModal ? "opacity-100 sacle-100" : "opacity-0 scale-95"} p-8`}
              >
                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute right-4 top-2 p-2 text-xl"
                >
                  X
                </button>
                <h1 className="font-bold p-3 text-blue-800">
                  Nouveau Fournisseur
                </h1>
                <form
                  onSubmit={handleFournisseur}
                  className="flex-col space-y-3 p-3 text-xs"
                >
                  <input
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring ring-blue-500"
                    type="text"
                    value={nomFournisseur}
                    placeholder="Nom Fournisseur"
                    onChange={(e) => setNomFournisseur(e.target.value)}
                  />
                  <input
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring ring-blue-500"
                    type="tel"
                    value={contact}
                    placeholder="Numero Telephone"
                    onChange={(e) => setContact(e.target.value)}
                  />
                  <input
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring ring-blue-500"
                    type="email"
                    value={email}
                    placeholder="Adresse Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring ring-blue-500"
                    type="text"
                    value={siege}
                    placeholder="Siége Social"
                    onChange={(e) => setSiege(e.target.value)}
                  />
                  <span
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
                  <button className="p-3 w-full bg-blue-500 text-white rounded-md hover:bg-blue-700">
                    Valider
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {activeTable === "Historique de Payement" && (
          <div className="">
            <div className="text-center p-5">
              <h1 className="font-bold">Liste de Transactions</h1>
            </div>
            <div className="p-3">
              <table className="w-full text-left border">
                <thead className="bg-gray-100 border text-blue-600 text-md">
                  <tr>
                    <th className="p-3">ID Creance</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Produit</th>
                    <th className="p-3">Quantité</th>
                    <th className="p-3">Montant Versé</th>
                    <th className="p-3">Montant Restant</th>
                    <th className="p-3">Date de Payement</th>
                  </tr>
                </thead>

                <tbody className="p-4 text-xs">
                  {creanceSoldes.map((creanceSolde) => (
                    <tr key={creanceSolde.id} value={creanceSolde.id}>
                      <td className="text-left p-3">
                        {creanceSolde.creanceId}
                      </td>
                      <td className="text-left p-3">
                        {creanceSolde.client.clientName}
                      </td>
                      <td className="text-left p-3">
                        {creanceSolde.produit.nomProduit}
                      </td>
                      <td className="text-left p-3">{creanceSolde.quantite}</td>
                      <td className="text-left p-3">
                        {creanceSolde.montantVerse} CFA
                      </td>
                      <td className="text-left p-3">
                        {creanceSolde.montantRestant} CFA
                      </td>
                      <td className="text-left p-3">
                        {new Date(creanceSolde.createdAt).toLocaleString()}
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
