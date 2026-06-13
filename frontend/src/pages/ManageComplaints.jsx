import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

export default function ManageComplaints() {

  const [complaints, setComplaints] =
    useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {

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

    }
  };

  const deleteComplaint =
    async (id) => {

      if (
        !window.confirm(
          "Delete complaint?"
        )
      )
        return;

      try {

        await API.delete(
          `/complaints/${id}`
        );

        fetchComplaints();

      } catch (error) {

        alert(
          "Delete failed"
        );

      }
    };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Manage Complaints
      </h1>

      <div className="grid gap-5">

        {complaints.map(
          (complaint) => (

            <div
              key={complaint._id}
              className="bg-white p-6 rounded-3xl shadow"
            >

              <h2 className="text-xl font-bold">
                {complaint.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {
                  complaint.description
                }
              </p>

              <div className="mt-4 flex gap-3">

                <button
                  onClick={() =>
                    deleteComplaint(
                      complaint._id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </DashboardLayout>
  );
}