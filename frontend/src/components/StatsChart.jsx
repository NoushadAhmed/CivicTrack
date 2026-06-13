import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatsChart({
  stats,
}) {
  const data = [
    {
      name: "Pending",
      value: stats.pending,
    },
    {
      name: "In Progress",
      value: stats.inProgress,
    },
    {
      name: "Resolved",
      value: stats.resolved,
    },
  ];

  const COLORS = [
    "#facc15",
    "#3b82f6",
    "#22c55e",
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow mt-8 h-[400px]">

      <h2 className="text-xl font-bold mb-6">
        Complaint Statistics
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
          >

            {data.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}