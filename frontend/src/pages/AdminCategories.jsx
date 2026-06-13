import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const DEFAULT_CATEGORIES = [
  "Road",
  "Water",
  "Electricity",
  "Garbage",
  "Sanitation",
  "Street Light",
  "Drainage",
  "Other",
];

export default function AdminCategories() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError(null);
        setLoading(true);
        // Best-effort: category backend may not be implemented yet.
        const res = await API.get("/categories");
        const list = res.data?.categories ?? res.data;
        if (Array.isArray(list) && list.length) setCategories(list);
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const remove = async (nameOrId) => {
    if (!window.confirm("Delete category?")) return;
    try {
      setError(null);
      await API.delete(`/categories/${nameOrId}`);
      setCategories((prev) => prev.filter((c) => (c._id ?? c) !== nameOrId));
      alert("Category deleted");
    } catch (e) {
      alert(e?.response?.data?.message || "Delete failed");
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
          Categories
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Manage complaint categories. Each complaint must belong to a category.
        </p>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <p className="text-red-600 mt-2">{error}</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((c) => {
              const name = typeof c === "string" ? c : c.name;
              const id = typeof c === "string" ? c : c._id;
              return (
                <div
                  key={id ?? name}
                  className="rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-xl shadow-[0_18px_70px_-35px_rgba(59,130,246,0.25)] p-5"
                >
                  <div className="font-bold text-slate-900">{name}</div>
                  <div className="mt-4">
                    <button
                      onClick={() => remove(id ?? name)}
                      className="w-full rounded-xl bg-red-500 text-white py-2 text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="rounded-[28px] border border-dashed border-slate-200 bg-white/40 backdrop-blur-xl p-5 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-semibold text-slate-700">Add Category</div>
                <div className="mt-2 text-xs text-slate-500">Connect backend endpoints to enable CRUD.</div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

