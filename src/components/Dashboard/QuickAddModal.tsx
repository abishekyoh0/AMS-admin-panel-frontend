import { X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import User from "../../assets/Dashboard/user1.png"
import Notes from "../../assets/Dashboard/notepencil.png"
import Currency from "../../assets/Dashboard/currency.png"
import Hand from "../../assets/Dashboard/hand.png"
import Admin from "../../assets/Dashboard/admin.png"
import Booking from "../../assets/Dashboard/booking.png"
import Quick from "../../assets/Dashboard/thunder.png"
import { toast } from "react-toastify";

type QuickAction = {
  id: number;
  title: string;
  icon: string;
  linear: string;
  path: string;
  color: string;
  toast: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 1,
    title: "Add Resident",
    icon: User,
    linear: "from-[#2B7FFF1A] to-[#2B7FFF1A] border-[#51A2FF4D]",
    path: "/users",
    color: "#51A2FF",
    toast: "Add Resident",
  },
  {
    id: 2,
    title: "New Complaint",
    icon: Notes,
    linear: "from-[#F0B1001A] to-orange-400/20 border-[#FDC7004D]",
    path: "/complaint",
    color: "#FDC700",
    toast: "New Complaint"
  },
  {
    id: 3,
    title: "Create Invoice",
    icon: Currency,
    linear: "from-[#00C9501A] to-green-400/20 border-[#05DF724D]",
    path: "/invoices",
    color: "#05DF72",
    toast: "Create Invoice",
  },
  {
    id: 4,
    title: "Register Visitor",
    icon: Hand,
    linear: "from-[#00B8DB1A] to-cyan-400/20 border-[#00D3F34D]",
    path: "/visitors",
    color: "#00D3F3",
    toast: "Register Visitor",
  },
  {
    id: 5,
    title: "Add Staff",
    icon: Admin,
    linear: "from-[#AD46FF1A] to-purple-400/20 border-[#C27AFF4D]",
    path: "/users",
    color: "#C27AFF",
    toast: "Add Staff",
  },
  {
    id: 6,
    title: "New Booking",
    icon: Booking,
    linear: "from-[#F6339A1A] to-pink-400/20 border-[#FB64B64D]",
    path: "",
    color: "#FB64B6",
    toast: "Coming soon..."
  },
];

type Props = {
  onClose: () => void;
};

const QuickAddModal: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-xl bg-linear-to-br from-[#101828] to-[#000000] border border-[#FFFFFF33] rounded-2xl text-white">
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-linear-to-r from-[#00C95033] to-[#00BC7D33] rounded-t-2xl">
          <div>
            <h2 className={`flex gap-2 ${FONTSIZE[30]} ${FONTWEIGHT[700]}`}>
              <img src={Quick} alt="" /> Quick Add</h2>
            <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>
              Fast shortcuts to common actions
            </p>
          </div>
          <button onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer">
            <X />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4">
          {QUICK_ACTIONS.map((action) => (
            <div key={action.id}
              onClick={() => {handleNavigate(action.path); toast.success(action.toast)}}
              className={`cursor-pointer p-4 rounded-xl border bg-linear-to-br ${action.linear} hover:scale-105 transition`}>
              <div className="flex gap-2 justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={action.icon} alt="" className="w-8 h-8" />
                  <p className={`${FONTSIZE[16]} ${FONTWEIGHT[700]}`}>{action.title}</p>
                </div>
                <div className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}
                  style={{ color: action.color }}>+</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-5">
          <button onClick={onClose}
            className="w-full mt-6 bg-white/10 border border-white/20 py-3 rounded-xl hover:bg-white/20 transition cursor-pointer" >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;