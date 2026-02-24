import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import BackIcon from "../../assets/notification/back-arrow.png";
import Search from "../../assets/notification/search.png"
import Bell from "../../assets/notification/bell1.png"
import { X } from "lucide-react";

type StatCard = {
  id: number;
  title: string;
  value: number | string;
  color: string;
  bg: string;
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
  priority: string;
  status: string;
  totalSent: number;
  read: number;
  unread: number;
  createdAt?: string;
  scheduledFor?: string;
  expiresOn?: string;
};

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "🚨 EMERGENCY: Fire Drill on Feb 25",
    desc: "Mandatory fire drill scheduled for February 25th at 11:00 AM.",
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
    title: "Water Supply Maintenance - Sunday",
    desc: "Water supply will be suspended Sunday for tank cleaning.",
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
    title: "Community Holi Celebration 2026",
    desc: "Join us for Holi celebration in community garden.",
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
  { id: 1, title: "Total Announcements", value: 5, color: "#60a5fa", bg: "bg-blue-500/10" },
  { id: 2, title: "Published", value: 3, color: "#22c55e", bg: "bg-green-500/10" },
  { id: 3, title: "Scheduled", value: 1, color: "#f59e0b", bg: "bg-yellow-500/10" },
  { id: 4, title: "Expired", value: 1, color: "#ef4444", bg: "bg-red-500/10" },
  { id: 5, title: "Total Sent", value: 1200, color: "#a855f7", bg: "bg-purple-500/10" },
  { id: 6, title: "Total Read", value: 842, color: "#06b6d4", bg: "bg-cyan-500/10" },
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

const AnnouncementModal = ({
  item,
  onClose,
}: {
  item: Announcement;
  onClose: () => void;
}) => {
  const percent =
    item.totalSent === 0
      ? 0
      : Math.round((item.read / item.totalSent) * 100);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-linear-to-br from-[#111633] to-[#0b0f25] border border-white/10 rounded-2xl p-6 text-white relative">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-white text-xl"
        >
          <X />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
            <img src={Bell} alt="" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-gray-400 text-sm">ANN-00{item.id}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5 text-xs">
          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded">
            {item.tag}
          </span>
          <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded">
            {item.priority}
          </span>
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded">
            {item.status}
          </span>
          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded">
            📌 Pinned
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
              <p className="text-2xl font-bold text-yellow-400">{item.unread}</p>
              <p className="text-gray-400 text-xs">Unread</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-white/10 border border-white/20 py-3 rounded-xl hover:bg-white/20 transition"
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

  const viewDetails = (item: Announcement) => {
    setSelected(item);
  };

  const pinAnnouncement = (_id: number) => {
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
    <div style={{ color: COLORS.primary_white }} className="p-4 sm:p-6">

      <ToastContainer position="top-right" autoClose={2000} />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 cursor-pointer"
        style={{ color: COLORS.secoundy_gray }}
      >
        <img src={BackIcon} className="w-4 h-4" />
        Back to Notification
      </button>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">📢 Announcement Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            Create and manage resident announcements
          </p>
        </div>

        <button
          onClick={() => navigate("/create-announcement")}
          className="bg-linear-to-r from-purple-600 to-pink-500 px-5 py-2 rounded-xl font-semibold shadow-lg"
        >
          + Create Announcement
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {STATS.map((card) => (
          <div key={card.id} className={`rounded-xl p-4 border border-white/10 ${card.bg}`}>
            <p className="text-xs text-gray-400">{card.title}</p>
            <h2 className="text-2xl font-bold mt-1" style={{ color: card.color }}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl px-3 py-2 mb-4">
            <img src={Search} className="w-4 h-4 opacity-70" />
            <input
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`bg-transparent outline-none w-full ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} />
          </div>

        <div className="flex justify-between flex-col lg:flex-row gap-4 mt-4">

          <div className="flex gap-3 overflow-x-auto">
            {STATUS_FILTERS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setStatus(btn.key)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap ${
                  status === btn.key
                    ? "bg-linear-to-r from-pink-500 to-purple-600"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {CATEGORY_FILTERS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setCategory(btn.key)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap ${
                  category === btn.key
                    ? "bg-linear-to-r from-blue-600 to-cyan-500"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filtered.map((item) => {
          const readPercent =
            item.totalSent === 0 ? 0 : Math.round((item.read / item.totalSent) * 100);

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-yellow-500/30 bg-linear-to-r from-[#0f1635] to-[#0a0f2a] p-5 shadow-lg"
            >
              <h2 className="font-semibold text-lg">{item.title}</h2>

              <div className="flex flex-wrap gap-2 mt-2 text-xs">
                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">{item.tag}</span>
                <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">{item.priority}</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">{item.status}</span>
              </div>

              <p className="text-gray-400 mt-3 text-sm">{item.desc}</p>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4 grid grid-cols-3 text-center">
                <div>
                  <p className="text-gray-400 text-xs">Total Sent</p>
                  <p className="text-lg font-bold">{item.totalSent}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Read</p>
                  <p className="text-green-400 font-bold">{item.read} ({readPercent}%)</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Unread</p>
                  <p className="text-yellow-400 font-bold">{item.unread}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={() => viewDetails(item)} className="bg-blue-600 px-4 py-2 rounded-lg text-sm">View</button>
                <button onClick={() => pinAnnouncement(item.id)} className="bg-yellow-500 px-4 py-2 rounded-lg text-sm">Pin</button>
                <button onClick={() => resendAnnouncement(item.id)} className="bg-purple-600 px-4 py-2 rounded-lg text-sm">Resend</button>
                <button onClick={() => deleteAnnouncement(item.id)} className="bg-red-600 px-4 py-2 rounded-lg text-sm">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      {selected && (
        <AnnouncementModal
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
      
    </div>
  );
};

export default AnnouncementManagement;