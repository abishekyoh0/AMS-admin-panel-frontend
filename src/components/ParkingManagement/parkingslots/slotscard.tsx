import deleteicon from "../../assets/parking/deleteicon.png"
import editicon from "../../assets/parking/editicon.png"
import approved from "../../assets/parking/approved.png";
import unit from "../../assets/parking/unit.png";
import location from "../../assets/parking/location.png";
import close1 from "../../assets/parking/close1.png";

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
<<<<<<< HEAD:src/components/ParkingManagement/slotscard.tsx
  
=======
  onEdit,
>>>>>>> 4ed5a7e97d6ed25b73ce4d61b56aba3a550cadf5:src/components/ParkingManagement/parkingslots/slotscard.tsx
}: SlotCardProps) {
  const statusStyle = {
    Available: "bg-[#00C95033] text-[#05DF72] border border-[#00C9504D]",
    Maintenance: "bg-[#F0B10033] border border-[#F0B1004D] text-[#FDC700]",
    Occupied: "bg-[#FB2C3633] border border-[#FB2C364D] text-[#FF6467]",
  }[status];

const cardStyle = {
  Available:
    "border border-[#00C9504D] hover:border-[#00C95099]",
  Maintenance:
    "border border-[#F0B1004D] hover:border-[#FDC700]",
  Occupied: 
    "border border-[#FB2C364D] hover:border-[#FF6467]",
}[status];

  const basement = id.startsWith("B1") ? "Basement 1" : "Basement 2";

  return (
<<<<<<< HEAD:src/components/ParkingManagement/slotscard.tsx
    <div
  className={`p-5 rounded-xl
              bg-linear-to-br from-[#0F172A] to-[#020617]
              transition
              ${cardStyle}`}
>
=======
    <div className="p-5 rounded-xl border border-white/10 bg-linear-to-br from-[#0F172A] to-[#020617] hover:border-purple-500/40 transition">
>>>>>>> 4ed5a7e97d6ed25b73ce4d61b56aba3a550cadf5:src/components/ParkingManagement/parkingslots/slotscard.tsx
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
      <p className="flex items-center gap-1 text-xs text-gray-400">
  <img
    src={unit}
    alt="basement"
    className="w-3 h-3 object-contain"
  />
  {basement}
</p>

      <div className="flex gap-2 mt-2">
      <span
  className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg ${statusStyle}`}
>
  {status === "Available" && (
    <img src={approved} alt="approved" className="w-4 h-4" />
  )}

  {status === "Maintenance" && (
    <img src={location} alt="maintenance" className="w-4 h-4" />
  )}

  {status === "Occupied" && (
    <img src={close1} alt="occupied" className="w-4 h-4" />
  )}

  {status}
</span>

        <span className="text-xs px-2 py-1 rounded-lg bg-[#FFFFFF1A] text-[#99A1AF]">
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
<<<<<<< HEAD:src/components/ParkingManagement/slotscard.tsx
       <button
  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white
  bg-linear-to-r from-[#2B7FFF] to-[#0092B8]
  shadow-md shadow-blue-500/20
  hover:scale-[1.02] transition"
>
  <img 
    src={editicon} 
    alt="Edit"
    className="w-4 h-4"
  />
  Edit
</button>
=======
        <button
          onClick={onEdit}
          className="flex-1 py-2 rounded-lg text-sm font-medium text-white
          bg-linear-to-r from-blue-500 to-cyan-500
          shadow-md shadow-blue-500/20
          hover:scale-[1.02] transition"
        >
          Edit
        </button>
>>>>>>> 4ed5a7e97d6ed25b73ce4d61b56aba3a550cadf5:src/components/ParkingManagement/parkingslots/slotscard.tsx

        <button
          className="w-12 py-2 rounded-lg text-white
          bg-linear-to-r from-[#FB2C36] to-[#EC003F] border border-red-500/40
          hover:bg-red-500/30 transition"
        >
          <img className="w-4 h-4 ml-3.5" src={deleteicon} alt="delete" />
        </button>
      </div>
    </div>
  );
}
