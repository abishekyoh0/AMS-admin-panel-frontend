import React, { useState } from "react";
import Export from "../../assets/Sidebar/graph.png"
import { Search, X } from "lucide-react";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import user from "../../assets/Sidebar/user.png"
import Checkbox from "../../assets/Sidebar/square.png"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

  const handleExport = () => {
    toast.success("Report exported successfully", {
      // style: {
      //   background: "#0f172a",
      //   color: "#fff",
      //   border: "1px solid #00B8DB",
      //   padding: "12px 16px",
      // },
    });
  };


  return (
    <div style={{ color: COLORS.primary_white, background: COLORS.primary_black }} >
      <h1 className={`${FONTSIZE[36]} ${FONTWEIGHT[700]}`}>Visitor Management</h1>
      <p className={`mb-6 ${FONTSIZE[16]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>
        Monitor and track all visitor entries and exits
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-[#2B7FFF33] border border-[#51A2FF4D]">
          <p className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>{inside}</p>
          <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: "#D1D5DC" }}>Currently Inside</p>
        </div>
        <div className="p-4 rounded-xl bg-[#00C95033] border border-[#05DF724D]">
          <p className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>{checkedOut}</p>
          <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: "#D1D5DC" }}>Checked Out</p>
        </div>
        <div className="p-4 rounded-xl bg-[#AD46FF33] border border-[#C27AFF4D]">
          <p className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>{total}</p>
          <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: "#D1D5DC" }}>Total Today</p>
        </div>
        <div className="p-4 rounded-xl bg-[#FF690033] border border-[#FF690033]">
          <p className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>{vehicle}</p>
          <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: "#D1D5DC" }}>With Vehicle</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row mt-4 mb-8">
        <div className="w-[25%]">
          <button onClick={handleExport}
            className={`flex gap-2 bg-linear-to-r from-[#00B8DB] to-[#155DFC] px-6 py-2 rounded-full ${FONTSIZE[16]} ${FONTWEIGHT[700]} cursor-pointer`}
            style={{ color: COLORS.primary_black }}>
            <img src={Export} alt="" className="w-5 h-5" />
            Export Report
          </button>
        </div>
        <div className="flex gap-2 items-center bg-[#FFFFFF0D] border border-[#FFFFFF33] rounded-full px-4 py-2 w-full">
          <Search className="w-5 h-5" />
          <input type="text" placeholder="Search visitors..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className={`flex-1 bg-transparent outline-none ${FONTSIZE[16]} ${FONTWEIGHT[400]}`} />
        </div>
      </div>

      <div className={`flex gap-3 mb-4 flex-wrap ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}>
        <button onClick={() => setFilter("ALL")}
          className={`px-4 py-1 rounded-full ${filter === "ALL" ? "bg-[#00B8DB]" : "bg-[#FFFFFF0D]"} cursor-pointer`}>
          All ({total})
        </button>
        <button onClick={() => setFilter("CHECKED IN")}
          className={`px-4 py-1 rounded-full ${filter === "CHECKED IN" ? "bg-[#00B8DB]" : "bg-[#FFFFFF0D]"} cursor-pointer`}>
          Checked In ({inside})
        </button>
        <button onClick={() => setFilter("CHECKED OUT")}
          className={`px-4 py-1 rounded-full ${filter === "CHECKED OUT" ? "bg-[#00B8DB]" : "bg-[#FFFFFF0D]"} cursor-pointer`}>
          Checked Out ({checkedOut})
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#FFFFFF33] bg-[#FFFFFF0D]">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr className={`uppercase ${FONTSIZE[12]} ${FONTWEIGHT[700]}`}>
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
                <td className={`p-3 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}>{v.name}</td>
                <td className={`p-3 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>{v.phone}</td>
                <td className={`p-3 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}>{v.purpose}</td>
                <td className={`p-3 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}>
                  {v.visiting}
                  <div className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>{v.flat}</div>
                </td>
                <td className={`p-3 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}>{v.checkin}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full ${FONTSIZE[12]} ${FONTWEIGHT[700]} ${v.status === "CHECKED IN" ? "bg-[#2B7FFF33] text-[#51A2FF]" : "bg-[#00C95033] text-[#05DF72]"}`}>
                    {v.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleView(v)} className={`bg-[#2B7FFF33] text-[#51A2FF] px-3 py-1 rounded-2xl ${FONTSIZE[12]} ${FONTWEIGHT[400]} cursor-pointer`}>
                    View
                  </button>
                  {v.status === "CHECKED IN" && (
                    <button onClick={() => handleCheckout(v.id)} className={`bg-[#00C95033] text-[#05DF72] px-3 py-1 rounded-2xl ${FONTSIZE[12]} ${FONTWEIGHT[400]} cursor-pointer`}>
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
          <div className="relative bg-[#101828F2] w-[500px] rounded-2xl border border-[#FFFFFF33] p-6">
            <h2 className={`flex gap-2 items-center mb-4 ${FONTSIZE[30]} ${FONTWEIGHT[700]}`}>
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full cursor-pointer hover:bg-[#2a2c30]">
                <X size={18} color={COLORS.primary_white} />
              </button>
              <img src={user} alt="" className="w-8 h-8" /> Visitor Details</h2>
            <div className="flex justify-between mb-4">
              <div>
                <h3 className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>{selected.name}</h3>
                <p className={`${FONTSIZE[16]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>{selected.phone}</p>
              </div>
              <div
                className={`flex items-center px-3 py-1 rounded-full ${FONTSIZE[14]} ${FONTWEIGHT[700]} ${selected.status === "CHECKED IN" ? "bg-[#2B7FFF33] text-[#51A2FF]" : "bg-[#00C95033] text-[#05DF72]"}`}>
                {selected.status}
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-4 mb-4 ${FONTSIZE[18]} ${FONTWEIGHT[400]}`}>
              <div><p className={`mb-1 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Purpose</p><p>{selected.purpose}</p></div>
              <div><p className={`mb-1 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Gate</p><p>{selected.gate}</p></div>
              <div><p className={`mb-1 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Visiting</p><p>{selected.visiting}</p></div>
              <div><p className={`mb-1 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Flat</p><p>{selected.flat}</p></div>
              <div><p className={`mb-1 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Photo ID</p><p>{selected.photoId}</p></div>
              <div><p className={`mb-1 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Vehicle</p><p>{selected.vehicle || "-"}</p></div>
              <div><p className={`mb-1 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Check-in</p><p>{selected.checkin}</p></div>

              {selected.checkout && (
                <div>
                  <p style={{ color: COLORS.secoundy_gray }}>Check-out</p>
                  <p>{selected.checkout}</p>
                </div>
              )}
            </div>

            {selected.status === "CHECKED IN" && (
              <button onClick={() => handleCheckout(selected.id)}
                className={`flex justify-center items-center gap-2 w-full bg-linear-to-r from-[#00C950] to-[#009966] py-3 rounded-full mb-3 ${FONTSIZE[16]} ${FONTWEIGHT[700]} cursor-pointer`}
                style={{ color: COLORS.primary_black }}>
                <img src={Checkbox} alt="" className="w-6 h-6" /> Check Out Visitor
              </button>
            )}

            <button onClick={() => setSelected(null)}
              className={`w-full bg-[#FFFFFF1A] border border-[#FFFFFF33]  py-3 rounded-full ${FONTSIZE[16]} ${FONTWEIGHT[700]} cursor-pointer`}
              style={{ color: COLORS.primary_black }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorManagement;
