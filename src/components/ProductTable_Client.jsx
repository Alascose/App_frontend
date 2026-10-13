export default function ProductTable_Client() {
  return (
    <div className="shadow-lg p-4 overflow-x-auto overflow-y-auto max-h-80">
      <table className="min-w-full">
        <thead className="">
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Nom && Prenom(s)</th>
            <th className="p-4 text-left">Contact</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t p-4 hover:bg-gray-50"></tr>
          <tr className="border-t p-4 hover:bg-gray-50"></tr>
          <tr className="border-t p-4 hover:bg-gray-50"></tr>
          <tr className="border-t p-4 hover:bg-gray-50"></tr>
        </tbody>
      </table>
    </div>
  );
}
