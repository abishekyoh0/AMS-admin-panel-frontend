import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import BackIcon from "../../assets/notification/back-arrow.png";
import Search from "../../assets/notification/search.png";
import { X } from "lucide-react";
import CreateAnnouncement from "./CreateAnnouncement";
import Notify from "../../assets/Announcement/Icon.png"
import Add from "../../assets/Announcement/Iconn.png"
import Alarm from "../../assets/Announcement/Icon (2).png"
import Tick from "../../assets/Announcement/Icon (3).png"
import Clock from "../../assets/Announcement/Icon (4).png"
import Close from "../../assets/Announcement/Icon (5).png"
import Send from "../../assets/Announcement/Icon (6).png"
import Eye from "../../assets/Announcement/Icon (7).png"
import EMERGENCY from "../../assets/Announcement/alarm.png"
import View from "../../assets/Announcement/Icon (13).png"
import Pin from "../../assets/Announcement/Icon (14).png"
import Resend from "../../assets/Announcement/Icon (15).png"
import DeleteIcon from "../../assets/Announcement/Icon (16).png"
import Schedule from "../../assets/Announcement/Icon (10).png"
import Published from "../../assets/Announcement/Icon (18).png"

type StatCard = {
  id: number;
  title: string;
  value: number | string;
  color: string;
  bg: string;
  icon?: string;
  iconBg: string;
  pin?:boolean;
};

type Filter = {
  id: number;
  label: string;
  key: string;
};

type Announcement = {
  id: number;
  title: string;
  desc: string;
  tag: string;
  priority?: "Low" | "Medium" | "High" | "Emergency";
  status: "Scheduled" | "Published";
  totalSent: number;
  read: number;
  unread: number;
  createdAt?: string;
  scheduledFor?: string;
  expiresOn?: string;
  icon?: string,
};

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    icon: EMERGENCY,
    title: "EMERGENCY: Fire Drill on Feb 25",
    desc: "Mandatory fire drill scheduled for February 25th at 11:00 AM. All residents must participate. Assembly point: Main Parking Area.",
    tag: "Emergency",
    priority: "Emergency",
    status: "Scheduled",
    totalSent: 0,
    read: 0,
    unread: 0,
    createdAt: "2026-02-20 10:30:00",
    scheduledFor: "2026-02-24 08:00:00",
    expiresOn: "2026-02-25",
  },
  {
    id: 2,
    icon: "",
    title: "Water Supply Maintenance - Sunday",
    desc: "Water supply will be suspended on Sunday, February 23rd from 10:00 AM to 4:00 PM for routine tank cleaning and maintenance.",
    tag: "Maintenance",
    priority: "High",
    status: "Published",
    totalSent: 450,
    read: 312,
    unread: 138,
    createdAt: "2026-02-20 10:30:00",
    scheduledFor: "2026-02-24 08:00:00",
    expiresOn: "2026-02-25",
  },
  {
    id: 3,
    icon: "",
    title: "Community Holi Celebration 2026",
    desc: "Join us for a vibrant Holi celebration on March 14th at 3:00 PM in the community garden. Music, colors, and snacks provided!",
    tag: "Event",
    priority: "Medium",
    status: "Published",
    totalSent: 450,
    read: 287,
    unread: 163,
    createdAt: "2026-02-20 10:30:00",
    scheduledFor: "2026-02-24 08:00:00",
    expiresOn: "2026-02-25",
  },
];

const STATS: StatCard[] = [
  { id: 1, title: "Total Announcements", value: 5, color: "#60a5fa", bg: "bg-linear-to-r from-[#2B7FFF1A] to-[#00B8DB1A] border-[#51A2FF4D]", icon: Alarm, iconBg: "#2B7FFF33" ,pin:true},
  { id: 2, title: "Published", value: 3, color: "#22c55e", bg: "bg-linear-to-r from-[#00C9501A] to-[#00BC7D1A] border-[#05DF724D]", icon: Tick, iconBg: "#00C95033" },
  { id: 3, title: "Scheduled", value: 1, color: "#f59e0b", bg: "bg-linear-to-r from-[#F0B1001A] to-[#FE9A001A] border-[#FDC7004D]", icon: Clock, iconBg: "#F0B10033" },
  { id: 4, title: "Expired", value: 1, color: "#ef4444", bg: "bg-linear-to-r from-[#FB2C361A] to-[#FF20561A] border-[#FF64674D]", icon: Close, iconBg: "#FB2C3633" },
  { id: 5, title: "Total Sent", value: 1200, color: "#a855f7", bg: "bg-linear-to-r from-[#AD46FF1A] to-[#F6339A1A] border-[#C27AFF4D]", icon: Send, iconBg: "#AD46FF33" },
  { id: 6, title: "Total Read", value: 842, color: "#06b6d4", bg: "bg-linear-to-r from-[#00B8DB1A] to-[#00BBA71A] border-[#00D3F34D]", icon: Eye, iconBg: "#00B8DB33" },
];

