type Status = "operational" | "degraded" | "offline" | "demo" | "configured" | "not-monitored" | "implemented" | "designed";

type StatusBadgeProps = {
  label: string;
  status: Status;
};

const statusStyles: Record<Status, string> = {
  operational: "bg-green-50 text-green-700 border-green-200",
  degraded: "bg-yellow-50 text-yellow-800 border-yellow-200",
  offline: "bg-red-50 text-red-700 border-red-200",
  demo: "bg-gray-100 text-gray-700 border-gray-200",
  configured: "bg-blue-50 text-blue-700 border-blue-200",
  "not-monitored": "bg-gray-100 text-gray-700 border-gray-200",
  implemented: "bg-green-50 text-green-700 border-green-200",
  designed: "bg-blue-50 text-blue-700 border-blue-200",
};

const statusLabels: Record<Status, string> = {
  operational: "Operational",
  degraded: "Degraded",
  offline: "Offline",
  demo: "Demo",
  configured: "Configured",
  "not-monitored": "Not monitored",
  implemented: "Implemented",
  designed: "Architecture design",
};

const StatusBadge = ({ label, status }: StatusBadgeProps) => (
  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
    <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
    <span>{label}: {statusLabels[status]}</span>
  </span>
);

export default StatusBadge;
