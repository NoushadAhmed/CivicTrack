import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AssignOfficers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [assigningId, setAssigningId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        // Best-effort: backend may not have these exact routes yet.
        // Fallback keeps the page functional even if analytics endpoints differ.
        // Backend currently supports:
        // - GET /api/complaints (admin/officer can fetch all; status filtering may not be implemented)
        // - PUT /api/complaints/:id/assign
        // - There is no explicit officers list route in complaintController.
        // This page therefore uses best-effort fallbacks.

        const [complaintsRes, officersRes] = await Promise.allSettled([
          API.get("/complaints"),
          API.get("/users"),
        ]);



        const cVal =
          complaintsRes.status === "fulfilled"
            ? complaintsRes.data?.complaints ?? complaintsRes.data?.complaint ?? complaintsRes.data
            : [];

        const oVal =
          officersRes.status === "fulfilled"
            ? officersRes.data?.users ?? officersRes.data?.user ?? officersRes.data
            : [];


        const allComplaints = Array.isArray(cVal) ? cVal : [];

        // Normalize complaints array
        const normalizedComplaints = Array.isArray(allComplaints)
          ? allComplaints
          : [];

        // Normalize officers array
        const normalizedOfficers = Array.isArray(oVal)
          ? oVal
          : [];

        // Pending filter (best-effort)
        const pendingComplaints = normalizedComplaints.filter((c) =>
          String(c.status || "")
            .toLowerCase()
            .includes("pending")
        );


        // In your backend, complaint.status might be exactly "Pending" (no lower-case).
        // If pending filter removes everything, fall back to all complaints.
        setComplaints(
          pendingComplaints.length ? pendingComplaints : normalizedComplaints
        );


        // Filter officers client-side by role.
        setOfficers(
          normalizedOfficers.filter((u) => {
            const role = String(u.role || u.userRole || u.type || "").toLowerCase();
            return role === "officer";
          })
        );



      } catch (e) {
        setError(e?.message || "Failed to load assignment data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const officerById = useMemo(() => {
    const map = new Map();
    officers.forEach((o) => map.set(o._id ?? o.id, o));
    return map;
  }, [officers]);

  const assignOfficer = async (complaintId, officerId) => {
    try {
      setAssigningId(complaintId);
      await API.put(`/complaints/${complaintId}/assign`, {
        officerId,
      });

      setComplaints((prev) =>
        prev.map((c) =>
          (c._id ?? c.id) === complaintId
            ? { ...c, assignedOfficer: officerById.get(officerId) ?? c.assignedOfficer }
            : c
        )
      );
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || "Assign failed");
    } finally {
      setAssigningId(null);
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
          Assign Officers
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Assign or reassign officers to pending complaints. Workload indicators help prevent overload.
        </p>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <p className="text-red-600 mt-2">{error}</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-xl shadow-[0_18px_70px_-35px_rgba(59,130,246,0.25)] p-6">
              <h2 className="text-xl font-bold text-slate-900">Complaint List</h2>
              <p className="text-slate-500 mt-2 text-sm">
                Showing {complaints.length} complaints.
              </p>

              <div className="mt-4 space-y-4">
                {complaints.length === 0 ? (
                  <div className="text-slate-500 text-sm py-10 text-center">
                    No complaints available.
                  </div>
                ) : (
                  complaints.slice(0, 20).map((c) => {
                    const id = c._id ?? c.id;
                    const assigned = c.assignedOfficer?._id ?? c.assignedOfficer?.id ?? c.officerId;
                    return (
                      <div
                        key={id}
                        className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-bold text-slate-900">
                              {c.title || c.complaintId || "Untitled"}
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                              {c.category || "Category"} · {c.location || "Location"}
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">
                            Status: <span className="font-semibold">{c.status}</span>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                          <div>
                            <label className="text-xs text-slate-500">Assign Officer</label>
                            <select
                              value={assigned ?? ""}
                              onChange={(e) => assignOfficer(id, e.target.value)}
                              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              disabled={assigningId === id}
                            >
                              <option value="" disabled>
                                Select officer
                              </option>
                              {officers.map((o) => (
                                <option key={o._id ?? o.id} value={o._id ?? o.id}>
                                  {o.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                            <div className="text-xs text-slate-500">Current</div>
                            <div className="font-semibold text-slate-800">
                              {officerById.get(assigned)?.name || "Unassigned"}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-xl shadow-[0_18px_70px_-35px_rgba(59,130,246,0.25)] p-6">
              <h2 className="text-xl font-bold text-slate-900">Available Officers</h2>
              <p className="text-slate-500 mt-2 text-sm">
                Showing {officers.length} officers.
              </p>

              <div className="mt-4 grid gap-3">
                {officers.length === 0 ? (
                  <div className="text-slate-500 text-sm py-10 text-center">No officers found.</div>
                ) : (
                  officers.slice(0, 12).map((o) => (
                    <div key={o._id ?? o.id} className="rounded-2xl border border-slate-100 bg-white p-4">
                      <div className="font-bold text-slate-900">{o.name}</div>
                      <div className="text-sm text-slate-500 mt-1">{o.email}</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                          Workload: {o.workload ?? "—"}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Success: {o.successRate ?? "—"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

