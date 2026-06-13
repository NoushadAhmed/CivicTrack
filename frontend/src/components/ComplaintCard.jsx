import { useState } from "react";
import API from "../services/api";

export default function ComplaintCard({
  complaint
}) {

  const [status, setStatus] =
    useState(
      complaint.status
    );

  const updateStatus =
    async () => {

      try {

        await API.put(
          `/complaints/${complaint._id}/status`,
          { status }
        );

        alert(
          "Status Updated"
        );

      } catch (error) {

        alert(
          "Update Failed"
        );

      }
    };

  return (
    <div className="bg-white p-6 rounded-3xl shadow">

      <h2 className="text-xl font-bold">
        {complaint.title}
      </h2>

      <p className="mt-3 text-slate-600">
        {complaint.description}
      </p>

      <div className="mt-4">

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="border p-3 rounded-xl"
        >

          <option>
            Pending
          </option>

          <option>
            In Progress
          </option>

          <option>
            Resolved
          </option>

        </select>

        <button
          onClick={
            updateStatus
          }
          className="ml-3 bg-indigo-600 text-white px-5 py-3 rounded-xl"
        >
          Update
        </button>

      </div>

    </div>
  );
}