export default function Card({ title, color, value }) {
  return (
    <div className={`${color} text-black border rounded-lg shadow-lg p-5`}>
      <h1 className="text-xl font-bold p-2">{title}</h1>
      <p className="text-white my-3">
        <span className="rounded-full bg-blue-600 p-2 px-3">{value}</span>
      </p>
    </div>
  );
}
