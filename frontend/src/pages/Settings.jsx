import { useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.put("/users/me", { name, email });
      alert("Profile updated (if backend supports it)");
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.put("/auth/change-password", { password });
      alert("Password changed (if backend supports it)");
      setPassword("");
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900">
          Settings
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Profile + security + system configuration.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-xl shadow-[0_18px_70px_-35px_rgba(59,130,246,0.25)] p-6">
            <h2 className="text-xl font-bold text-slate-900">Admin Profile</h2>

            <form onSubmit={updateProfile} className="mt-4 space-y-4">
              <div>
                <label className="text-xs text-slate-500">Update Name</label>
                <input
                  className="w-full mt-2 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">Update Email</label>
                <input
                  className="w-full mt-2 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition"
              >
                {loading ? "Saving..." : "Update Profile"}
              </button>
            </form>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-xl shadow-[0_18px_70px_-35px_rgba(59,130,246,0.25)] p-6">
            <h2 className="text-xl font-bold text-slate-900">Security</h2>

            <form onSubmit={changePassword} className="mt-4 space-y-4">
              <div>
                <label className="text-xs text-slate-500">Change Password</label>
                <input
                  type="password"
                  className="w-full mt-2 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 transition"
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </form>

            <div className="mt-5 text-xs text-slate-500">
              Additional security items (logout all sessions, profile picture upload, system settings) require backend endpoints.
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

