import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/contacts", label: "Contacts" },
  { to: "/debts", label: "Debts" },
  { to: "/reports", label: "Reports" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="font-bold text-brand-600 text-lg">IvonDebt</span>
        <div className="flex gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {label}
              {label === "Dashboard" && state.summary.overdueCount > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {state.summary.overdueCount}
                </span>
              )}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">{username}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50"
          >
            Çıkış
          </button>
        </div>
      </div>
    </nav>
  );
}
