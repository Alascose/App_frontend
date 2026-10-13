import { useEffect, useState } from "react";
export default function Carousel() {
  const produits = ["Produit 1", "Produit 2", "Produit 3"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % produits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-500">
      <div className="w-[400px] overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {produits.map((prod) => (
            <div
              key={prod}
              className="w-[400px] rounded-lg shadow-lg bg-blue-500 text-white text-center flex-shrink-0 p-8"
            >
              {prod}{" "}
              {/*flex-shrink-0 veut dire ne retrecie jamais cette carte */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
