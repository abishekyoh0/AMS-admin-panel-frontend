import React from "react";

type Staff = {
  role: string;
  onDuty: string;
  efficiency: number;
  color: string;
};

type Activity = {
  id: number;
  name: string;
  unit: string;
  action: string;
  amount?: string;
  time: string;
  tag?: string;
  icon: string;
};

const STAFF_DATA: Staff[] = [
  { role: "Security", onDuty: "8/10 on duty", efficiency: 95, color: "#22c55e" },
  { role: "Maintenance", onDuty: "6/8 on duty", efficiency: 88, color: "#f59e0b" },
  { role: "Cleaning", onDuty: "10/12 on duty", efficiency: 92, color: "#f59e0b" },
  { role: "Admin", onDuty: "4/5 on duty", efficiency: 90, color: "#f59e0b" },
];

const RECENT_ACTIVITY: Activity[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    unit: "A-204",
    action: "raised complaint #CM-1245",
    time: "5 mins ago",
    tag: "High",
    icon: "🛠",
  },
  {
    id: 2,
    name: "Mike Wilson",
    unit: "B-103",
    action: "paid invoice #INV-8934",
    amount: "$4,200",
    time: "12 mins ago",
    icon: "💰",
  },
  {
    id: 3,
    name: "Guest Entry",
    unit: "C-305",
    action: "visitor checked in at Gate 2",
    time: "18 mins ago",
    icon: "👋",
  },
  {
    id: 4,
    name: "Admin",
    unit: "",
    action: "added new user David Chen",
    time: "32 mins ago",
    icon: "👥",
  },
];

const StaffActivityDashboard: React.FC = () => {
  return (
    <div className="text-white mb-8">

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold">Staff Performance</h2>
          <p className="text-gray-400 text-sm mb-6">
            Current duty status and efficiency
          </p>

          <div className="space-y-6">
            {STAFF_DATA.map((staff, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4">

                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-semibold">{staff.role}</p>
                    <p className="text-xs text-gray-400">{staff.onDuty}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">{staff.efficiency}%</p>
                    <p className="text-xs text-gray-400">Efficiency</p>
                  </div>
                </div>

                <div className="w-full bg-white/10 h-2 rounded">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: `${staff.efficiency}%`,
                      background: staff.color,
                    }}
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold">Recent Activity</h2>
          <p className="text-gray-400 text-sm mb-6">
            Live system updates
          </p>

          <div className="space-y-4">
            {RECENT_ACTIVITY.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 bg-white/5 p-4 rounded-xl"
              >
                <div className="text-2xl">{item.icon}</div>

                <div className="flex-1">
                  <p className="text-sm">
                    <span className="text-cyan-400 font-semibold">
                      {item.name}
                    </span>{" "}
                    • {item.unit}
                  </p>

                  <p className="text-gray-300 text-sm mt-1">
                    {item.action}{" "}
                    {item.amount && (
                      <span className="text-green-400 font-semibold">
                        {item.amount}
                      </span>
                    )}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>

                {item.tag && (
                  <span className="bg-red-600/30 text-red-400 text-xs px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffActivityDashboard;
