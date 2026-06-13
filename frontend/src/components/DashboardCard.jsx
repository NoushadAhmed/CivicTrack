import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  color,
}) {


  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
        rotateX: 2,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative rounded-[28px] border border-white/70 bg-white/60 p-8 shadow-[0_18px_70px_-35px_rgba(59,130,246,0.40)] backdrop-blur-xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background:
            "radial-gradient(650px circle at var(--x,50%) var(--y,0%), rgba(56,189,248,0.28), transparent 55%)",
          transform: "translateZ(18px)",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty("--x", x + "%");
          e.currentTarget.style.setProperty("--y", y + "%");
        }}
      />

      <p className="relative z-10 text-slate-600 text-sm font-semibold">
        {title}
      </p>

      <h2
        className={`relative z-10 text-5xl font-black mt-4 ${color} tracking-tight`}
      >
        {value}
      </h2>
    </motion.div>
  );
}