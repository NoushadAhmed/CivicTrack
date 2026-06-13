import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="min-h-screen relative">
      {/* Premium 3D background */}
      <div className="absolute inset-0 -z-10 bg-depth-grid opacity-100" />


      <Sidebar />

      <main
        className="
          md:ml-72
          pt-20
          md:pt-8
          p-6
        "
      >
        {children}
      </main>
    </div>
  );
}