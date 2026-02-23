import React, { useMemo, useState } from "react";
import ComplaintDetails from "../../components/complaint/ComplaintDetails";

type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
type Priority = "HIGH" | "MEDIUM" | "LOW" | "URGENT";

interface Complaint {
  id: string;
  resident: string;
  block: string;
  category: string;
  title: string;
  priority: Priority;
  status: Status;
  assignedTo: string;
  createdAt: string;
  resolvedAt?: string;
  description?: string;
}

const complaintsData: Complaint[] = [
  {
    id: "CM-1245",
    resident: "Sarah Johnson",
    block: "A-304",
    category: "PLUMBING",
    title: "Leaking tap in kitchen",
    description: "Water is continuously dripping from the kitchen sink tap.",
    priority: "HIGH",
    status: "OPEN",
    assignedTo: "John",
    createdAt: "2026-02-17 09:30:00",
  },
  {
    id: "CM-1244",
    resident: "Mike Wilson",
    block: "B-205",
    category: "ELECTRICAL",
    title: "Power fluctuation issue",
    description: "Lights are flickering frequently in the living room.",
    priority: "URGENT",
    status: "IN_PROGRESS",
    assignedTo: "John Smith",
    createdAt: "2026-02-16T18:15:00",
  },
  {
    id: "CM-1243",
    resident: "Emily Davis",
    block: "C-108",
    category: "MAINTENANCE",
    title: "Broken door lock",
    description: "Door lock is not functioning properly.",
    priority: "MEDIUM",
    status: "RESOLVED",
    assignedTo: "Mike Wilson",
    createdAt: "2026-02-16 18:15:00",
    resolvedAt: "2026-02-16T14:15:00",
  },
  {
    id: "CM-1242",
    resident: "Bob Wilson",
    block: "A-102",
    category: "SECURITY",
    title: "Security camera not working",
    description: "Parking area camera is offline.",
    priority: "HIGH",
    status: "OPEN",
    assignedTo: "Not Assigned",
    createdAt: "2026-02-16T18:15:00",
  },
];

const getStatusColor = (status: Status) => {
  switch (status) {
    case "OPEN":
      return "bg-[#F0B10033] text-white border border-[#FDC7004D]";
    case "IN_PROGRESS":
      return "bg-[#2B7FFF33] text-white border border-[#51A2FF4D]";
    case "RESOLVED":
      return "bg-[#00C95033] text-green-400 border border-[#05DF724D]";
    case "CLOSED":
      return "bg-gray-500/20 text-gray-400";
  }
};

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "HIGH":
      return "bg-[#FF690033] text-[#FF8904]";
    case "MEDIUM":
      return "bg-[#F0B10033] text-[#FDC700]";
    case "LOW":
      return "bg-green-500/20 text-green-400";
    case "URGENT":
      return "bg-[#FB2C3633] text-white";
  }
};

 const statusCounts = {
    OPEN: complaintsData.filter((c) => c.status === "OPEN").length,
    IN_PROGRESS: complaintsData.filter((c) => c.status === "IN_PROGRESS")
      .length,
    RESOLVED: complaintsData.filter((c) => c.status === "RESOLVED").length,
    URGENT: complaintsData.filter((c) => c.priority === "URGENT").length,
  };

const ComplaintManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  const filteredData = useMemo(() => {
    return complaintsData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.resident.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "ALL" ? true : item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className=" text-white">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Complaint Management
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm">
          Monitor and manage all resident complaints
        </p>
      </div>
       {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Open" value={statusCounts.OPEN} color="yellow" />
        <StatCard
          title="In Progress"
          value={statusCounts.IN_PROGRESS}
          color="blue"
        />
        <StatCard
          title="Resolved"
          value={statusCounts.RESOLVED}
          color="green"
        />
        <StatCard
          title="Urgent"
          value={statusCounts.URGENT}
          color="red"
        />
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search complaints..."
          className="w-full px-4 py-2 rounded-xl text-[#99A1AF] bg-[#FFFFFF0D] backdrop-blur-md border border-[#FFFFFF33] focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-4 overflow-x-auto cursor-pointer">
        {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-1 whitespace-nowrap rounded-full text-sm cursor-pointer ${
              filter === tab
                ? "bg-[#00B8DB] text-white"
                : "bg-[#FFFFFF0D] hover:bg-white/20 text-[#99A1AF]"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="sm:hidden space-y-4">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex justify-between">
              <span className="text-sm text-[#00D3F3]">{item.id}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  item.status
                )}`}
              >
                {item.status.replace("_", " ")}
              </span>
            </div>

            <h3 className="mt-2 font-semibold">{item.title}</h3>

            <p className="text-xs text-gray-400 mt-1">
              {item.resident} • {item.block}
            </p>

            <span
              className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${getPriorityColor(
                item.priority
              )}`}
            >
              {item.priority}
            </span>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setSelectedComplaint(item)}
                className="text-xs bg-[#2B7FFF33] text-[#51A2FF] px-3 py-1 rounded-lg"
              >
                View
              </button>

              <button className="text-xs bg-[#AD46FF33] text-[#C27AFF] px-3 py-1 rounded-lg">
                Assign
              </button>

              {item.status !== "RESOLVED" && (
                <button className="text-xs bg-[#00C95033] text-[#05DF72] px-3 py-1 rounded-lg">
                  Resolve
                </button>
              )}

              <button className="text-xs bg-[#FB2C3633] text-[#FF6467] px-3 py-1 rounded-lg">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE VIEW */}
      <div className="hidden sm:block overflow-x-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="border-b border-white/10 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Resident</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">
                Category
              </th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">
                Priority
              </th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">
                Assigned
              </th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 text-[#00D3F3]">{item.id}</td>
                <td className="px-4 py-3">
                  {item.resident}
                  <div className="text-xs text-gray-400">
                    {item.block}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {item.category}
                </td>
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  {item.assignedTo}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedComplaint(item)}
                      className="px-3 py-1 bg-[#2B7FFF33] text-[#51A2FF] text-xs rounded-lg"
                    >
                      View
                    </button>

                    <button
                     className="px-3 py-1 bg-[#AD46FF33] text-[#C27AFF] text-xs rounded-lg">
                      Assign
                    </button>

                    {item.status !== "RESOLVED" && (
                      <button className="px-3 py-1 bg-[#00C95033] text-[#05DF72] text-xs rounded-lg">
                        Resolve
                      </button>
                    )}

                    <button className="px-3 py-1 bg-[#FB2C3633] text-[#FF6467] text-xs rounded-lg">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
          <div className="bg-gray-900 w-full max-w-lg sm:max-w-xl lg:max-w-2xl rounded-xl p-4 sm:p-6 relative">
            <ComplaintDetails
              complaint={selectedComplaint}
              onClose={() => setSelectedComplaint(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  const colors: any = {
    yellow: "bg-[#F0B10033] ",
    blue: "bg-[#2B7FFF33]",
    green: "bg-[#00C95033]",
    red: "bg-[#FB2C3633]",
  };

  return (
    <div
      className={`p-4 rounded-2xl bg-gradient-to-br ${colors[color]} border border-white/10`}
    >
      <h2 className="text-lg font-semibold text-[#FFFFFF]">{value}</h2>
      <p className="text-sm text-[#D1D5DC]">{title}</p>
    </div>
  );
};

export default ComplaintManagement;
