import { COLORS, FONTSIZE, WEIGHT } from "../../../constent/uiconstent";
import edit from "../../../assets/parking/editprakingnbutton.png"
import deleteIcon from "../../../assets/parking/deleteicon.png"

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
  onDelete?: () => void;
};

export default function SlotCard({
  id,
  status,
  type,
  bikeIcon,
  carIcon,
  assignedTo,
  onEdit,
  onDelete,
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

      <h3 className={`font-semibold text-white ${FONTSIZE[20]}`}
                            style={{ fontWeight: WEIGHT.seven,color:COLORS.primary_white }}>{id}</h3>
      <p className="text-xs text-gray-400">{basement}</p>

      <div className="flex gap-2 mt-2">
        <span className={`text-xs px-2 py-1 rounded ${statusStyle}${FONTSIZE[12]}`}
        style={{ fontWeight: WEIGHT.seven }}>
          {status}
        </span>

        <span className={`text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 ${FONTSIZE[12]}`}
        style={{ fontWeight: WEIGHT.six,color:COLORS.grey }}>
          {type === "2W" ? "2-Wheeler" : "4-Wheeler"}
        </span>
      </div>

      {status === "Occupied" && assignedTo && (
        <div className="mt-3 text-xs text-gray-300 border-t border-white/10 pt-3 space-y-1">
          <p className={`${FONTSIZE[12]}`}
        style={{ fontWeight: WEIGHT.four,color:COLORS.grey }}>Assigned To:</p>
          <p className={`font-medium text-white ${FONTSIZE[14]}`}
        style={{ fontWeight: WEIGHT.seven,color:COLORS.primary_white }}>{assignedTo.name}</p>
          <p className={`${FONTSIZE[12]}`}
        style={{ fontWeight: WEIGHT.four,color:COLORS.grey }}> {assignedTo.unit}</p>
          <p className={`${FONTSIZE[12]}`}
        style={{ fontWeight: WEIGHT.four,color:COLORS.grey }}> {assignedTo.vehicle}</p>
        </div>
      )}

      <div className="flex gap-2 mt-4">
       <button
  onClick={onEdit}
  className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-lg text-sm font-medium
  bg-linear-to-r from-[#2B7FFF] to-[#0092B8]
  shadow-md shadow-[#2B7FFF40] cursor-pointer
  hover:scale-[1.02] transition ${FONTSIZE[14]}`}
  style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
>
  <img src={edit} alt="Edit icon" className="w-4 h-4 sm:w-6 sm:h-6" />
  Edit
</button>

        <button
  onClick={onDelete}
  className="flex items-center justify-center w-10 py-2 rounded-lg
  bg-linear-to-r from-[#FB2C36] to-[#EC003F]
  shadow-md shadow-[#FB2C3640]
  hover:scale-105 transition cursor-pointer"
>
  <img
    src={deleteIcon}
    alt="Delete"
    className="w-4 h-4 sm:w-6 sm:h-6"
  />
</button>
      </div>
    </div>
  );
}
