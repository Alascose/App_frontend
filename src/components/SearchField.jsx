import { FaSearch } from "react-icons/fa";
export default function SearchField() {
  return (
    <div className="relative w-full max-w-md p-6 ms-3">
      <span className="absolute top-8 left-7">
        <button className="text-gray-500">
          <FaSearch />
        </button>
      </span>
      <input
        type="search"
        placeholder="Rechercher..."
        className="rounded-lg w-full p-1 pl-7 focus:outline-none ring-2 ring-gray-500"
      />
    </div>
  );
}
