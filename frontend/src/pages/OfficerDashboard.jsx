import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

import API from "../services/api";

export default function OfficerDashboard() {

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
              "/complaints/officer/assigned"
            );

          const complaints =
            Array.isArray(res.data.complaints)
              ? res.data.complaints
              : [];

          setStats({
            total:
              complaints.length,

            pending:
              complaints.filter(
                c =>
                  c.status ===
                  "Pending"
              ).length,

            resolved:
              complaints.filter(
                c =>
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

      <h1 className="text-4xl font-bold mb-8">
        Officer Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <DashboardCard
          title="Assigned"
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

    </DashboardLayout>
  );
}