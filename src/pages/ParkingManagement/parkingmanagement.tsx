import Header from "../../components/ParkingManagement/header";
import StatusCard from "../../components/ParkingManagement/statuscard";
import RequestCard from "../../components/ParkingManagement/requestcard";
import pendingIcon from "../../assets/parking/pending.png";
import approvedIcon from "../../assets/parking/approved.png";
import suggested from "../../assets/parking/suggested.png";
import rejectIcon from "../../assets/parking/rejected.png";
import bike from "../../assets/parking/bike.png";
import car from "../../assets/parking/fourwheel.png";
import searchIcon from "../../assets/parking/search.png"
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";

export default function ParkingManagement() {
  const requests = [
  {
    name: "Emily Rodriguez",
    unit: "Unit C-108",
    role: "Owner",
    vehicleNo: "NY 5678 CD",
    date: "2026-02-18",
    vehicle: "Yamaha R15 V4",
    brand: "Yamaha",
    slot: "B1-M-025",
    type: "2W",
  },
  {
    name: "David Park",
    unit: "Unit A-501",
    role: "Tenant",
    vehicleNo: "NY 9012 EF",
    date: "2026-02-17",
    vehicle: "Tesla Model 3",
    brand: "Tesla",
    slot: "B2-A-110",
    type: "4W",
  },
  {
    name: "Kevin Brown",
    unit: "Unit B-104",
    role: "Owner",
    vehicleNo: "NY 3456 GH",
    date: "2026-02-16",
    vehicle: "BMW X5 2024",
    brand: "BMW",
    slot: "",
    type: "4W",
  },
];
  return (
    <div className="  text-white  space-y-6">
      <Header pending={3} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatusCard
          title="Pending"
          count={3}
          gradientFrom="#F0B1001A"
          gradientTo="#FE9A001A"
          borderColor="#FDC7004D"
          iconBg="#F0B10033"
          icon={pendingIcon}
           countColor="#FDC700"
        />

        <StatusCard
          title="Approved"
          count={1}
          gradientFrom="#00C9501A"
          gradientTo="#00BC7D1A"
          borderColor="#05DF724D"
          iconBg="#00C95033"
          icon={approvedIcon}
           countColor="#05DF72"
        />

        <StatusCard
          title="Suggested"
          count={0}
          gradientFrom="#2B7FFF1A"
          gradientTo="#00B8DB1A"
          borderColor="#51A2FF4D"
          iconBg="#2B7FFF33"
          icon={suggested}
           countColor="#51A2FF"
        />

        <StatusCard
          title="Rejected"
          count={0}
          gradientFrom="#FB2C361A"
          gradientTo="#FF20561A"
          borderColor="#FF64674D"
          iconBg="#FB2C3633"
          icon={rejectIcon}
           countColor="#FF6467"
        />

        <StatusCard
          title="2W Available"
          count={3}
          gradientFrom="#00C9501A"
          gradientTo="#00BBA71A"
          borderColor="#05DF724D"
          iconBg="#00C95033"
          icon={bike}
           countColor="#05DF72"
        />

        <StatusCard
          title="4W Available"
          count={3}
          gradientFrom="#2B7FFF1A"
          gradientTo="#615FFF1A"
          borderColor="#51A2FF4D"
          iconBg="#2B7FFF33"
          icon={car}
           countColor="#51A2FF"
        />
      </div>
      <div
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4
                border border-[#FFFFFF33]
                rounded-2xl
                p-4
                backdrop-blur-md
                bg-linear-to-r from-[#0F172B80] to-[#10182880]"
      >
       <div className="relative w-full max-w-152.5">

  <img
    src={searchIcon}
    alt="search"
    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60"
  />

  <input
    type="text"
    placeholder="Search by name, unit, vehicle..."
    className={`w-full h-13.75
               bg-[#FFFFFF0D]
               border border-[#FFFFFF1A]
               rounded-xl
               pl-12 pr-4
               text-sm text-white
               focus:outline-none focus:border-purple-500
               transition ${FONTSIZE[16]}`}
  style={{fontWeight:WEIGHT.four}}/>
</div>

        <div className="flex gap-3">
          <button
            className={`w-37 h-14.5
             rounded-[14px]
             bg-linear-to-r from-[#AD46FF] to-[#F6339A]
             text-white text-sm font-medium
             shadow-[#AD46FF40]
             cursor-pointer
             flex items-center justify-center
             transition hover:opacity-90 ${FONTSIZE[16]}`}
         style={{fontWeight:WEIGHT.seven,color:COLORS.primary_white}} >
            Pending
          </button>

          <button
            className={`w-39.25 h-13.75
             rounded-[14px]
             border-[1.75px] border-[#FFFFFF1A]
             bg-[#FFFFFF0D]
             text-gray-300 text-sm font-medium
             flex items-center justify-center
             cursor-pointer
             transition hover:bg-gray-800 ${FONTSIZE[16]}`}
         style={{fontWeight:WEIGHT.seven,color:COLORS.grey}} 
          >
            Processed
          </button>

          <button
            className={`w-25.75 h-13.75
             rounded-[14px]
             border-[1.75px] border-[#FFFFFF1A]
             bg-[#FFFFFF0D]
             text-gray-300 text-sm font-medium
             flex items-center justify-center
             cursor-pointer
             transition hover:bg-gray-800 ${FONTSIZE[16]}`}
         style={{fontWeight:WEIGHT.seven,color:COLORS.grey}} 
          >
            All
          </button>
        </div>
      </div>

      <div className="space-y-4">
  {requests.map((req, index) => (
    <RequestCard
      key={index}
      name={req.name}
      unit={req.unit}
      role={req.role}
      vehicleNo={req.vehicleNo}
      date={req.date}
      vehicle={req.vehicle}
      brand={req.brand}
      slot={req.slot}
      type={req.type as "2W" | "4W"}
    />
  ))}
</div>
    </div>
  );
}
