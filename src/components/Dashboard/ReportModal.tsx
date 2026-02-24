import React from "react";
import { useNavigate } from "react-router-dom";

type Report = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  linear: string;
  border: string;
  path: string;
};

const REPORTS: Report[] = [
  {
    id: 1,
    title: "Occupancy Report",
    desc: "Complete occupancy analysis",
    icon: "🏢",
    linear: "from-blue-900/40 to-blue-600/20",
    border: "border-blue-500/40",
    path: "/reports/occupancy",
  },
  {
    id: 2,
    title: "Revenue Report",
    desc: "Financial performance overview",
    icon: "💰",
    linear: "from-green-900/40 to-green-600/20",
    border: "border-green-500/40",
    path: "/reports/revenue",
  },
  {
    id: 3,
    title: "Complaints Report",
    desc: "All complaints and resolutions",
    icon: "📝",
    linear: "from-yellow-900/40 to-yellow-600/20",
    border: "border-yellow-500/40",
    path: "/reports/complaints",
  },
  {
    id: 4,
    title: "Visitor Report",
    desc: "Visitor entry and exit logs",
    icon: "👋",
    linear: "from-cyan-900/40 to-cyan-600/20",
    border: "border-cyan-500/40",
    path: "/reports/visitors",
  },
  {
    id: 5,
    title: "Staff Performance",
    desc: "Staff attendance and efficiency",
    icon: "👥",
    linear: "from-purple-900/40 to-purple-600/20",
    border: "border-purple-500/40",
    path: "/reports/staff",
  },
  {
    id: 6,
    title: "Maintenance Report",
    desc: "All maintenance activities",
    icon: "🛠",
    linear: "from-orange-900/40 to-orange-600/20",
    border: "border-orange-500/40",
    path: "/reports/maintenance",
  },
];

type Props = {
  onClose: () => void;
};

const DownloadReportsModal: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-xl bg-linear-to-br from-[#0f1635] to-[#0b0f25] border border-white/10 rounded-2xl text-white">

        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-linear-to-r from-purple-600/40 to-pink-600/30 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold">📊 Download Reports</h2>
            <p className="text-sm text-gray-300">
              Generate comprehensive system reports
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {REPORTS.map((r) => (
            <div
              key={r.id}
              onClick={() => handleNavigate(r.path)}
              className={`cursor-pointer rounded-xl border ${r.border}
              bg-linear-to-br ${r.linear}
              p-5 hover:scale-[1.03] transition`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-2xl">{r.icon}</span>
                <span className="text-sm opacity-60">⬇</span>
              </div>

              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-xs text-gray-300 mt-1">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-5">
          <button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default DownloadReportsModal;