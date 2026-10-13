export default function Parametre() {
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
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="bg-gray-300 rounded-full p-5">
        <h1>Profil d'Utilisateur</h1>
        <p></p>
      </div>
    </div>
  );
}
