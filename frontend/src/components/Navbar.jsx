import { useState } from "react";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaChartLine,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "Impact", href: "#impact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur-xl"
      >
        <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-7">
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex min-w-0 items-center gap-3 rounded-full pr-3 transition duration-300 hover:-translate-y-0.5 hover:bg-white/70"
            aria-label="CivicTrack home"
          >
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 shadow-lg shadow-cyan-500/30 transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <span className="absolute -right-4 -top-4 h-9 w-9 rounded-full bg-white/25" />
              <span className="absolute -bottom-4 -left-4 h-9 w-9 rounded-full bg-cyan-200/20" />
              <svg
                aria-hidden="true"
                viewBox="0 0 32 32"
                className="relative h-7 w-7 text-white drop-shadow-sm"
                fill="none"
              >
                <path
                  d="M16 4.8c-5.1 0-9.2 3.7-9.2 8.3 0 2.7 1.5 5.2 3.9 6.7v4.3l4.1-2.8c.4.1.8.1 1.2.1 5.1 0 9.2-3.7 9.2-8.3S21.1 4.8 16 4.8Z"
                  fill="currentColor"
                  opacity="0.95"
                />
                <path
                  d="m12.1 13.9 2.7 2.7 5.5-6"
                  stroke="#2563eb"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="font-display block truncate text-xl font-black leading-tight text-slate-950">
                CivicTrack
              </span>

              <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">
                Community desk
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50/80 p-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-blue-700 hover:shadow-md hover:shadow-blue-900/10"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-950 hover:shadow-md hover:shadow-slate-900/10"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-700/30"
            >
              Get Started
              <FaChevronRight className="text-xs transition group-hover:translate-x-1" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-900/10 lg:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-slate-200 lg:hidden"
            >
              <div className="space-y-2 px-4 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                  className="flex items-center justify-between rounded-full px-4 py-3 text-sm font-bold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-blue-700 hover:shadow-md hover:shadow-blue-900/10"
                  >
                    {link.label}
                    <FaChevronRight className="text-xs text-slate-400" />
                  </a>
                ))}

                <div className="grid gap-2 pt-2 sm:grid-cols-2">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-full border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md hover:shadow-blue-900/10"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-700/30"
                  >
                    <FaChartLine className="text-sm" />
                    Register
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
