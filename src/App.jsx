import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Vente from "./pages/Vente";
import Client from "./pages/Client";
import Finance from "./pages/Finance";
import Fournisseur from "./pages/Fournisseurs";
export default function App() {
  return (
    <div className="flex min-h-screen">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Stock" element={<Stock />} />
          <Route path="Vente" element={<Vente />} />
          <Route path="Client" element={<Client />} />
          <Route path="Finance" element={<Finance />} />
          <Route path="Fournisseur" element={<Fournisseur />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
