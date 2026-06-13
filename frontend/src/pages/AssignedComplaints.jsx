import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import ComplaintCard from "../components/ComplaintCard";

export default function AssignedComplaints() {

  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const res =
            await API.get(
              "/complaints/officer/assigned"
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

    fetchData();

  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Assigned Complaints
      </h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (

        <div className="grid gap-5">

          {complaints.map(
            (complaint) => (

              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
              />

            )
          )}

        </div>

      )}

    </DashboardLayout>
  );
}