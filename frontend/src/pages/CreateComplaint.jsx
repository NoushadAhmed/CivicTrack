import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

import toast from "react-hot-toast";

export default function CreateComplaint() {

    const navigate = useNavigate();

    const [title, setTitle] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    const [category,
        setCategory] =
        useState("");

    const [location,
        setLocation] =
        useState("");

    const [loading,
        setLoading] =
        useState(false);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                await API.post(
                    "/complaints",
                    {
                        title,
                        description,
                        category,
                        location,
                    }
                );

                toast.success(
                    "Complaint Submitted Successfully"
                );

                navigate(
                    "/my-complaints"
                );

            } catch (error) {

                toast.error(
                    error.response?.data
                        ?.message ||
                    "Error creating complaint"
                );

            } finally {

                setLoading(false);

            }
        };

    return (
        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">
                Create Complaint
            </h1>

            <div className="bg-white p-8 rounded-3xl shadow max-w-4xl">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Complaint Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                        className="w-full p-4 border rounded-xl"
                    />

                    <textarea
                        rows="6"
                        placeholder="Complaint Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        required
                        className="w-full p-4 border rounded-xl"
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                        required
                        className="w-full p-4 border rounded-xl"
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="Road">
                            Road
                        </option>

                        <option value="Electricity">
                            Electricity
                        </option>

                        <option value="Water">
                            Water
                        </option>

                        <option value="Garbage">
                            Garbage
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) =>
                            setLocation(
                                e.target.value
                            )
                        }
                        required
                        className="w-full p-4 border rounded-xl"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-8 py-4 rounded-xl"
                    >

                        {loading
                            ? "Submitting..."
                            : "Submit Complaint"}

                    </button>

                </form>

            </div>

        </DashboardLayout>
    );
}