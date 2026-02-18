import React, { useState } from "react";

type Visitor = {
  id: number;
  name: string;
  phone: string;
  purpose: string;
  visiting: string;
  flat: string;
  checkin: string;
  status: "CHECKED IN" | "CHECKED OUT";
  vehicle?: boolean;
};

const VISITORS: Visitor[] = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1 555-0101",
    purpose: "Personal Visit",
    visiting: "Sarah Johnson",
    flat: "A-304",
    checkin: "2:30 PM",
    status: "CHECKED IN",
    vehicle: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1 555-0102",
    purpose: "Delivery",
    visiting: "Mike Wilson",
    flat: "B-205",
    checkin: "3:15 PM",
    status: "CHECKED OUT",
  },
  {
    id: 3,
    name: "Bob Johnson",
    phone: "+1 555-0103",
    purpose: "Contractor",
    visiting: "Emily Davis",
    flat: "C-108",
    checkin: "9:00 AM",
    status: "CHECKED IN",
  },
  {
    id: 4,
    name: "Alice Brown",
    phone: "+1 555-0104",
    purpose: "Personal Visit",
    visiting: "Bob Wilson",
    flat: "A-102",
    checkin: "4:00 PM",
    status: "CHECKED IN",
    vehicle: true,
  },
];

const VisitorManagement: React.FC = () => {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredVisitors = VISITORS.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());

    if (filter === "CHECKED IN") return v.status === "CHECKED IN" && matchSearch;
    if (filter === "CHECKED OUT") return v.status === "CHECKED OUT" && matchSearch;

    return matchSearch;
  });

  const inside = VISITORS.filter((v) => v.status === "CHECKED IN").length;
  const checkedOut = VISITORS.filter((v) => v.status === "CHECKED OUT").length;
  const total = VISITORS.length;
  const vehicle = VISITORS.filter((v) => v.vehicle).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b0f25] to-[#0a0d1a] text-white p-6">

      <h1 className="text-2xl font-bold">Visitor Management</h1>
      <p className="text-gray-400 mb-6">
        Monitor and track all visitor entries and exits
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="p-4 rounded-xl bg-blue-900/30 border border-blue-500/30">
          <p className="text-2xl font-bold">{inside}</p>
          <p className="text-gray-400 text-sm">Currently Inside</p>
        </div>

        <div className="p-4 rounded-xl bg-green-900/30 border border-green-500/30">
          <p className="text-2xl font-bold">{checkedOut}</p>
          <p className="text-gray-400 text-sm">Checked Out</p>
        </div>

        <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-500/30">
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-gray-400 text-sm">Total Today</p>
        </div>

        <div className="p-4 rounded-xl bg-orange-900/30 border border-orange-500/30">
          <p className="text-2xl font-bold">{vehicle}</p>
          <p className="text-gray-400 text-sm">With Vehicle</p>
        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <button className="bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg">
          Export Report
        </button>

        <input type="text" placeholder="Search visitors..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 outline-none"/>
      </div>

      <div className="flex gap-3 mb-4">
        <button onClick={() => setFilter("ALL")}
          className={`px-4 py-1 rounded-full ${ filter === "ALL" ? "bg-cyan-600" : "bg-white/10" }`}>
          All ({total})
        </button>

        <button onClick={() => setFilter("CHECKED IN")}
          className={`px-4 py-1 rounded-full ${ filter === "CHECKED IN" ? "bg-cyan-600" : "bg-white/10" }`}>
          Checked In ({inside})
        </button>

        <button onClick={() => setFilter("CHECKED OUT")}
          className={`px-4 py-1 rounded-full ${ filter === "CHECKED OUT" ? "bg-cyan-600" : "bg-white/10" }`}>
          Checked Out ({checkedOut})
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left p-3">Visitor Name</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Purpose</th>
              <th className="text-left p-3">Visiting</th>
              <th className="text-left p-3">Check-In</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredVisitors.map((v) => (
              <tr key={v.id} className="border-t border-white/10">
                <td className="p-3 font-medium">{v.name}</td>
                <td className="p-3 text-gray-400">{v.phone}</td>
                <td className="p-3">{v.purpose}</td>

                <td className="p-3">
                  {v.visiting}
                  <div className="text-xs text-gray-400">{v.flat}</div>
                </td>

                <td className="p-3">{v.checkin}</td>

                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                      v.status === "CHECKED IN" ? "bg-blue-600/30 text-blue-400" : "bg-green-600/30 text-green-400"}`}>
                    {v.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button className="bg-blue-600/30 px-3 py-1 rounded">
                    View
                  </button>

                  {v.status === "CHECKED IN" && (
                    <button className="bg-green-600/30 px-3 py-1 rounded">
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorManagement;
