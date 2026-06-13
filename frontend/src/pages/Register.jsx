import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleRegister = async (
        e
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            await API.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            toast.success(
                "Registration Successful"
            );

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data
                    ?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden relative px-4">

            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-violet-300 blur-3xl opacity-30"></div>

            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-cyan-300 blur-3xl opacity-30"></div>

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.9,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="w-full max-w-lg z-10"
            >

                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white">

                    <h1 className="text-4xl font-bold">
                        Create Account
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Join CivicTrack today
                    </p>

                    <form
                        onSubmit={handleRegister}
                        className="mt-8 space-y-5"
                    >

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:scale-[1.02] transition"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Register"}
                        </button>

                    </form>

                    <p className="mt-6 text-center text-slate-500">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-indigo-600 font-medium"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </motion.div>

        </div>
    );
}