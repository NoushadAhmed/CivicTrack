import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowDown,
  FaArrowRight,
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaLock,
  FaRoute,
  FaSearch,
  FaShieldAlt,
  FaTasks,
  FaUserCheck,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: FaClipboardList,
    title: "Easy Reporting",
    text: "Citizens can submit issues quickly, add details, and attach proof without a complicated workflow.",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    icon: FaChartLine,
    title: "Real-time Tracking",
    text: "Every complaint gets clear status updates so citizens, officers, and admins always know what is next.",
    accent: "from-indigo-500 to-purple-600",
  },
  {
    icon: FaTasks,
    title: "Faster Resolution",
    text: "Officers get organized queues, better context, and cleaner handoffs from assignment to completion.",
    accent: "from-emerald-500 to-teal-600",
  },
];

const processSteps = [
  { title: "Submit", text: "Citizen reports an issue", icon: FaClipboardList },
  { title: "Review", text: "Admin verifies details", icon: FaSearch },
  { title: "Assign", text: "Officer gets assigned", icon: FaRoute },
  { title: "Resolve", text: "Issue gets resolved", icon: FaCheckCircle },
];

const reasons = [
  {
    icon: FaUserCheck,
    title: "Simple For Everyone",
    text: "A centered, focused experience keeps citizens, officers, and admins moving without extra clutter.",
  },
  {
    icon: FaShieldAlt,
    title: "Transparent By Design",
    text: "Each complaint carries visible ownership, progress, and status history across the platform.",
  },
  {
    icon: FaRoute,
    title: "Smart Routing",
    text: "Complaints can be reviewed and assigned to the right officer with less manual coordination.",
  },
  {
    icon: FaLock,
    title: "Role-based Access",
    text: "Citizens, officers, and administrators see the tools that match their responsibility.",
  },
];

const impact = [
  ["500+", "Complaints Handled"],
  ["92%", "Resolution Rate"],
  ["24", "Active Officers"],
  ["10+", "Communities"],
];

const testimonials = [
  [
    "CivicTrack transformed how our community handles complaints. It is faster, clearer, and easier to trust.",
    "Sarah Johnson, Citizen",
  ],
  [
    "The dashboard gives me the context I need before I start work. That makes resolution much smoother.",
    "Mike Chen, Officer",
  ],
  [
    "The reporting flow and analytics help our team see patterns and improve response times.",
    "Emily Rodriguez, Administrator",
  ],
];

const floatingShapes = [
  {
    className: "left-[7%] top-[18%] h-28 w-28 border-cyan-400/45",
    animate: { y: [0, -36, 0], rotateX: [18, 66, 18], rotateY: [12, 78, 12] },
    duration: 13,
  },
  {
    className: "right-[10%] top-[28%] h-36 w-36 border-indigo-400/35",
    animate: { y: [0, 42, 0], rotateX: [62, 18, 62], rotateZ: [0, 26, 0] },
    duration: 15,
  },
  {
    className: "left-[12%] top-[58%] h-24 w-24 border-emerald-400/35",
    animate: { y: [0, 30, 0], rotateY: [0, 96, 0], rotateZ: [18, -18, 18] },
    duration: 12,
  },
  {
    className: "right-[16%] top-[72%] h-32 w-32 border-sky-400/35",
    animate: { y: [0, -34, 0], rotateX: [24, 82, 24], rotateY: [72, 12, 72] },
    duration: 16,
  },
];

