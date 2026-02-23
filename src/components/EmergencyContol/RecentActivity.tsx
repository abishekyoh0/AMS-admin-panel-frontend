import React from "react";
import type{ Emergency } from "../../pages/EmergencyControl/EmergencyControl";

interface Props {
  data: Emergency[];
}

const RecentActivity: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-[#FFFFFF0D] p-5 rounded-xl border border-white/10">
      <h3 className="mb-4 font-semibold">🕒 Recent Activity</h3>

      <div className="space-y-3">
        {data.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
          >
            <div>
              <p className="text-sm">{item.type}</p>
              <p className="text-xs text-gray-400">{item.location}</p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full ${
                item.status === "Active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;