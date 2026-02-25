import bikeImg from "../../assets/parking/bike.png"
import car from "../../assets/parking/car.png"
import unitIcon from "../../assets/parking/unit.png"
import userIcon from "../../assets/parking/user.png"
import vehicleIcon from "../../assets/parking/carwhite.png"
import calendarIcon from "../../assets/parking/calender.png"
import rejectIcon from "../../assets/parking/close.png"
import suggestIcon from "../../assets/parking/sugesswhite.png" 
import approveIcon from "../../assets/parking/approvewhite.png"
import ApproveModal from "./approvemodel"
import { useState } from "react"
import SuggestAlternativeModal from "./suggestmodel"
import RejectModal from "./rejectmodel"
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent"

const SAMPLE_4W_SLOTS = [
  { id: "B2-A-104", basement: "Basement 2", occupied: true,  occupant: { name: "Sarah Johnson", unit: "Unit A-304", vehicle: "Honda Civic 2023" } },
  { id: "B2-A-105", basement: "Basement 2", occupied: false },
  { id: "B2-A-110", basement: "Basement 2", occupied: true,  occupant: { name: "Michael Smith", unit: "Unit B-202", vehicle: "Toyota Camry (NY 2222 BB)" } },
  { id: "B2-A-112", basement: "Basement 2", occupied: false },
  { id: "B2-A-115", basement: "Basement 2", occupied: false },
];

