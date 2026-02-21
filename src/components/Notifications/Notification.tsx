import React, { useState } from "react";

type FilterBtn = {
  id: number;
  label: string;
  key: string;
  icon: string;
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

const NotificationsHeader: React.FC = () => {
  const [active, setActive] = useState("unread");

  return (
    <div className="text-white">

      <p className="text-gray-400 text-sm mb-3 cursor-pointer">
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
              15 Total
            </span>
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs">
              6 Unread
            </span>
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs">
              9 Need Action
            </span>
          </div>
        </div>

        <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold shadow-lg">
          ✔ Mark All Read
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full">

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            placeholder="Search notifications..."
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 w-full lg:w-72 outline-none"
          />

          <div className="flex gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap pb-1">
            {FILTERS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActive(btn.key)}
                className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition
                ${
                  active === btn.key
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

    </div>
  );
};

export default NotificationsHeader;