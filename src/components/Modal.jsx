import Button from "./Button";
export default function Modal({ isOpen, onClose, title }) {
  if (!isOpen) return null;
  return (
    <div className="bg-black/50 fixed inset-0 flex justify-center items-center p-4">
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-8">
        <div className="absolute right-3 top-2 text-2xl">
          <button className="text-gray-500" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex">
          <h1 className="font-bold text-2xl mb-5 p-3">{title}</h1>
        </div>
        <form className="flex flex-col justify-center p-2 space-y-4">
          <select
            name=""
            id=""
            className="border rounded-lg w-full max-w-md p-3 focus:outline-none focus:ring ring-blue-500"
          >
            <option value="">Selectionner une Catégorie</option>
            <option value=""></option>
          </select>
          <input
            type="text"
            className="border rounded-lg focus:outline-none focus:ring ring-blue-500 p-3"
            placeholder="Nom du produit"
          />
          <input
            type="number"
            className="border rounded-lg focus:outline-none focus:ring ring-blue-500 p-3"
            placeholder="Prix Unitaire"
            step="0.01" /*step permet la saisie de centimes exemple(15.20) */
            min="0.01" /*min permet d'eviter la saisie de nombre negatif */
          />
          <input
            type="number"
            className="border rounded-lg focus:outline-none focus:ring ring-blue-500 p-3"
            placeholder="Quantité"
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
