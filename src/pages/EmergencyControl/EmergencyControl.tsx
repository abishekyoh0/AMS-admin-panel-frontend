import { useState } from "react";
import StatCard from "../../components/EmergencyContol/StatCard";
import AlertTabs from "../../components/EmergencyContol/AlertTabs";
import EmergencyTable from "../../components/EmergencyContol/EmergencyTable";
import EmergencyModal from "../../components/EmergencyContol/EmergencyModal";
import AlertDistribution from "../../components/EmergencyContol/AlertDistribution";
import RecentActivity from "../../components/EmergencyContol/RecentActivity";
import alarm from "../../assets/emergency/alarm.png";
import tick from "../../assets/emergency/tick.png";
import red from "../../assets/emergency/red.png";
import graph from "../../assets/emergency/graph.png";
import { FONTSIZE } from "../../constent/uiconstent";

export interface Emergency {
  id: number;
  type: string;
  alertId: string;
  priority: "High" | "Medium" | "Low";
  location: string;
  raisedBy: string;
  time: string;
  acknowledged: number;
  total: number;
  status: "Active" | "Resolved";
  message: string;
}

const data: Emergency[] = [
  {
    id: 1,
    type: " Fire",
    alertId: "FIRE001",
    priority: "Medium",
    location: "Block A - Parking Area",
    raisedBy: "Security-1",
    time: "07:15 PM",
    acknowledged: 45,
    total: 120,
    status: "Active",
    message:
      "Fire detected in parking area. Please evacuate immediately and avoid lifts.",
  },
  {
    id: 2,
    type: "Medical Emergency",
    alertId: "MED002",
    priority: "High",
    location: "Flat B-203",
    raisedBy: "Security-2",
    time: "02:10 AM",
    acknowledged: 38,
    total: 40,
    status: "Resolved",
    message: "Medical emergency reported in Flat B-203.",
  },
  {
    id: 2,
    type: " Medical Emergencyy",
    alertId: "MED003",
    priority: "Low",
    location: "Flat B-204",
    raisedBy: "Security-3",
    time: "09:10 AM",
    acknowledged: 38,
    total: 40,
    status: "Active",
    message: "Medical emergency reported in Flat B-204.",
  },
];

const EmergencyControlCenter = () => {
  const [emergencies, setEmergencies] = useState<Emergency[]>(data);
  const [selected, setSelected] = useState<Emergency | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  // const [selected, setSelected] = useState<Emergency | null>(null);
  const filtered =
    activeTab === "All"
      ? emergencies
      : emergencies.filter((d) => d.status === activeTab);

  const distributionData: { label: string; value: number }[] = Object.values(
    data.reduce<Record<string, { label: string; value: number }>>(
      (acc, item) => {
        const key = item.type;

        if (!acc[key]) {
          acc[key] = { label: key, value: 0 };
        }

        acc[key].value += 1;

        return acc;
      },
      {},
    ),
  );

  return (
    <div className=" text-white ">
      <div className="mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Icon */}
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 
               flex items-center justify-center 
               rounded-lg 
               bg-red-500/20 border border-red-500/30"
          >
            <img
              src={alarm}
              alt="Alarm"
              className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
            />
          </div>

          {/* Title */}
          <h3
            className={`${FONTSIZE[24]} tracking-tight`}
            style={{ fontWeight: 700 }} // 👈 font-weight here
          >
            Emergency Alert Management
          </h3>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-gray-400 mt-2">
          Monitor and manage all emergency alerts across the community
        </p>
      </div>

      {/* ✅ Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Active Emergencies"
          value={emergencies.filter((d) => d.status === "Active").length}
          icon={<img src={alarm} alt="Alarm" className="w-6 h-6" />}
          gradient="bg-gradient-to-r from-red-500/20 to-red-700/20"
        />

        <StatCard
          title="Resolved Incidents"
          value={emergencies.filter((d) => d.status === "Resolved").length}
          icon={<img src={tick} alt="Tick" className="w-6 h-6" />}
          gradient="bg-gradient-to-r from-green-500/20 to-green-700/20"
        />

        <StatCard
          title="High Priority Active"
          value={
            emergencies.filter(
              (d) => d.status === "Active" && d.priority === "High",
            ).length
          }
          icon={<img src={red} alt="High Priority" className="w-6 h-6" />}
          gradient="bg-gradient-to-r from-purple-500/20 to-purple-700/20"
        />

        <StatCard
          title="Total Acknowledge"
          value={emergencies.reduce((sum, d) => sum + d.acknowledged, 0)}
          icon={<img src={graph} alt="Graph" className="w-6 h-6" />}
          gradient="bg-gradient-to-r from-blue-500/20 to-blue-700/20"
        />
      </div>

      {/* ✅ Tabs */}
      <AlertTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        total={data.length}
        active={data.filter((d) => d.status === "Active").length}
        resolved={data.filter((d) => d.status === "Resolved").length}
      />

      {/* ✅ Table */}
      <EmergencyTable
        data={filtered}
        onView={setSelected}
        setEmergencies={setEmergencies}
      />

      {/* ✅ Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AlertDistribution data={distributionData} />
        <RecentActivity data={data} />
      </div>

      {/* ✅ Modal */}
      {selected && (
        <EmergencyModal
          emergency={selected}
          onClose={() => setSelected(null)}
          setEmergencies={setEmergencies}
        />
      )}
    </div>
  );
};

export default EmergencyControlCenter;
