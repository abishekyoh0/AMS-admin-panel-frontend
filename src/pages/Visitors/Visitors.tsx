import React, { useState } from "react";
import Export from "../../assets/Sidebar/graph.png"
import { Search } from "lucide-react";

type Visitor = {
  id: number;
  name: string;
  phone: string;
  purpose: string;
  visiting: string;
  flat: string;
  gate: string;
  photoId: string;
  vehicle?: string;
  checkin: string;
  checkout?: string;
  status: "CHECKED IN" | "CHECKED OUT";
};

const INITIAL_VISITORS: Visitor[] = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1 555-0101",
    purpose: "Personal Visit",
    visiting: "Sarah Johnson",
    flat: "A-304",
    gate: "Gate 1",
    photoId: "DL-123456",
    vehicle: "ABC-1234",
    checkin: "1/20/2024, 2:30 PM",
    status: "CHECKED IN",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1 555-0102",
    purpose: "Delivery",
    visiting: "Mike Wilson",
    flat: "B-205",
    gate: "Gate 2",
    photoId: "DL-222222",
    checkin: "1/20/2024, 3:15 PM",
    status: "CHECKED OUT",
    checkout: "1/20/2024, 4:10 PM",
  },
  {
    id: 3,
    name: "Bob Johnson",
    phone: "+1 555-0103",
    purpose: "Contractor",
    visiting: "Emily Davis",
    flat: "C-108",
    gate: "Gate 1",
    photoId: "DL-333333",
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
    gate: "Gate 3",
    photoId: "DL-444444",
    checkin: "4:00 PM",
    status: "CHECKED IN",
    vehicle: "XYZ-5678",
  },
];

const VisitorManagement: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>(INITIAL_VISITORS);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Visitor | null>(null);

  const filteredVisitors = visitors.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());

    if (filter === "CHECKED IN") return v.status === "CHECKED IN" && matchSearch;
    if (filter === "CHECKED OUT")
      return v.status === "CHECKED OUT" && matchSearch;
    return matchSearch;
  });

  const inside = visitors.filter((v) => v.status === "CHECKED IN").length;
  const checkedOut = visitors.filter((v) => v.status === "CHECKED OUT").length;
  const total = visitors.length;
  const vehicle = visitors.filter((v) => v.vehicle).length;

  const handleView = (visitor: Visitor) => {
    setSelected(visitor);
  };

  const handleCheckout = (id: number) => {
    const updated = visitors.map((v) => {
      if (v.id === id) {
        return {
          ...v,
          status: "CHECKED OUT" as const,
          checkout: new Date().toLocaleString(),
        };
      }
      return v;
    });

    setVisitors(updated);

    const updatedVisitor = updated.find((v) => v.id === id);
    if (updatedVisitor) setSelected(updatedVisitor);
  };

  return (
    <div className="text-white">

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

      <div className="flex flex-col sm:flex-row mb-4">
        <div className="w-[25%]">
          <button className="flex gap-2 bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full">
            <img src={Export} alt="" className="w-5 h-5" />
            Export Report
          </button>
        </div>
        <div className="flex gap-2 items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 w-full">
          <Search className="w-5 h-5" />
          <input type="text" placeholder="Search visitors..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none" />
        </div>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <button onClick={() => setFilter("ALL")}
          className={`px-4 py-1 rounded-full ${filter === "ALL" ? "bg-cyan-600" : "bg-white/10"}`}>
          All ({total})
        </button>

        <button onClick={() => setFilter("CHECKED IN")}
          className={`px-4 py-1 rounded-full ${filter === "CHECKED IN" ? "bg-cyan-600" : "bg-white/10"}`}>
          Checked In ({inside})
        </button>

        <button onClick={() => setFilter("CHECKED OUT")}
          className={`px-4 py-1 rounded-full ${filter === "CHECKED OUT" ? "bg-cyan-600" : "bg-white/10"}`}>
          Checked Out ({checkedOut})
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left p-3">Visitor</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Purpose</th>
              <th className="text-left p-3">Visiting</th>
              <th className="text-left p-3">Check-in</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${v.status === "CHECKED IN" ? "bg-blue-600/30 text-blue-400" : "bg-green-600/30 text-green-400"}`}>
                    {v.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button onClick={() => handleView(v)} className="bg-blue-600/30 px-3 py-1 rounded-2xl">
                    View
                  </button>

                  {v.status === "CHECKED IN" && (
                    <button onClick={() => handleCheckout(v.id)} className="bg-green-600/30 px-3 py-1 rounded-2xl">
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-linear-to-br from-[#0f172a] to-[#0b1220] w-[500px] rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold mb-4">👤 Visitor Details</h2>
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{selected.name}</h3>
                <p className="text-gray-400 text-sm">{selected.phone}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs ${selected.status === "CHECKED IN" ? "bg-blue-600/30 text-blue-400" : "bg-green-600/30 text-green-400"}`}>
                {selected.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div><p className="text-gray-400">Purpose</p><p>{selected.purpose}</p></div>
              <div><p className="text-gray-400">Gate</p><p>{selected.gate}</p></div>
              <div><p className="text-gray-400">Visiting</p><p>{selected.visiting}</p></div>
              <div><p className="text-gray-400">Flat</p><p>{selected.flat}</p></div>
              <div><p className="text-gray-400">Photo ID</p><p>{selected.photoId}</p></div>
              <div><p className="text-gray-400">Vehicle</p><p>{selected.vehicle || "-"}</p></div>
              <div><p className="text-gray-400">Check-in</p><p>{selected.checkin}</p></div>

              {selected.checkout && (
                <div>
                  <p className="text-gray-400">Check-out</p>
                  <p>{selected.checkout}</p>
                </div>
              )}
            </div>

            {selected.status === "CHECKED IN" && (
              <button onClick={() => handleCheckout(selected.id)}
                className="w-full bg-green-600 py-3 rounded-lg mb-3">
                ✔ Check Out Visitor
              </button>
            )}

            <button onClick={() => setSelected(null)}
              className="w-full bg-gray-700 py-3 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorManagement;
