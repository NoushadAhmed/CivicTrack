import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle Google OAuth redirect
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);

            toast.success("Google Login Successful");

            navigate("/citizen");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem(
                "token",
                res.data.token
            );

            setUser(res.data.user);

            toast.success("Login Successful");

            const role = res.data.user.role;

            if (role === "admin") {
                navigate("/admin");
            } else if (role === "officer") {
                navigate("/officer");
            } else {
                navigate("/citizen");
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden relative px-4">

            {/* Background */}
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-indigo-300 blur-3xl opacity-30"></div>

            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-cyan-300 blur-3xl opacity-30"></div>

            {/* Login Card */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 40,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.7,
                }}
                className="w-full max-w-md z-10"
            >
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white">

                    <h1 className="text-4xl font-bold text-slate-900">
                        Welcome Back
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Login to your account
                    </p>

                    <form
                        onSubmit={handleLogin}
                        className="mt-8 space-y-5"
                    >

                        {/* Email */}
                        <div>

                            <label className="text-sm text-slate-600">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                                className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        {/* Password */}
                        <div>

                            <label className="text-sm text-slate-600">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-5 text-sm text-slate-500"
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:scale-[1.02] transition"
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t"></div>
                        <span className="px-4 text-sm text-slate-400">
                            OR
                        </span>
                        <div className="flex-1 border-t"></div>
                    </div>

                    {/* Google Login */}
                    <button
                        type="button"
                        onClick={() =>
                            window.location.href =
                            "https://civictrack-backend-rtas.onrender.com/api/auth/google"
                        }
                        className="w-full py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 font-medium transition"
                    >
                        Continue with Google
                    </button>

                    {/* Register */}
                    <p className="mt-6 text-center text-slate-500">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-indigo-600 font-medium"
                        >
                            Register
                        </Link>

                    </p>

                </div>
            </motion.div>
        </div>
    );
}