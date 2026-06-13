import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import StatsChart from "../components/StatsChart";

import API from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          setError(null);

          const res =
            await API.get(
              "/complaints/stats"
            );

          setStats(res.data);

        } catch (error) {

          console.error(error);

          setError(
            error.message ||
            "Failed to load statistics"
          );

        } finally {

          setLoading(false);

        }
      };

    fetchStats();

  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-semibold">
          Loading...
        </h1>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-red-600">
            Error
          </h2>
          <p className="text-red-600 mt-2">
            {error}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const dateLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <DashboardLayout>
      <div className="relative">
        <div className="mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-4xl font-black tracking-tight text-slate-900"
          >
            Welcome Back, Admin
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-slate-600"
          >
            {greeting} · {dateLabel}
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCard
            title="Total Complaints"
            value={stats?.totalComplaints || 0}
            color="text-indigo-600"
          />
          <DashboardCard
            title="Pending"
            value={stats?.pending || 0}
            color="text-yellow-500"
          />
          <DashboardCard
            title="In Progress"
            value={stats?.inProgress || 0}
            color="text-blue-500"
          />
          <DashboardCard
            title="Resolved"
            value={stats?.resolved || 0}
            color="text-emerald-600"
          />
          <DashboardCard
            title="Active Officers"
            value={stats?.activeOfficers || 0}
            color="text-teal-600"
          />
          <DashboardCard
            title="Registered Citizens"
            value={stats?.registeredCitizens || 0}
            color="text-cyan-600"
          />
        </div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-8"
          >
            <StatsChart stats={stats} />
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}