const SAMPLE_2W_SLOTS = [
  { id: "B1-M-020", basement: "Basement 1", occupied: false },
  { id: "B1-M-025", basement: "Basement 1", occupied: false },
  { id: "B1-M-028", basement: "Basement 1", occupied: false },
];
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
   const [modalOpen, setModalOpen] = useState(false);
   const [suggestOpen, setSuggestOpen] = useState(false);
   const [rejectOpen, setRejectOpen] = useState(false);


  
    const slots = type === "4W" ? SAMPLE_4W_SLOTS : SAMPLE_2W_SLOTS;
  
    function handleConfirm(selectedSlot: string) {
      console.log(`Approved! Assigned slot: ${selectedSlot}`);
      setModalOpen(false);
    }

    function handleSuggestSubmit(selectedSlot: string, message: string) {
  console.log("Suggested Slot:", selectedSlot);
  console.log("Message:", message);
  setSuggestOpen(false);
}
  return (
   <div className="rounded-xl p-px border border-[#F0B1004D] bg-linear-to-r from-[#0F172B80] to-[#10182880]">
  <div className="rounded-xl p-5 space-y-4">

    <div className="flex gap-4 items-start">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center
        ${type === "2W"
          ? "bg-[#00C95033] border border-[#05DF724D]"
          : "bg-[#2B7FFF33] border border-[#51A2FF4D]"}`}
      >
        <img
          src={type === "2W" ? bikeImg : car}
          alt="vehicle"
          className="w-6 h-6 object-contain"
        />
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`text-white font-semibold text-lg ${FONTSIZE[20]}`}
                   style={{fontWeight:WEIGHT.seven,color:COLORS.primary_white}} >{name}</h3>

          <span className={`inline-flex items-center justify-center px-3 h-7 text-xs rounded-[10px] border-[1.75px] border-[#F0B1004D] bg-[#F0B10033] text-[#FDC700] ${FONTSIZE[12]}`}
         style={{fontWeight:WEIGHT.seven}} >
            Pending
          </span>

          <span className={`inline-flex items-center justify-center px-3 h-6 text-xs rounded-[10px] bg-[#FFFFFF1A] text-[#99A1AF] ${FONTSIZE[12]}`}
         style={{fontWeight:WEIGHT.six}} >
            {type === "2W" ? "2-Wheeler" : "4-Wheeler"}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-1">
          <span className={`flex items-center gap-1 ${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.four,color:COLORS.grey}} >
            <img src={unitIcon} className="w-4 h-4 opacity-70" />
            {unit}
          </span>

          <span className={`flex items-center gap-1 ${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.four,color:COLORS.grey}}>
            <img src={userIcon} className="w-4 h-4 opacity-70" />
            {role}
          </span>

          <span className={`flex items-center gap-1 ${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.four,color:COLORS.grey}}>
            <img src={vehicleIcon} className="w-4 h-4 opacity-70" />
            {vehicleNo}
          </span>

          <span className={`flex items-center gap-1 ${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.four,color:COLORS.grey}}>
            <img src={calendarIcon} className="w-4 h-4 opacity-70" />
            {date}
          </span>
        </div>
      </div>
    </div>

<div className="md:ml-16">
  <div
    className="
      w-full
      rounded-[14px]
      border border-white/10
      bg-white/5
      px-4 sm:px-5
      py-3
      text-xs sm:text-sm
      text-gray-300

      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-3
      items-center
    "
  >
    <span className={`truncate ${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.four,color:COLORS.grey}}>
      Request ID:
      <span className={`${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.six,color:COLORS.primary_white}}> PR-001 </span>
    </span>

    <span className={`truncate ${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.four,color:COLORS.grey}}>
      Vehicle Model: 
      <span className={`${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.six,color:COLORS.primary_white}}>{vehicle}</span>
    </span>

    <span className={`truncate ${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.four,color:COLORS.grey}}>
      Brand: 
      <span className={`${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.six,color:COLORS.primary_white}}>{brand} </span>
    </span>

    {slot && (
      <span className={`lg:text-right text-purple-400 font-medium truncate ${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.six}}>
        <span className={`text-gray-300 ${FONTSIZE[14]}`}
                   style={{fontWeight:WEIGHT.four}}>Preferred slot:</span> ⭐ {slot}
      </span>
    )}
  </div>
</div>

<div className="md:ml-16 mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
  
  <button
    onClick={() => setModalOpen(true)}
    className={`h-12 flex items-center justify-center gap-2 rounded-[14px]
    text-white font-medium text-sm
    bg-linear-to-r from-[#00C950] to-[#009966]
    shadow-lg shadow-[#00C95040]
    hover:scale-[1.02] transition-all duration-200 cursor-pointer ${FONTSIZE[16]}`}
                   style={{fontWeight:WEIGHT.seven,color:COLORS.primary_white}}
  >
    <img src={approveIcon} className="w-4 h-4" />
    Approve Request
  </button>

  <button
    onClick={() => setSuggestOpen(true)}
    className={`h-12 flex items-center justify-center gap-2 rounded-[14px]
    text-white font-medium text-sm
    bg-linear-to-r from-[#2B7FFF] to-[#0092B8]
    shadow-lg shadow-[#2B7FFF40]
    hover:scale-[1.02] transition cursor-pointer ${FONTSIZE[16]}`}
                   style={{fontWeight:WEIGHT.seven,color:COLORS.primary_white}}
  >
    <img src={suggestIcon} className="w-4 h-4" />
    Suggest Alternative
  </button>

  <button
    onClick={() => setRejectOpen(true)}
    className={`h-12 flex items-center justify-center gap-2 rounded-[14px]
    text-white font-medium text-sm
    bg-linear-to-r from-[#FB2C36] to-[#EC003F]
    shadow-lg shadow-[#FB2C3640]
    hover:scale-[1.02] transition cursor-pointer  ${FONTSIZE[16]}`}
                   style={{fontWeight:WEIGHT.seven,color:COLORS.primary_white}}
  >
    <img src={rejectIcon} className="w-4 h-4" />
    Reject
  </button>

</div>
  </div>

  <ApproveModal
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    onConfirm={handleConfirm}
    requesterName={name}
    requesterUnit={unit}
    vehicleType={type}
    vehicleModel={vehicle}
    vehicleNumber={vehicleNo}
    preferredSlot={slot ?? slots[0].id}
    slots={slots}
  />

  <SuggestAlternativeModal
    isOpen={suggestOpen}
    onClose={() => setSuggestOpen(false)}
    onSubmit={handleSuggestSubmit}
    requesterName={name}
    requesterUnit={unit}
    vehicleType={type}
    vehicleNumber={vehicleNo}
    vehicleModel={vehicle}
    preferredSlot={slot ?? slots[0].id}
    slots={slots}
  />

  <RejectModal
    isOpen={rejectOpen}
    onClose={() => setRejectOpen(false)}
    onConfirm={(reason) => {
      console.log("Rejected Reason:", reason);
      setRejectOpen(false);
    }}
    requesterName={name}
    requesterUnit={unit}
    vehicleType={type}
    vehicleNumber={vehicleNo}
    vehicleModel={vehicle}
  />
</div>
  );
}

