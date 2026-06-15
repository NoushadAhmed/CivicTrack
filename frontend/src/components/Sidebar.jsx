import {
  FaHome,
  FaClipboardList,
  FaPlusCircle,
  FaChartBar,
  FaTasks,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Sidebar() {
  const { user, setUser } = useAuth();

  const [open, setOpen] =
    useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {/* Mobile Header */}

      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-50 p-4 flex justify-between">

          <h1 className="font-bold text-indigo-600 text-xl">
          {user?.role === "admin" ? "Admin Console" : user?.role === "citizen" ? "Citizen Console" : "Officer Console"}
        </h1>

        <button
          onClick={() =>
            setOpen(!open)
          }
        >
          <FaBars />
        </button>

      </div>

      {/* Sidebar */}

      <aside
        className={`
        fixed top-0 left-0 z-40
        h-screen w-72 bg-white/60 backdrop-blur-xl border-r border-white/70 shadow-[0_10px_40px_-20px_rgba(2,132,199,0.35)]
        transition-transform duration-300


        ${open
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }
      `}
      >

        <div className="p-6 border-b border-white/70">

          <h1 className="text-2xl font-bold text-indigo-600">
            {user?.role === "admin" ? "Admin Console" : user?.role === "citizen" ? "Citizen Console" : "Officer Console"}
          </h1>
        </div>

        <nav className="p-4 space-y-2">

          {/* Citizen */}

          {user?.role ===
            "citizen" && (
            <>
              <Link
                to="/citizen"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaHome />
                Dashboard
              </Link>

              <Link
                to="/create-complaint"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaPlusCircle />
                Create Complaint
              </Link>

              <Link
                to="/my-complaints"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaClipboardList />
                My Complaints
              </Link>
            </>
          )}

          {/* Officer */}

          {user?.role ===
            "officer" && (
            <>
              <Link
                to="/officer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaHome />
                Dashboard
              </Link>

              <Link
                to="/assigned"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaTasks />
                Assigned Complaints
              </Link>
            </>
          )}

          {/* Admin */}

          {user?.role ===
            "admin" && (
            <>
              <Link
                to="/admin"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaHome />
                Dashboard
              </Link>

              <Link
                to="/manage-complaints"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaClipboardList />
                Manage Complaints
              </Link>




              <Link
                to="/assign-officers"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaTasks />
                Assign Officers
              </Link>

              <Link
                to="/categories"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaClipboardList />
                Categories
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
              >
                <FaTasks />
                Settings
              </Link>


            </>
          )}

        </nav>

        <div className="absolute bottom-5 left-4 right-4">

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-cyan-200 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-700/30"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}