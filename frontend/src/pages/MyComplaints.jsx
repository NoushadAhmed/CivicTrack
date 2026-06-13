import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyComplaints() {
  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const fetchComplaints =
      async () => {
        try {
          const res =
            await API.get(
              "/complaints"
            );

          setComplaints(
            res.data.complaints
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchComplaints();
  }, []);

  const filteredComplaints =
    complaints.filter((c) =>
      c.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          My Complaints
        </h1>

        <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full">

          {
            filteredComplaints.length
          } Complaints

        </span>

      </div>

      <input
        type="text"
        placeholder="Search complaints..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full mb-6 p-4 rounded-2xl border border-slate-200 bg-white"
      />

      {loading ? (
        <LoadingSpinner />
      ) : filteredComplaints.length ===
        0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow">

          <h2 className="text-2xl font-bold">
            No Complaints Found
          </h2>

          <p className="text-slate-500 mt-3">
            Create your first complaint.
          </p>

        </div>
      ) : (
        <div className="grid gap-5">

          {filteredComplaints.map(
            (complaint) => (
              <div
                key={
                  complaint._id
                }
                className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition"
              >

                <div className="flex justify-between items-center">

                  <h2 className="text-xl font-bold">
                    {
                      complaint.title
                    }
                  </h2>

                  <StatusBadge
                    status={
                      complaint.status
                    }
                  />

                </div>

                <p className="text-slate-600 mt-4">

                  {
                    complaint.description
                  }

                </p>

                <div className="mt-4 flex gap-3 flex-wrap">

                  <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                    {
                      complaint.category
                    }
                  </span>

                  <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                    {
                      complaint.location
                    }
                  </span>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </DashboardLayout>
  );
}