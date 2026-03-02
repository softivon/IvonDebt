import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import ContactDetail from "./pages/ContactDetail";
import Debts from "./pages/Debts";
import DebtDetail from "./pages/DebtDetail";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/:id" element={<ContactDetail />} />
              <Route path="/debts" element={<Debts />} />
              <Route path="/debts/:id" element={<DebtDetail />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
