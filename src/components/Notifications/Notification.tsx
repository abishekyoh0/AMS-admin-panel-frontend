import React, { useState } from "react";

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
};

const FILTERS: FilterBtn[] = [
  { id: 1, label: "All", key: "all", icon: "🔔" },
  { id: 2, label: "Unread", key: "unread", icon: "🔵" },
  { id: 3, label: "Action Required", key: "action", icon: "⚠️" },
  { id: 4, label: "Security", key: "security", icon: "🛡" },
  { id: 5, label: "Payment", key: "payment", icon: "💰" },
  { id: 6, label: "Complaints", key: "complaints", icon: "📄" },
  { id: 7, label: "System", key: "system", icon: "⚙️" },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
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
    title: "New Admin User Added",
    desc: "David Martinez added as System Administrator",
    time: "1 hour ago",
    category: "System",
    priority: "LOW",
  },
  {
    id: 4,
    title: "Monthly Collection Target Achieved",
    desc: "January collection reached $152,000",
    time: "2 hours ago",
    category: "Payment",
    priority: "MEDIUM",
  },
  {
    id: 5,
    title: "Payment Overdue - Critical",
    desc: "Unit C-102 payment overdue by 30 days",
    time: "3 hours ago",
    category: "Payment",
    priority: "CRITICAL",
    action: true,
  },
];

const NotificationsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = NOTIFICATIONS.filter((n) => {
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

  const markAllRead = () => {
    alert("All notifications marked as read (connect backend)");
  };

  const total = NOTIFICATIONS.length;
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;
  const action = NOTIFICATIONS.filter((n) => n.action).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b0f25] to-[#090d1f] text-white p-4 md:p-6">

      <p className="text-gray-400 text-sm mb-2 cursor-pointer">
        ← Back to Dashboard
      </p>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🔔 Notifications
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            System alerts and administrative notifications
          </p>

          <div className="flex flex-wrap gap-3 mt-3">
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
              {total} Total
            </span>
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs">
              {unread} Unread
            </span>
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
              {action} Need Action
            </span>
          </div>
        </div>

        <button
          onClick={markAllRead}
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold shadow-lg"
        >
          ✔ Mark All Read
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 w-full lg:w-72 outline-none"
          />

          <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-1">
            {FILTERS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.key)}
                className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition
                ${
                  activeFilter === btn.key
                    ? "bg-linear-to-r from-blue-600 to-cyan-500 shadow-lg"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <span>{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((n) => (
          <div
            key={n.id}
            className="p-4 sm:p-5 rounded-xl border border-blue-500/30 
            bg-linear-to-r from-[#121c44] to-[#1a103c] hover:scale-[1.01] transition"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">

              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {n.title}
                  {n.unread && (
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  )}
                </h3>

                <p className="text-gray-400 text-sm mt-1">{n.desc}</p>

                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <span className="bg-white/10 px-2 py-1 rounded">
                    {n.category}
                  </span>

                  {n.priority && (
                    <span className={`px-2 py-1 rounded ${badgeColor(n.priority)}`}>
                      {n.priority}
                    </span>
                  )}

                  {n.action && (
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">
                      ACTION REQUIRED
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-2">{n.time}</p>
              </div>

              <div className="flex gap-3 text-gray-400 text-sm">
                <button className="hover:text-green-400">✔</button>
                <button className="hover:text-red-400">🗑</button>
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