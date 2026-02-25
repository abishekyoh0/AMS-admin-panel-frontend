type SlotStatus = "Available" | "Occupied" | "Maintenance";
type VehicleType = "2W" | "4W";

type AssignedTo = {
  name: string;
  unit: string;
  vehicle: string;
};

type SlotCardProps = {
  id: string;
  status: SlotStatus;
  type: VehicleType;
  bikeIcon: string;
  carIcon: string;
  assignedTo?: AssignedTo;
  onEdit?: () => void;
};

export default function SlotCard({
  id,
  status,
  type,
  bikeIcon,
  carIcon,
  assignedTo,
  onEdit,
}: SlotCardProps) {
  const statusStyle = {
    Available: "bg-green-500/20 text-green-400",
    Occupied: "bg-red-500/20 text-red-400",
    Maintenance: "bg-yellow-500/20 text-yellow-400",
  }[status];

  const basement = id.startsWith("B1") ? "Basement 1" : "Basement 2";

  return (
    <div className="p-5 rounded-xl border border-white/10 bg-linear-to-br from-[#0F172A] to-[#020617] hover:border-purple-500/40 transition">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3
        ${type === "2W" ? "bg-green-500/20" : "bg-blue-500/20"}`}
      >
        <img
          src={type === "2W" ? bikeIcon : carIcon}
          className="w-5 h-5"
          alt="vehicle"
        />
      </div>

      <h3 className="font-semibold text-white">{id}</h3>
      <p className="text-xs text-gray-400">{basement}</p>

      <div className="flex gap-2 mt-2">
        <span className={`text-xs px-2 py-1 rounded ${statusStyle}`}>
          {status}
        </span>

        <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
          {type === "2W" ? "2-Wheeler" : "4-Wheeler"}
        </span>
      </div>

      {status === "Occupied" && assignedTo && (
        <div className="mt-3 text-xs text-gray-300 border-t border-white/10 pt-3 space-y-1">
          <p>Assigned To:</p>
          <p className="font-medium text-white">{assignedTo.name}</p>
          <p> {assignedTo.unit}</p>
          <p> {assignedTo.vehicle}</p>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="flex-1 py-2 rounded-lg text-sm font-medium text-white
          bg-linear-to-r from-blue-500 to-cyan-500
          shadow-md shadow-blue-500/20
          hover:scale-[1.02] transition"
        >
          Edit
        </button>

        <button
          className="w-10 py-2 rounded-lg text-white
          bg-red-500/20 border border-red-500/40
          hover:bg-red-500/30 transition"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
