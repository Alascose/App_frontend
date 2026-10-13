export default function Button({ children, onClick, color = "blue" }) {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    green: "bg-green-500 hover:bg-green-600",
  };
  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white rounded-lg transition duration-300 p-3`}
    >
      {children}
    </button>
  );
}