const STATUS_FILTERS: Filter[] = [
  { id: 1, label: "All", key: "all" },
  { id: 2, label: "Scheduled", key: "scheduled" },
  { id: 3, label: "Published", key: "published" },
];

const CATEGORY_FILTERS: Filter[] = [
  { id: 1, label: "All", key: "all" },
  { id: 2, label: "General", key: "general" },
  { id: 3, label: "Maintenance", key: "maintenance" },
  { id: 4, label: "Emergency", key: "emergency" },
  { id: 5, label: "Event", key: "event" },
];

const badgeColor = (priority?: string) => {
  switch (priority) {
    case "Emergency":
      return "bg-red-500/20 text-red-400";
    case "High":
      return "bg-orange-500/20 text-orange-400";
    case "Medium":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-blue-500/20 text-blue-400";
  }
};

type Delete = {
  onConfirm: () => void;
  onCancel: () => void;
};

const Delete = ({
  onConfirm,
  onCancel,
}: Delete) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full sm:w-[90%] md:w-[500px]  bg-gradient-to-br from-[#0F172B] to-[#101828] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <X size={18} className="text-gray-300" />
        </button>
        <div className="text-center">
          <h2 className={`${FONTSIZE[30]} ${FONTWEIGHT[700]} text-white`}>
            Delete Parking Slot
          </h2>
          <p
            className={`${FONTSIZE[16]} ${FONTWEIGHT[400]} text-[#99A1AF] mt-2`}
          >
            Are you sure you want to delete this parking slot? This action
            cannot be undone.
          </p>
        </div>
        <div className="flex gap-4 justify-center mt-8 ">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-[#FFFFFF0D]  hover:opacity-90 transition cursor-pointer flex items-center"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#FB2C36] to-[#EC003F] hover:opacity-90 transition cursor-pointer flex items-center"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}


const AnnouncementModal = ({ item, onClose }: {
  item: Announcement;
  onClose: () => void;
}) => {
  const percent =
    item.totalSent === 0 ? 0 : Math.round((item.read / item.totalSent) * 100);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl max-h-125 overflow-y-auto bg-linear-to-br from-[#0F172B] to-[#101828] border border-[#FFFFFF33] rounded-2xl p-6 text-white relative">
        <button onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-white text-xl cursor-pointer">
          <X />
        </button>

        <div className="flex gap-4 mb-6">
          <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
            <img src={Notify} alt="" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <img src={item.icon} alt="" className="w-5 h-5" />
              <h2 className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>{item.title}</h2>
            </div>
            <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
              style={{ color: COLORS.secoundy_gray }}>ANN-00{item.id}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5 text-xs">
          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-xl">
            {item.tag}
          </span>
          <span className={`px-2 py-1 rounded-xl ${badgeColor(item.priority)}`}>
            {item.priority}
          </span>
          <span className={`flex items-center px-2 py-1 rounded-xl ${item.status == "Scheduled" ? "bg-[#2B7FFF33] text-[#51A2FF]" : "bg-[#00C95033] text-[#05DF72]"}`}>
            {item.status == "Scheduled" ? <img src={Schedule} alt="" className="w-4 h-4 mr-1 inline" /> : <img src={Published} alt="" className="w-4 h-4 mr-1 inline" />}
            {item.status}
          </span>
          <span className="flex gap-2 items-center bg-linear-to-r from-[#F0B100] to-[#E17100] px-4 py-1 rounded-lg text-sm cursor-pointer"
            style={{ boxShadow: "0px 4px 6px -4px #F0B10040,0px 10px 15px -3px #F0B10040" }}>
            <img src={Pin} alt="" /> Pinned
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-400 text-sm">{item.desc}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
          <h3 className="font-semibold mb-4">Details</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Audience:</p>
              <p>All Residents</p>
            </div>
            <div>
              <p className="text-gray-400">Created By:</p>
              <p>Admin - John Anderson</p>
            </div>
            <div>
              <p className="text-gray-400">Created At:</p>
              <p>{item.createdAt}</p>
            </div>
            <div>
              <p className="text-gray-400">Scheduled For:</p>
              <p>{item.scheduledFor}</p>
            </div>
            <div>
              <p className="text-gray-400">Expires On:</p>
              <p>{item.expiresOn}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
          <h3 className="font-semibold mb-4">Statistics</h3>
          <div className="grid grid-cols-3 text-center">
            <div>
              <p className="text-2xl font-bold">{item.totalSent}</p>
              <p className="text-gray-400 text-xs">Total Sent</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">{item.read}</p>
              <p className="text-gray-400 text-xs">Read ({percent}%)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-400">
                {item.unread}
              </p>
              <p className="text-gray-400 text-xs">Unread</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-white/10 border border-white/20 py-3 rounded-xl hover:bg-white/20 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const AnnouncementManagement: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(ANNOUNCEMENTS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const viewDetails = (item: Announcement) => {
    setSelected(item);
  };

  const pinAnnouncement = (_id: number) => {
    const item = data.find((d) => d.id === _id);
    if (!item) return;
    toast.success("Announcement pinned");
  };

  const resendAnnouncement = (_id: number) => {
    toast.success("Announcement resend");
  };

  const deleteAnnouncement = (id: number) => {
    setData(data.filter((item) => item.id !== id));
    toast.error("Announcement deleted");
  };

  const filtered = data.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "all" || item.status.toLowerCase() === status;

    const matchCategory =
      category === "all" || item.tag.toLowerCase() === category;

    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div style={{ color: COLORS.primary_white }}>
      <ToastContainer position="top-right" autoClose={2000} />

      <button onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 cursor-pointer"
        style={{ color: COLORS.secoundy_gray }}>
        <img src={BackIcon} className="w-4 h-4" />
        Back to Notification
      </button>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div>
            <img src={Notify} alt="" className="bg-linear-to-r from-[#AD46FF33] to-[#F6339A33] p-2 border border-[#C27AFF4D] rounded-xl" />
          </div>
          <div>
            <h1 className={`${FONTSIZE[36]} ${FONTWEIGHT[700]}`}>
              Announcement Management
            </h1>
            <p className={`${FONTSIZE[16]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>
              Create and manage resident announcements
            </p>
          </div>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex gap-2 items-center bg-linear-to-r from-[#AD46FF] to-[#E60076] px-5 py-2 rounded-xl font-semibold shadow-lg cursor-pointer"
          style={{ boxShadow: "0px 4px 6px -4px #AD46FF40,0px 10px 15px -3px #AD46FF40" }}>
          <img src={Add} alt="" className="w-5 h-5" /> Create Announcement
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {STATS.map((card) => (
          <div
            key={card.id}
            className={`rounded-xl p-4 border-2 ${card.bg}`}>
            <h2 className={`flex justify-between items-center mt-1 mb-5 ${FONTSIZE[24]} ${FONTWEIGHT[700]}`}
              style={{ color: card.color }}>
              <img src={card.icon} alt="" className="p-2 rounded-xl" style={{ background: card.iconBg }} /> {card.value}
            </h2>
            <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>{card.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-linear-to-r from-[#0F172B80] to-[#10182880] border-2 border-[#FFFFFF33] rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-2 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl px-3 py-2 mb-4">
          <img src={Search} className="w-4 h-4 opacity-70" />
          <input
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`bg-transparent outline-none w-full ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
          />
        </div>

        <div className="flex justify-between flex-col lg:flex-row gap-4 mt-4">
          <div className="flex gap-3 overflow-x-auto">
            {STATUS_FILTERS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setStatus(btn.key)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap cursor-pointer ${FONTSIZE[16]} ${FONTWEIGHT[700]}
                  ${status === btn.key ? "bg-linear-to-r from-[#AD46FF] to-[#F6339A]" : "bg-[#FFFFFF0D] border border-[#FFFFFF1A]"}`}
                style={{ boxShadow: "0px 4px 6px -4px #AD46FF40,0px 10px 15px -3px #AD46FF40" }}>
                {btn.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {CATEGORY_FILTERS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setCategory(btn.key)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap cursor-pointer ${FONTSIZE[16]} ${FONTWEIGHT[700]}
                  ${category === btn.key ? "bg-linear-to-r from-[#00B8DB] to-[#2B7FFF]" : "bg-[#FFFFFF0D] border border-[#FFFFFF1A]"}`}
                style={{ boxShadow: "0px 4px 6px -4px #00B8DB40,0px 10px 15px -3px #00B8DB40" }}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filtered.map((item) => {
          const readPercent = item.totalSent === 0 ? 0 : Math.round((item.read / item.totalSent) * 100);

          return (
            <div key={item.id}
              className="flex gap-5 rounded-2xl border-2 border-[#F0B10080] bg-linear-to-r from-[#0F172B80] to-[#10182880] p-5 shadow-lg"
              style={{ boxShadow: "0px 4px 6px -4px #F0B1001A,0px 10px 15px -3px #F0B1001A" }}>
              <img src={Notify} alt="" className="bg-linear-to-r from-[#AD46FF33] to-[#F6339A33] p-2 border border-[#C27AFF4D] rounded-xl w-15 h-15" />
              <div className="w-full">
                <div className={`flex items-center flex-wrap gap-2 mt-2 ${FONTSIZE[12]} ${FONTWEIGHT[700]}`}>
                  <img src={item.icon} alt="" className="w-5 h-5" />
                  <h2 className={`${FONTSIZE[20]} ${FONTWEIGHT[700]}`}>{item.title}</h2>
                  <span className={`bg-red-500/20 text-red-400 px-2 py-1 rounded-xl `}>
                    <img src="" alt="" /> {item.tag}
                  </span>
                  <span className={`px-2 py-1 rounded-xl ${badgeColor(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className={`flex items-center px-2 py-1 rounded-xl ${item.status == "Scheduled" ? "bg-[#2B7FFF33] text-[#51A2FF]" : "bg-[#00C95033] text-[#05DF72]"}`}>
                    {item.status == "Scheduled" ? <img src={Schedule} alt="" className="w-4 h-4 mr-1 inline" /> : <img src={Published} alt="" className="w-4 h-4 mr-1 inline" />}
                    {item.status}
                  </span>
                </div>

                <p className="text-gray-400 mt-3 text-sm">{item.desc}</p>

                <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mt-4 grid grid-cols-3 text-center">
                  <div>
                    <p className="text-gray-400 text-xs">Total Sent</p>
                    <p className="text-lg font-bold">{item.totalSent}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Read</p>
                    <p className="text-green-400 font-bold">
                      {item.read} ({readPercent}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Unread</p>
                    <p className="text-yellow-400 font-bold">{item.unread}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <button onClick={() => viewDetails(item)} className="flex gap-2 items-center bg-linear-to-r from-[#2B7FFF] to-[#0092B8] px-4 py-2 rounded-lg text-sm cursor-pointer"
                    style={{ boxShadow: "0px 4px 6px -4px #2B7FFF40,0px 10px 15px -3px #2B7FFF40" }}>
                    <img src={View} alt="" />View Details</button>
                  <button onClick={() => pinAnnouncement(item.id)} className="flex gap-2 items-center bg-linear-to-r from-[#F0B100] to-[#E17100] px-4 py-2 rounded-lg text-sm cursor-pointer"
                    style={{ boxShadow: "0px 4px 6px -4px #F0B10040,0px 10px 15px -3px #F0B10040" }}>
                    <img src={Pin} alt="" />Pin</button>
                  <button onClick={() => resendAnnouncement(item.id)} className="flex gap-2 items-center bg-linear-to-r from-[#AD46FF] to-[#E60076] px-4 py-2 rounded-lg text-sm cursor-pointer"
                    style={{ boxShadow: "0px 4px 6px -4px #AD46FF40,0px 10px 15px -3px #AD46FF40" }}>
                    <img src={Resend} alt="" />Resend</button>
                  <button onClick={() => { setSelected(item); setShowDelete(true); }} className="flex gap-2 items-center bg-linear-to-r from-[#FB2C36] to-[#EC003F] px-4 py-2 rounded-lg text-sm cursor-pointer"
                    style={{ boxShadow: "0px 4px 6px -4px #FB2C3640,0px 10px 15px -3px #FB2C3640" }}>
                    <img src={DeleteIcon} alt="" />Delete</button>
                </div>
              </div>

            </div>
          );
        })}
      </div>


      {selected && (
        <AnnouncementModal item={selected} onClose={() => setSelected(null)} />
      )}

      {showCreate && (
        <CreateAnnouncement onClose={() => setShowCreate(false)} />
      )}

      {showDelete && (
        <Delete
          onConfirm={() => {
            deleteAnnouncement(selected?.id || 0);
            setShowDelete(false);
            setSelected(null);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
};

export default AnnouncementManagement;
