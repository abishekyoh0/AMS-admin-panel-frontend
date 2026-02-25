import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import BackIcon from "../../assets/notification/back-arrow.png";
import Bell from "../../assets/notification/bell1.png";
// import All from "../../assets/notification/alarm.png";
import Unread from "../../assets/notification/alert.png";
import Action from "../../assets/notification/shield.png";
import ActionRed from "../../assets/notification/shield-red.png";
import Security from "../../assets/notification/alert.png";
import Complaints from "../../assets/notification/note.png";
import Payment from "../../assets/notification/dollar.png";
import System from "../../assets/notification/settings.png";
import View from "../../assets/notification/eye.png";
import Trash from "../../assets/notification/trash.png";
import Search from "../../assets/notification/search.png";
import Mark from "../../assets/notification/mark.png";
import Total from "../../assets/notification/Vector.png";
import Alert from "../../assets/notification/warning.png";
import BellIcon from "../../assets/notification/bell-icon.png";
import Unauthorized from "../../assets/notification/shield-red.png"
import High from "../../assets/notification/warning.png"
import New from "../../assets/notification/user.png"
import Monthly from "../../assets/notification/dollar-green.png"
import Clock from "../../assets/notification/clock.png"

type FilterBtn = {
  id: number;
  label: string;
  key: string;
  icon: string;
};

type Notification = {
  id: number;
  title: string;
  desc: string;
  time: string;
  category: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  action?: boolean;
  unread?: boolean;
  icon?: string;
};

const FILTERS: FilterBtn[] = [
  { id: 1, label: "All", key: "all", icon: BellIcon },
  { id: 2, label: "Unread", key: "unread", icon: Unread },
  { id: 3, label: "Action Required", key: "action", icon: Action },
  { id: 4, label: "Security", key: "security", icon: Security },
  { id: 5, label: "Payment", key: "payment", icon: Payment },
  { id: 6, label: "Complaints", key: "complaints", icon: Complaints },
  { id: 7, label: "System", key: "system", icon: System },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    icon: Unauthorized,
    title: "Unauthorized Access Attempt",
    desc: "Multiple failed login attempts detected from IP 192.168.1.45",
    time: "12 mins ago",
    category: "Security",
    priority: "CRITICAL",
    action: true,
    unread: true,
  },
  {
    id: 2,
    icon: High,
    title: "High Priority Complaint - Elevator Malfunction",
    desc: "Unit B-305 reported elevator stuck on 12th floor",
    time: "45 mins ago",
    category: "Complaints",
    priority: "HIGH",
    action: true,
    unread: true,
  },
  {
    id: 3,
    icon: New,
    title: "New Admin User Added",
    desc: "David Martinez added as System Administrator",
    time: "1 hour ago",
    category: "System",
    priority: "LOW",
    unread: false,
  },
  {
    id: 4,
    icon: Monthly,
    title: "Monthly Collection Target Achieved",
    desc: "January collection reached $152,000",
    time: "2 hours ago",
    category: "Payment",
    priority: "MEDIUM",
    unread: false,
  },
  {
    id: 5,
    icon: Monthly,
    title: "Payment Overdue - Critical",
    desc: "Unit C-102 payment overdue by 30 days",
    time: "3 hours ago",
    category: "Payment",
    priority: "CRITICAL",
    action: true,
    unread: true,
  },
];

const NotificationsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(NOTIFICATIONS);
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = data.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());

    if (activeFilter === "unread") return n.unread && matchSearch;
    if (activeFilter === "action") return n.action && matchSearch;
    if (activeFilter === "security")
      return n.category.toLowerCase() === "security" && matchSearch;
    if (activeFilter === "payment")
      return n.category.toLowerCase() === "payment" && matchSearch;
    if (activeFilter === "complaints")
      return n.category.toLowerCase() === "complaints" && matchSearch;
    if (activeFilter === "system")
      return n.category.toLowerCase() === "system" && matchSearch;

    return matchSearch;
  });

  const badgeColor = (priority?: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-500/20 text-red-400";
      case "HIGH":
        return "bg-orange-500/20 text-orange-400";
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const markSelectedRead = () => {
    const updated = data.map((n) =>
      selected.includes(n.id) ? { ...n, unread: false } : n,
    );
    setData(updated);
    setSelected([]);
  };

  // const unreadCount = data.filter((n) => n.unread).length;

  // const markAllRead = () => {
  //   alert("All notifications marked as read (connect backend)");
  // };

  const total = data.length;
  const unread = data.filter((n) => n.unread).length;
  const action = data.filter((n) => n.action).length;

  const navigate = useNavigate();
  return (
    <div style={{ color: COLORS.primary_white }}>
      <div className="pt-2 pb-3">
        <button onClick={() => navigate("/")}
          className={`flex items-center gap-2 sm:text-base cursor-pointer ${FONTSIZE[16]} ${FONTWEIGHT[400]}`}
          style={{ color: COLORS.secoundy_gray }}>
          <img src={BackIcon} className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Dashboard
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        <div>
          <h1 className={`flex items-center gap-2 ${FONTSIZE[36]} ${FONTWEIGHT[700]}`} >
            <img src={Bell} alt="" className="w-8 h-8" /> Notifications
          </h1>
          <p className={`mt-1 ${FONTSIZE[16]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>
            System alerts and administrative notifications
          </p>

          <div className="flex flex-wrap gap-3 mt-3">
            <span className={`flex items-center gap-2 bg-[#2B7FFF33] text-[#51A2FF] px-3 py-1 rounded-full ${FONTSIZE[12]} ${FONTWEIGHT[700]}`}>
              <img src={Total} alt="" className="w-4 h-4" /> {total} Total
            </span>
            <span className={`flex items-center gap-2 bg-[#FF690033] text-[#FF8904] px-3 py-1 rounded-full ${FONTSIZE[12]} ${FONTWEIGHT[700]}`} >
              <img src={Alert} alt="" /> {unread} Unread
            </span>
            <span className={`flex items-center gap-2 bg-[#FB2C3633] text-[#FF6467] px-3 py-1 rounded-full ${FONTSIZE[12]} ${FONTWEIGHT[700]}`}>
              <img src={ActionRed} alt="" /> {action} Need Action
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("/announcement-management")}
            className={`flex items-center gap-2 bg-linear-to-r from-[#AD46FF] to-[#E60076] px-5 py-2 rounded-2xl shadow-lg cursor-pointer ${FONTSIZE[16]} ${FONTWEIGHT[700]}`}
            style={{ boxShadow: "0px 4px 6px -4px #AD46FF40,0px 10px 15px -3px #AD46FF40" }}>
            <img src={BellIcon} alt="" /> Manage Announcements
          </button>
          <button onClick={markSelectedRead} className={`flex items-center gap-2 bg-linear-to-r from-[#00C950] to-[#009966] px-5 py-2 rounded-2xl shadow-lg cursor-pointer ${FONTSIZE[16]} ${FONTWEIGHT[700]}`}
            style={{ boxShadow: "0px 4px 6px -4px #00C95040, 0px 10px 15px -3px #00C95040" }}>
            <img src={Mark} alt="" /> Mark All Read
          </button>
        </div>
      </div>

      <div className="bg-[#FFFFFF0D] border border-[#FFFFFF33] rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-2 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl px-3 py-2 mb-4">
          <img src={Search} className="w-4 h-4 opacity-70" />
          <input placeholder="Search notifications..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`bg-transparent outline-none w-full ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} />
        </div>

        <div className="flex lg:flex-row gap-4">
          <div className="flex flex-nowrap gap-3 overflow-x-auto">
            {FILTERS.map((btn) => (
              <button type="button" key={btn.id}
                onClick={() => setActiveFilter(btn.key)}
                className={`flex shrink-0 whitespace-nowrap px-4 py-2 justify-center items-center gap-2 rounded-xl transition ${FONTSIZE[16]} ${FONTWEIGHT[700]}
                 ${activeFilter === btn.key ? "bg-linear-to-r from-[#2B7FFF] to-[#00B8DB]" : "bg-white/5 border border-[#FFFFFF0D]"}`}>
                <img src={btn.icon} alt={btn.label} className="w-4 h-4" />
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notifications ({unreadCount} unread)</h2>

        <button
          onClick={markSelectedRead}
          disabled={selected.length === 0}
          className="bg-green-500 px-4 py-2 rounded-lg disabled:opacity-40"
        >
          Mark Selected Read
        </button>
      </div> */}

      <div className="space-y-4">
        {filtered.map((n) => (
          <div key={n.id}
            className={`p-4 rounded-xl border transition
            ${n.unread ? "border-[#2B7FFF]" : "border-transparent"}
            bg-[#FFFFFF0D] border-l-4 border-[#2B7FFF]`}>
            <div className="flex gap-3">
              <input type="checkbox"
                checked={selected.includes(n.id)}
                onChange={() => toggleSelect(n.id)}
                className="mt-1 w-4 h-4 bg-[#FFFFFF1A] border border-[#FFFFFF33] rounded" />

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className={`flex items-center gap-2 ${FONTSIZE[18]} ${FONTWEIGHT[700]}`}>
                    <img src={n.icon} alt="" />
                    {n.title}
                    {n.unread && (
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    )}
                  </h3>
                  <div className="flex gap-3 text-gray-400 text-sm mr-10">
                    <button onClick={() => navigate("/notification-details", { state: n }) }
                      className="hover:text-green-400 cursor-pointer">
                      <img src={View} alt="" />
                    </button>
                    <button className="hover:text-red-400 cursor-pointer">
                      <img src={Trash} alt="" />
                    </button>
                  </div>
                </div>
                <p className={`mt-1 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{color: COLORS.secoundy_gray}}>{n.desc}</p>
                <div className={`flex flex-wrap items-center gap-2 mt-2 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`}>
                  <p className="flex items-center gap-1" style={{color: COLORS.secoundy_gray}}>
                    <img src={Clock} alt="" className="w-3 h-3"/>{n.time}</p>
                  <span className="bg-[#FFFFFF0D] px-2 py-1 rounded-2xl"
                  style={{color: "#99A1AF"}}>
                    {n.category}
                  </span>

                  {n.priority && (
                    <span className={`px-2 py-1 rounded-2xl border-2 ${badgeColor(n.priority)}`}>
                      {n.priority}
                    </span>
                  )}

                  {n.action && (
                    <span className="bg-[#FB2C3633] border-2 border-[#FB2C364D] text-red-400 px-2 py-1 rounded-2xl">
                      ACTION REQUIRED
                    </span>
                  )}
                </div>

                
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-500 text-sm mt-8">
        Showing {filtered.length} of {NOTIFICATIONS.length} notifications
      </p>
    </div>
  );
};

export default NotificationsPage;
