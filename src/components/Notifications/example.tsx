import React, { useState } from "react";

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
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = NOTIFICATIONS.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());

    if (filter === "UNREAD") return n.unread && matchSearch;
    if (filter === "ACTION") return n.action && matchSearch;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f25] to-[#090d1f] text-white p-4 sm:p-6">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">🔔 Notifications</h1>
          <p className="text-gray-400 text-sm">
            System alerts and administrative notifications
          </p>
        </div>

        <button className="bg-green-500 px-4 py-2 rounded-lg font-semibold">
          ✔ Mark All Read
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 outline-none"
          />

          <div className="flex flex-wrap gap-2">
            {["ALL", "UNREAD", "ACTION"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 rounded-full text-sm ${
                  filter === f ? "bg-cyan-600" : "bg-white/10"
                }`}
              >
                {f}
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
            bg-gradient-to-r from-[#121c44] to-[#1a103c] hover:scale-[1.01] transition"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">

              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {n.title}
                  {n.unread && <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>}
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