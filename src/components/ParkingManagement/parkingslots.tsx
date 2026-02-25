import StatusCard from "./statuscard";
import pendingIcon from "../../assets/parking/pending.png";
import approvedIcon from "../../assets/parking/approved.png";
import suggested from "../../assets/parking/suggested.png";
import rejectIcon from "../../assets/parking/rejected.png";
import bike from "../../assets/parking/bike.png";
import car from "../../assets/parking/fourwheel.png";
import SlotCard from "./slotscard";

type SlotStatus = "Available" | "Occupied" | "Maintenance";
type VehicleType = "2W" | "4W";

type Slot = {
  id: string;
  status: SlotStatus;
  type: VehicleType;
  assignedTo?: {
    name: string;
    unit: string;
    vehicle: string;
  };
};

const slots: Slot[] = [
  { id: "B1-M-020", status: "Available", type: "2W" },
  { id: "B1-M-025", status: "Available", type: "2W" },
  { id: "B1-M-028", status: "Maintenance", type: "2W" },
  { id: "B1-M-030", status: "Occupied", type: "2W" },
  { id: "B2-A-104", status: "Occupied", type: "4W" },
  { id: "B2-A-105", status: "Available", type: "4W" },
  { id: "B1-M-020", status: "Available", type: "2W" },

  {
    id: "B1-M-025",
    status: "Occupied",
    type: "2W",
    assignedTo: {
      name: "Emily Rodriguez",
      unit: "Unit C-108",
      vehicle: "Yamaha R15 V4",
    },
  },

  { id: "B1-M-028", status: "Maintenance", type: "2W" },

  {
    id: "B2-A-104",
    status: "Occupied",
    type: "4W",
    assignedTo: {
      name: "David Park",
      unit: "Unit A-501",
      vehicle: "Tesla Model 3",
    },
  },
];

export default function ParkingSlots() {
  return (
    <div className="text-white space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Parking Slot Management</h2>
          <p className="text-gray-400 text-sm">
            Create and manage parking slots
          </p>
        </div>

        <button
          className="px-5 py-2 rounded-xl
                           bg-linear-to-r from-purple-500 to-pink-500
                           text-sm font-medium shadow-lg"
        >
          + Create New Slot
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatusCard
          title="Total Slots"
          count={9}
          gradientFrom="#F0B1001A"
          gradientTo="#FE9A001A"
          borderColor="#FDC7004D"
          iconBg="#F0B10033"
          icon={pendingIcon}
          countColor="#FDC700"
        />

        <StatusCard
          title="Available"
          count={5}
          gradientFrom="#00C9501A"
          gradientTo="#00BC7D1A"
          borderColor="#05DF724D"
          iconBg="#00C95033"
          icon={approvedIcon}
           countColor="#FDC700"
          
        />

        <StatusCard
          title="Occupied"
          count={3}
          gradientFrom="#2B7FFF1A"
          gradientTo="#00B8DB1A"
          borderColor="#51A2FF4D"
          iconBg="#2B7FFF33"
          icon={suggested}
           countColor="#FDC700"
        />

        <StatusCard
          title="Maintenance"
          count={1}
          gradientFrom="#FB2C361A"
          gradientTo="#FF20561A"
          borderColor="#FF64674D"
          iconBg="#FB2C3633"
          icon={rejectIcon}
           countColor="#FDC700"
        />

        <StatusCard
          title="2-Wheeler"
          count={4}
          gradientFrom="#00C9501A"
          gradientTo="#00BBA71A"
          borderColor="#05DF724D"
          iconBg="#00C95033"
          icon={bike}
           countColor="#FDC700"
        />

        <StatusCard
          title="4-Wheeler"
          count={5}
          gradientFrom="#2B7FFF1A"
          gradientTo="#615FFF1A"
          borderColor="#51A2FF4D"
          iconBg="#2B7FFF33"
          icon={car}
           countColor="#FDC700"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-3 border border-white/10 p-4 rounded-2xl">
        <input
          placeholder="Search by slot number..."
          className="flex-1 bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-sm"
        />

        <div className="flex gap-2 flex-wrap">
          {[
            "All",
            "2-Wheeler",
            "4-Wheeler",
            "Available",
            "Occupied",
            "Maintenance",
          ].map((f) => (
            <button
              key={f}
              className="px-4 py-2 text-xs rounded-lg bg-[#111827] border border-gray-700 hover:bg-gray-800"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {slots.map((slot) => (
          <SlotCard
            key={slot.id}
            id={slot.id}
            status={slot.status}
            type={slot.type}
            bikeIcon={bike}
            assignedTo={slot.assignedTo}
            carIcon={car}
          />
        ))}
      </div>
    </div>
  );
}