function Floating3DBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-depth-grid"
      style={{ perspective: 900 }}
    >
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.className}
          className={`absolute rounded-2xl border bg-white/10 shadow-2xl shadow-blue-900/10 backdrop-blur-sm ${shape.className}`}
          style={{ transformStyle: "preserve-3d" }}
          animate={shape.animate}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span
            className="absolute inset-3 rounded-xl border border-white/60 bg-white/15"
            style={{ transform: "translateZ(34px)" }}
          />
          <span
            className="absolute inset-6 rounded-lg border border-blue-300/45"
            style={{ transform: "translateZ(-28px) rotateY(180deg)" }}
          />
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/25"
        animate={{ rotateX: [65, 65], rotateZ: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/20"
        animate={{ rotateX: [72, 72], rotateZ: [360, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      />
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // remove token from URL
      window.history.replaceState({}, document.title, "/");

      navigate("/citizen");
    }
  }, [navigate]);

  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const SectionHeading = ({ title, subtitle }) => (
    <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
      <h2 className="font-display text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          {subtitle}
        </p>
      )}
    </motion.div>
  );

  return (
    <>
      <Navbar />

      <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-cyan-50 to-blue-100 text-slate-950">
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 -z-20 opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(34, 211, 238, 0.16), rgba(59, 130, 246, 0.12), rgba(168, 85, 247, 0.12), rgba(14, 165, 233, 0.14))",
            backgroundSize: "300% 300%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 60%", "0% 0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 -z-10 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.7) 38%, transparent 68%), linear-gradient(45deg, rgba(14,165,233,0.08) 0%, transparent 52%, rgba(99,102,241,0.08) 100%)",
            backgroundSize: "220% 220%",
          }}
          animate={{ backgroundPosition: ["0% 40%", "100% 50%", "0% 40%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <Floating3DBackground />

        <section className="relative flex min-h-screen items-center px-6 pb-20 pt-36">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="mx-auto flex max-w-5xl flex-col items-center text-center"
          >
            <motion.span
              className="inline-flex items-center rounded-full border border-cyan-200 bg-white/75 px-4 py-2 text-sm font-black text-blue-700 shadow-lg shadow-cyan-500/10 backdrop-blur"
              whileHover={{ y: -2, scale: 1.03 }}
            >
              Smart Community Management
            </motion.span>

            <h1 className="font-display mt-7 text-6xl font-black leading-none tracking-normal text-slate-950 sm:text-7xl lg:text-8xl">
              Report.
              <br />
              Track.
              <br />
              Resolve.
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              CivicTrack helps citizens, officers, and administrators manage
              complaints transparently, efficiently, and professionally.
            </p>

            <div className="mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
              <motion.button
                type="button"
                onClick={() => navigate("/register")}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-8 py-4 text-base font-black text-white shadow-xl shadow-slate-950/20 transition hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-700/30"
                whileHover={{ y: -5, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
                <FaArrowRight className="text-sm transition group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                type="button"
                onClick={scrollToFeatures}
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-blue-200 bg-white/80 px-8 py-4 text-base font-black text-blue-700 shadow-lg shadow-cyan-500/10 backdrop-blur transition hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-cyan-500/20"
                whileHover={{ y: -5, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
                <FaArrowDown className="text-sm transition group-hover:translate-y-1" />
              </motion.button>
            </div>
          </motion.div>
        </section>

        <section id="features" ref={featuresRef} className="scroll-mt-28 px-6 py-24">
          <motion.div
            className="mx-auto max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <SectionHeading
              title="Powerful Features"
              subtitle="Everything you need to manage complaints efficiently from submission to resolution."
            />

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.025, rotateX: 2 }}
                    className="rounded-[2rem] border border-white/90 bg-gradient-to-br from-white/95 via-cyan-50/80 to-blue-50/80 p-8 text-center shadow-2xl shadow-blue-900/10 backdrop-blur-xl transition-colors hover:border-cyan-200"
                  >
                    <div
                      className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg shadow-blue-500/20`}
                    >
                      <Icon className="text-xl" />
                    </div>
                    <h3 className="font-display mt-6 text-2xl font-black text-slate-950">
                      {feature.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-slate-600">
                      {feature.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section id="process" className="scroll-mt-28 px-6 py-24">
          <motion.div
            className="mx-auto max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <SectionHeading title="How It Works" />

            <div className="mt-16 grid gap-6 md:grid-cols-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.025, rotateX: 2 }}
                    className="rounded-[1.75rem] border border-white/90 bg-gradient-to-br from-white/95 via-sky-50/80 to-cyan-50/70 p-7 text-center shadow-xl shadow-blue-900/10 backdrop-blur-xl transition-colors hover:border-blue-200"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-500/20">
                      <Icon className="text-xl" />
                    </div>
                    <div className="mt-5 text-sm font-black uppercase text-blue-600">
                      Step {index + 1}
                    </div>
                    <h3 className="font-display mt-2 text-xl font-black text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{step.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section className="px-6 py-24">
          <motion.div
            className="mx-auto max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <SectionHeading
              title="Why Choose CivicTrack?"
              subtitle="A cleaner way to coordinate community complaints without losing accountability."
            />

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {reasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <motion.div
                    key={reason.title}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02, rotateX: 2 }}
                    className="rounded-[2rem] border border-white/90 bg-gradient-to-br from-white/95 via-blue-50/75 to-indigo-50/70 p-8 text-center shadow-xl shadow-blue-900/10 backdrop-blur-xl transition-colors hover:border-indigo-200"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-inner shadow-blue-100">
                      <Icon className="text-xl" />
                    </div>
                    <h3 className="font-display mt-5 text-2xl font-black text-slate-950">
                      {reason.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600">
                      {reason.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section id="impact" className="scroll-mt-28 px-6 py-24">
          <motion.div
            className="mx-auto max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <SectionHeading title="Our Impact" />

            <div className="mt-16 grid gap-6 md:grid-cols-4">
              {impact.map(([value, label]) => (
                <motion.div
                  key={label}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.025, rotateX: 2 }}
                  className="rounded-[2rem] border border-white/90 bg-gradient-to-br from-white/95 via-cyan-50/80 to-sky-50/75 p-8 text-center shadow-2xl shadow-blue-900/10 backdrop-blur-xl transition-colors hover:border-cyan-200"
                >
                  <h3 className="font-display text-5xl font-black text-blue-700 lg:text-6xl">
                    {value}
                  </h3>
                  <p className="mt-4 font-bold text-slate-600">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="px-6 py-24">
          <motion.div
            className="mx-auto max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <SectionHeading
              title="What Users Say"
              subtitle="Trusted by community leaders, citizens, and response teams."
            />

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {testimonials.map(([quote, author]) => (
                <motion.div
                  key={author}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.025, rotateX: 2 }}
                  className="rounded-[2rem] border border-white/90 bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/75 p-8 text-center shadow-xl shadow-blue-900/10 backdrop-blur-xl transition-colors hover:border-blue-200"
                >
                  <p className="leading-relaxed text-slate-700">"{quote}"</p>
                  <p className="mt-5 font-black text-blue-700">{author}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.35 }}
            className="mx-auto max-w-5xl rounded-[2.25rem] border border-white/90 bg-gradient-to-br from-white/95 via-cyan-50/85 to-blue-50/80 p-8 text-center shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:p-12"
          >
            <h2 className="font-display text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Ready to Transform Your Community?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Start with a cleaner complaint workflow and give every issue a
              visible path from report to resolution.
            </p>

            <motion.button
              type="button"
              onClick={() => navigate("/register")}
              className="group mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 px-10 py-4 text-base font-black text-white shadow-xl shadow-blue-700/20 transition hover:from-blue-600 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-700/30"
              whileHover={{ y: -5, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started Now
              <FaArrowRight className="text-sm transition group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </section>

        <footer className="border-t border-white/70 bg-white/55 px-6 py-10 backdrop-blur">
          <div className="mx-auto grid max-w-7xl gap-8 text-center md:grid-cols-4 md:text-left">
            <div>
              <h3 className="font-display text-2xl font-black text-slate-950">CivicTrack</h3>
              <p className="mt-3 text-sm text-slate-600">
                Smart community complaint management platform.
              </p>
            </div>

            <div>
              <h4 className="font-black text-slate-950">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#features" className="transition hover:text-blue-700">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#process" className="transition hover:text-blue-700">
                    Process
                  </a>
                </li>
                <li>
                  <a href="#impact" className="transition hover:text-blue-700">
                    Impact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-slate-950">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>About</li>
                <li>Contact</li>
                <li>Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-slate-950">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-7xl border-t border-slate-200/80 pt-6 text-center text-sm text-slate-500">
            Copyright 2026 CivicTrack. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
