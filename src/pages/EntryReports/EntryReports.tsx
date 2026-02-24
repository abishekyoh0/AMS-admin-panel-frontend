import React, { useState, useMemo } from "react";
import StatCard from "../../components/Entryreports/StatCard";
import FilterSection from "../../components/Entryreports/FilterSection";
import EntryTable from "../../components/Entryreports/EntryTable";
import AnalyticsSection from "../../components/Entryreports/AnalyticsSection";
import house from "../../assets/resident/house.png";
import download from "../../assets/resident/download.png";
import { FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import { toast } from "react-toastify";

export type Block = "All" | "Block A" | "Block B" | "Block C";
export type Period = "Today" | "Week" | "Month";

export interface Entry {
  id: number;
  residentId: string;
  name: string;
  flat: string;
  block: Block;
  date: string;
  entryTime: string;
  exitTime: string;
  duration: string;
  gate: string;
  guard: string;
  status: "Inside" | "Exited";
}

const dummyData: Entry[] = [
  {
    id: 1,
    residentId: "RE001",
    name: "Amit Sharma",
    flat: "A-102",
    block: "Block A",
    date: "2026-01-28",
    entryTime: "01:30 PM",
    exitTime: "06:45 PM",
    duration: "10h 15m",
    gate: "Main Gate",
    guard: "Security-1",
    status: "Exited",
  },
  {
    id: 2,
    residentId: "RE002",
    name: "Priya Singh",
    flat: "B-205",
    block: "Block B",
    date: "2026-01-28",
    entryTime: "06:00 PM",
    exitTime: "07:30 PM",
    duration: "10h 30m",
    gate: "Main Gate",
    guard: "Security-2",
    status: "Exited",
  },
  {
    id: 3,
    residentId: "RE003",
    name: "Neha Gupta",
    flat: "C-301",
    block: "Block C",
    date: "2026-01-28",
    entryTime: "10:15 AM",
    exitTime: "—",
    duration: "—",
    gate: "Back Gate",
    guard: "Security-3",
    status: "Inside",
  },
  {
    id: 4,
    residentId: "RE004",
    name: "Rohit Verma",
    flat: "A-104",
    block: "Block A",
    date: "2026-01-28",
    entryTime: "07:00 AM",
    exitTime: "05:00 PM",
    duration: "10h 00m",
    gate: " Side Gate",
    guard: "Security-1",
    status: "Exited",
  },
  {
    id: 5,
    residentId: "RE005",
    name: "Anjali Desai",
    flat: "B-103",
    block: "Block B",
    date: "2026-01-28",
    entryTime: "08:45 AM",
    exitTime: "—",
    duration: "—",
    gate: "Main Gate",
    guard: "Security-2",
    status: "Inside",
  },
];

const ResidentEntryReports: React.FC = () => {
  const [block, setBlock] = useState<Block>("All");
  const [period, setPeriod] = useState<Period>("Today");
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return dummyData.filter((entry) => {
      const blockMatch = block === "All" || entry.block === block;

      const searchMatch =
        entry.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.flat.toLowerCase().includes(search.toLowerCase());

      return blockMatch && searchMatch;
    });
  }, [block, search]);

  const insideCount = filteredData.filter((e) => e.status === "Inside").length;

  const exitedCount = filteredData.filter((e) => e.status === "Exited").length;

  const totalEntries = filteredData.length;

  const gateCount: Record<string, number> = {};
  filteredData.forEach((entry) => {
    gateCount[entry.gate] = (gateCount[entry.gate] || 0) + 1;
  });

  const topGate =
    Object.keys(gateCount).length > 0
      ? Object.entries(gateCount).sort((a, b) => b[1] - a[1])[0][0]
      : "—";

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1
            style={{ ...FONTWEIGHT[600] }}
            className={`${FONTSIZE[24]} flex items-center gap-2 text-white`}
          >
            <img src={house} alt="House" className="w-6 h-6 mb-1 " />
            Resident Entry Reports
          </h1>

          <p
            style={{ ...FONTWEIGHT[400] }}
            className={`${FONTSIZE[14]} text-[#99A1AF] mt-1`}
          >
            Monitor all resident entry and exit activities
          </p>
        </div>

        <button
          onClick={() => {
            toast.success("Report downloaded successfully!");
          }}
          className="flex items-center gap-2 px-8 py-2 rounded-xl
          bg-linear-to-r from-[#2B7FFF] to-[#0092B8]
          shadow-lg shadow-[#2B7FFF80]
          transition-all duration-300 cursor-pointer"
        >
          <img
            src={download}
            alt="Download"
            className="w-5 h-5 object-contain"
          />
          <span
            style={{ ...FONTWEIGHT[500] }}
            className={`${FONTSIZE[14]} text-[#0A0A0A]`}
          >
            Download Report
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Currently Inside" value={insideCount} type="inside" />
        <StatCard title="Exited Today" value={exitedCount} type="exited" />
        <StatCard title="Total Entries" value={totalEntries} type="entries" />
        <StatCard title="Most Used Gate" value={topGate} type="gate" />
      </div>

      <FilterSection
        block={block}
        setBlock={setBlock}
        period={period}
        setPeriod={setPeriod}
        search={search}
        setSearch={setSearch}
      />

      <EntryTable data={filteredData} />

      <AnalyticsSection data={filteredData} />
    </div>
  );
};

export default ResidentEntryReports;
