import Button from "./Button";
export default function Modal_Creance({ isOpen, onClose, title }) {
  if (!isOpen) return null;
  return (
    <div className="bg-black/50 fixed inset-0 flex justify-center items-center p-4">
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="absolute right-3 top-2 text-2xl">
          <button className="text-gray-500" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex">
          <h1 className="font-bold text-2xl mb-3 p-3">{title}</h1>
        </div>
        <form className="flex flex-col justify-center p-2 space-y-2">
          <input
            type="text"
            className="border rounded-lg focus:outline-none focus:ring ring-blue-500 p-3"
            placeholder="Nom du Créancier"
          />
          <input
            type="text"
            className="border rounded-lg focus:outline-none focus:ring ring-blue-500 p-3"
            placeholder="Profféssion"
          />
          <input
            type="text"
            className="border rounded-lg focus:outline-none focus:ring ring-blue-500 p-3"
            placeholder="Adresse"
          />
          <select
            name=""
            id=""
            className="border w-full rounded-lg p-3 focus:outline-none focus:ring ring-blue-500"
          >
            <option value="">Selectionner un Produit</option>
            <option value=""></option>
          </select>
          <input
            type="number"
            className="border rounded-lg focus:outline-none focus:ring ring-blue-500 p-3"
            placeholder="Quantité"
          />
          <input
            type="number"
            className="border rounded-lg focus:outline-none focus:ring ring-blue-500 p-3"
            placeholder="Montant Total"
            disabled
          />
          <div className="text-xs flex gap-2">
            <Button color="red" onClick={onClose}>
              Annuler
            </Button>
            <Button color="blue">Ajouter</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
