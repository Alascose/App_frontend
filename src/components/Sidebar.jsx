import { NavLink } from "react-router-dom";
export default function Sidebar() {
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
    <aside className="hidden md:block bg-gray-800 w-56 p-4 pt-12">
      <ul className="space-y-5">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={(
                { isActive }, // isActive est fourni automatiquement par NavLink
              ) =>
                `block rounded-lg p-3 text-white ${isActive ? "bg-blue-500 p-3" : "hover:bg-blue-500 hover:scale-105 transition duration-300 p-3"}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
