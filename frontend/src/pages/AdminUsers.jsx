import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AdminUsers() {
  const [tab, setTab] = useState("citizens");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const roleForTab =
    tab === "citizens" ? "citizen" : tab === "officers" ? "officer" : "admin";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await API.get(`/users?role=${roleForTab}`);
        setUsers(res.data?.users ?? res.data ?? []);
      } catch (e) {
        setError(e?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [roleForTab]);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900">
          Users
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Manage citizens, officers, and admins.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { key: "citizens", label: "Citizens" },
            { key: "officers", label: "Officers" },
            { key: "admins", label: "Admins" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                "px-4 py-2 rounded-full border transition text-sm font-semibold " +
                (tab === t.key
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white/60 border-white/70 text-slate-700 hover:border-indigo-200 hover:text-indigo-700")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <p className="text-red-600 mt-2">{error}</p>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-xl shadow-[0_18px_70px_-35px_rgba(59,130,246,0.25)]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">{roleForTab}</div>
                <div className="text-sm text-slate-500">{users.length} records</div>
              </div>
            </div>

            <div className="p-5">
              {users.length === 0 ? (
                <div className="text-slate-500 text-sm py-10 text-center">No users found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="text-xs text-slate-500 uppercase">
                      <tr>
                        <th className="py-3 px-3">Name</th>
                        <th className="py-3 px-3">Email</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Created</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-800">
                      {users.map((u) => (
                        <tr key={u._id ?? u.id} className="border-t border-slate-100">
                          <td className="py-3 px-3 font-semibold">{u.name}</td>
                          <td className="py-3 px-3">{u.email}</td>
                          <td className="py-3 px-3">
                            <span
                              className={
                                "inline-flex items-center rounded-full px-2.5 py-1 text-xs border " +
                                ((u.status === "disabled" || u.enabled === false) ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700")
                              }
                            >
                              {(u.status === "disabled" || u.enabled === false) ? "Disabled" : "Active"}
                            </span>
                          </td>
                          <td className="py-3 px-3">{new Date(u.createdAt ?? u.created_date ?? Date.now()).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

