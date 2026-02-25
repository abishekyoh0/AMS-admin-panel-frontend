import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import Occupancy from "../../assets/Dashboard/building.png"
import Revenue from "../../assets/Dashboard/currency.png"
import Complaints from "../../assets/Dashboard/notepencil.png"
import Visitor from "../../assets/Dashboard/hand.png"
import Staff from "../../assets/Dashboard/admin.png"
import Maintenance from "../../assets/Dashboard/tool.png"
import Reports from "../../assets/Dashboard/graph.png"
import { Download, X } from "lucide-react";
import { toast } from "react-toastify";

type Report = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  linear: string;
  color: string;
  path: string;
};

const REPORTS: Report[] = [
  {
    id: 1,
    title: "Occupancy Report",
    desc: "Complete occupancy analysis",
    icon: Occupancy,
    linear: "from-[#2B7FFF1A] to-blue-600/20 border-[#51A2FF4D]",
    color: "#51A2FF",
    path: "",
  },
  {
    id: 2,
    title: "Revenue Report",
    desc: "Financial performance overview",
    icon: Revenue,
    linear: "from-[#00C9501A] to-green-600/20 border-[#05DF724D]",
    color: "#05DF72",
    path: "",
  },
  {
    id: 3,
    title: "Complaints Report",
    desc: "All complaints and resolutions",
    icon: Complaints,
    linear: "from-[#F0B1001A] to-yellow-600/20 border-[#FDC7004D]",
    color: "#FDC700",
    path: "",
  },
  {
    id: 4,
    title: "Visitor Report",
    desc: "Visitor entry and exit logs",
    icon: Visitor,
    linear: "from-[#00B8DB1A] to-cyan-600/20 border-[#00D3F34D]",
    color: "#00D3F3",
    path: "",
  },
  {
    id: 5,
    title: "Staff Performance",
    desc: "Staff attendance and efficiency",
    icon: Staff,
    linear: "from-[#AD46FF1A] to-purple-600/20 border-[#C27AFF4D]",
    color: "#C27AFF",
    path: "",
  },
  {
    id: 6,
    title: "Maintenance Report",
    desc: "All maintenance activities",
    icon: Maintenance,
    linear: "from-[#FF69001A] to-orange-600/20 border-[#FF89044D]",
    color: "#FF8904",
    path: "",
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
      <div className="w-full max-w-2xl max-h-125 overflow-y-auto bg-linear-to-br from-[#101828] to-[#000000] border border-[#FFFFFF33] rounded-2xl text-white">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#FFFFFF33] bg-linear-to-r from-[#AD46FF33] to-[#F6339A33] rounded-t-2xl">
          <div>
            <h2 className={`flex gap-2 items-center ${FONTSIZE[30]} ${FONTWEIGHT[700]}`}>
              <img src={Reports} alt="" className="w-8 h-8" /> Download Reports</h2>
            <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>
              Generate comprehensive system reports
            </p>
          </div>

          <button onClick={onClose}
            className="text-gray-300 hover:text-white cursor-pointer">
            <X />
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {REPORTS.map((r) => (
            <div key={r.id}
              onClick={() => {handleNavigate(r.path); toast.success(`${r.title} downloaded successfully`)}}
              className={`cursor-pointer rounded-xl border bg-linear-to-br ${r.linear} p-5 hover:scale-[1.03] transition`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl">
                  <img src={r.icon} alt="" className="w-8 h-8" /></span>
                <span style={{ color: r.color }}><Download /></span>
              </div>

              <h3 className={`${FONTSIZE[16]} ${FONTWEIGHT[700]}`}>{r.title}</h3>
              <p className={`mt-1 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-5">
          <button onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadReportsModal;