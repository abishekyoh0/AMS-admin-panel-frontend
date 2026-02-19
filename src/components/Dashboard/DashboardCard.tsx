import React from "react";

type StatCard = {
  title: string;
  value: string | number;
  sub: string;
  color: string;
};

type Alert = {
  title: string;
  desc: string;
  time: string;
  priority: "high" | "critical";
};

type BottomCard = {
  title: string;
  value: string | number;
  sub: string;
  color: string;
};

const STATS: StatCard[] = [
  { title: "Buildings", value: 3, sub: "100% operational", color: "#0ea5e9" },
  { title: "Total Units", value: 120, sub: "40 per building", color: "#a855f7" },
  { title: "Occupied", value: 114, sub: "+2 this month", color: "#22c55e" },
  { title: "Vacant Units", value: 6, sub: "-1 this week", color: "#f97316" },
  { title: "Residents", value: 145, sub: "114 households", color: "#eab308" },
  { title: "Staff Members", value: 28, sub: "24 on duty", color: "#06b6d4" },
];

const ALERTS: Alert[] = [
  {
    title: "Payment Overdue",
    desc: "Unit C-102 - 60 days overdue",
    time: "2 hours ago",
    priority: "critical",
  },
  {
    title: "Maintenance Request",
    desc: "Elevator B not working",
    time: "4 hours ago",
    priority: "high",
  },
  {
    title: "Security Alert",
    desc: "Unauthorized access attempt",
    time: "6 hours ago",
    priority: "high",
  },
];

const BOTTOM: BottomCard[] = [
  { title: "Complaints Today", value: "3 Open", sub: "Resolved: 15", color: "#f59e0b" },
  { title: "Revenue (Month)", value: "$152K", sub: "Target $140K", color: "#10b981" },
  { title: "Visitors Today", value: 24, sub: "22 approved", color: "#3b82f6" },
  { title: "Booking Requests", value: 5, sub: "Approved: 18", color: "#a855f7" },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="text-white mb-8">

      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Control Center</h1>
          <p className="text-gray-400 text-sm">
            Complete system overview and management dashboard
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-green-600 px-4 py-2 rounded-lg">
            + Quick Add
          </button>
          <button className="bg-pink-600 px-4 py-2 rounded-lg">
            Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {STATS.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <p className="text-2xl font-bold" style={{ color: item.color }}>
              {item.value}
            </p>
            <p className="text-sm">{item.title}</p>
            <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="border border-red-500/30 rounded-xl p-5 mb-8 bg-red-500/10">
        <h2 className="text-lg font-semibold mb-4">🚨 Critical Alerts</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {ALERTS.map((a, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between">
                <h3 className="font-semibold">{a.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    a.priority === "critical"
                      ? "bg-red-600/30 text-red-400"
                      : "bg-orange-500/30 text-orange-400"
                  }`}
                >
                  {a.priority}
                </span>
              </div>

              <p className="text-gray-400 text-sm mt-2">{a.desc}</p>
              <p className="text-xs text-gray-500 mt-2">{a.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {BOTTOM.map((card, i) => (
          <div
            key={i}
            className="rounded-xl p-5 border border-white/10 bg-white/5"
          >
            <p className="text-2xl font-bold" style={{ color: card.color }}>
              {card.value}
            </p>
            <p className="text-sm mt-1">{card.title}</p>
            <p className="text-xs text-gray-400 mt-2">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
