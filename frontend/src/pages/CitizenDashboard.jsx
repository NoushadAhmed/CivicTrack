import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function CitizenDashboard() {

  const { user } =
    useAuth();

  const [stats, setStats] =
    useState({
      total: 0,
      pending: 0,
      resolved: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          setError(null);

          const res =
            await API.get(
              "/complaints"
            );

          const complaints =
            res.data.complaints;

          setStats({
            total:
              complaints.length,

            pending:
              complaints.filter(
                (c) =>
                  c.status ===
                  "Pending"
              ).length,

            resolved:
              complaints.filter(
                (c) =>
                  c.status ===
                  "Resolved"
              ).length,
          });

        } catch (error) {

          console.error(error);

          setError(
            error.message ||
            "Failed to load dashboard"
          );

        } finally {

          setLoading(false);

        }
      };

    fetchData();

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

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Welcome,
          {" "}
          {user?.name}

        </h1>

        <p className="text-slate-500 mt-2">
          Track and manage your complaints.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <DashboardCard
          title="My Complaints"
          value={stats.total}
          color="text-indigo-600"
        />

        <DashboardCard
          title="Pending"
          value={stats.pending}
          color="text-yellow-500"
        />

        <DashboardCard
          title="Resolved"
          value={stats.resolved}
          color="text-green-500"
        />

      </div>

      <div className="mt-10 bg-white p-6 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Recent Activity
        </h2>

        <p className="text-slate-500">
          Your latest complaints and status updates will appear here.
        </p>

      </div>

    </DashboardLayout>
  );
}