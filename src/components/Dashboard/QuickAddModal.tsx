import { X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import User from "../../assets/Dashboard/user1.png"
import Notes from "../../assets/Dashboard/notepencil.png"
import Currency from "../../assets/Dashboard/currency.png"
import Hand from "../../assets/Dashboard/hand.png"
import Admin from "../../assets/Dashboard/admin.png"
import Booking from "../../assets/Dashboard/booking.png"
import Quick from "../../assets/Dashboard/thunder.png"


type QuickAction = {
  id: number;
  title: string;
  icon: string;
  linear: string;
  path: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 1,
    title: "Add Resident",
    icon: User,
    linear: "from-blue-600/20 to-blue-400/20 border-blue-500/40",
    path: "/add-resident",
  },
  {
    id: 2,
    title: "New Complaint",
    icon: Notes,
    linear: "from-yellow-600/20 to-orange-400/20 border-yellow-500/40",
    path: "/new-complaint",
  },
  {
    id: 3,
    title: "Create Invoice",
    icon: Currency,
    linear: "from-green-600/20 to-green-400/20 border-green-500/40",
    path: "/create-invoice",
  },
  {
    id: 4,
    title: "Register Visitor",
    icon: Hand,
    linear: "from-cyan-600/20 to-cyan-400/20 border-cyan-500/40",
    path: "/register-visitor",
  },
  {
    id: 5,
    title: "Add Staff",
    icon: Admin,
    linear: "from-purple-600/20 to-purple-400/20 border-purple-500/40",
    path: "/add-staff",
  },
  {
    id: 6,
    title: "New Booking",
    icon: Booking,
    linear: "from-pink-600/20 to-pink-400/20 border-pink-500/40",
    path: "/new-booking",
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
      <div className="w-full max-w-xl bg-linear-to-br from-[#111633] to-[#0b0f25] border border-white/10 rounded-2xl p-6 text-white relative">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-white text-xl cursor-pointer"
        >
          <X />
        </button>

        <div className="mb-6">
          <h2 className="flex gap-2 text-2xl font-bold">
            <img src={Quick} alt="" /> Quick Add</h2>
          <p className="text-gray-400 text-sm">
            Fast shortcuts to common actions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <div
              key={action.id}
              onClick={() => handleNavigate(action.path)}
              className={`cursor-pointer p-4 rounded-xl border bg-linear-to-br ${action.linear} hover:scale-105 transition`}
            >
              <div className="flex gap-2 justify-between items-center">
                <div className="flex gap-2">
                  <img src={action.icon} alt="" />
                  <p className="mt-3 font-semibold">{action.title}</p>
                </div>
                <div className="text-sm text-gray-300">+</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-white/10 border border-white/20 py-3 rounded-xl hover:bg-white/20 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuickAddModal;