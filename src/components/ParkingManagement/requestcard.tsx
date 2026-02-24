import bikeImg from "../../assets/parking/bike.png"
import car from "../../assets/parking/car.png"
import unitIcon from "../../assets/parking/unit.png"
import userIcon from "../../assets/parking/user.png"
import vehicleIcon from "../../assets/parking/carwhite.png"
import calendarIcon from "../../assets/parking/calender.png"
import rejectIcon from "../../assets/parking/close.png"
import suggestIcon from "../../assets/parking/sugesswhite.png" 
import approveIcon from "../../assets/parking/approvewhite.png"
type Props = {
  name: string;
  unit: string;
  role: string;
  vehicleNo: string;
  date: string;
  vehicle: string;
  brand: string;
  slot?: string;
  type: "2W" | "4W";
};

export default function RequestCard({
  name,
  unit,
  role,
  vehicleNo,
  date,
  vehicle,
  brand,
  slot,
  type,
}: Props) {
  return (
    <div className="rounded-xl p-px bg-linear-to-r from-yellow-400/40 to-transparent">
      <div className="rounded-xl p-5 space-y-4
                      bg-linear-to-r from-[#0B1324] to-[#0F1B3D]">

        <div className="flex gap-4 items-start">

          <div
  className={`w-12 h-12 rounded-xl flex items-center justify-center
    ${type === "2W"
      ? "bg-green-500/20"
      : "bg-blue-500/20"}`}
>
  <img
    src={type === "2W" ? bikeImg : car}
    alt="vehicle"
    className="w-6 h-6 object-contain"
  />
</div>

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-white font-semibold text-lg">{name}</h3>

              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
                Pending
              </span>

              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                {type === "2W" ? "2-Wheeler" : "4-Wheeler"}
              </span>
            </div>

           <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-1">

  <span className="flex items-center gap-1">
    <img src={unitIcon} className="w-4 h-4 opacity-70" />
    {unit}
  </span>

  <span className="flex items-center gap-1">
    <img src={userIcon} className="w-4 h-4 opacity-70" />
    {role}
  </span>

  <span className="flex items-center gap-1">
    <img src={vehicleIcon} className="w-4 h-4 opacity-70" />
    {vehicleNo}
  </span>

  <span className="flex items-center gap-1">
    <img src={calendarIcon} className="w-4 h-4 opacity-70" />
    {date}
  </span>

</div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-gray-300 flex flex-wrap gap-6">
          <span>Request ID: PR-001</span>
          <span>Vehicle Model: {vehicle}</span>
          <span>Brand: {brand}</span>

          {slot && (
            <span className="ml-auto text-purple-400 font-medium">
              ⭐ {slot}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

  <button
    className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg
               text-white font-medium text-sm
               bg-linear-to-r from-green-500 to-emerald-500
               shadow-lg shadow-green-500/20 hover:scale-[1.02]
               transition"
  >
    <img src={approveIcon} alt="approve" className="w-4 h-4" />
    Approve Request
  </button>

  <button
    className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg
               text-white font-medium text-sm
               bg-linear-to-r from-blue-500 to-cyan-500
               shadow-lg shadow-blue-500/20 hover:scale-[1.02]
               transition"
  >
    <img src={suggestIcon} alt="suggest" className="w-4 h-4" />
    Suggest Alternative
  </button>

  <button
    className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg
               text-white font-medium text-sm
               bg-linear-to-r from-red-500 to-pink-500
               shadow-lg shadow-red-500/20 hover:scale-[1.02]
               transition"
  >
    <img src={rejectIcon} alt="reject" className="w-4 h-4" />
    Reject
  </button>

</div>

      </div>
    </div>
  );
}