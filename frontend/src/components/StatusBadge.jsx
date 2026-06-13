export default function StatusBadge({
  status,
}) {

  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    "In Progress":
      "bg-blue-100 text-blue-700",

    Resolved:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`
      px-4
      py-1
      rounded-full
      text-sm
      font-medium
      ${
        styles[status] ||
        "bg-slate-100 text-slate-700"
      }
    `}
    >
      {status}
    </span>
  );
}