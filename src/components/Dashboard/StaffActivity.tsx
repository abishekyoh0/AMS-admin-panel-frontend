import React from "react";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import Tool from "../../assets/Dashboard/tool.png";
import Currency from "../../assets/Dashboard/currency.png";
import Hand from "../../assets/Dashboard/hand.png";
import User from "../../assets/Dashboard/admin.png";

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
  icon?: string;
};

const STAFF_DATA: Staff[] = [
  {
    role: "Security",
    onDuty: "8/10 on duty",
    efficiency: 95,
    color: "#22c55e",
  },
  {
    role: "Maintenance",
    onDuty: "6/8 on duty",
    efficiency: 88,
    color: "#f59e0b",
  },
  {
    role: "Cleaning",
    onDuty: "10/12 on duty",
    efficiency: 92,
    color: "#f59e0b",
  },
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
    icon: Tool,
  },
  {
    id: 2,
    name: "Mike Wilson",
    unit: "B-103",
    action: "paid invoice #INV-8934",
    amount: "$4,200",
    time: "12 mins ago",
    icon: Currency,
  },
  {
    id: 3,
    name: "Guest Entry",
    unit: "C-305",
    action: "visitor checked in at Gate 2",
    time: "18 mins ago",
    icon: Hand,
  },
  {
    id: 4,
    name: "Admin",
    unit: "",
    action: "added new user David Chen",
    time: "32 mins ago",
    icon: User,
  },
];

const StaffActivityDashboard: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF0D] border border-[#FFFFFF0A] rounded-2xl p-6">
          <h2 className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>
            Staff Performance
          </h2>
          <p
            className={`mb-2 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
            style={{ color: COLORS.secoundy_gray }}
          >
            Current duty status and efficiency
          </p>

          <div className="space-y-6">
            {STAFF_DATA.map((staff, index) => (
              <div key={index} className="bg-[#FFFFFF0A] rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className={`${FONTSIZE[14]} ${FONTWEIGHT[700]}`}>
                      {staff.role}
                    </p>
                    <p
                      className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                      style={{ color: COLORS.secoundy_gray }}
                    >
                      {staff.onDuty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>
                      {staff.efficiency}%
                    </p>
                    <p
                      className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                      style={{ color: COLORS.secoundy_gray }}
                    >
                      Efficiency
                    </p>
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

        <div className="bg-[#FFFFFF0D] border border-[#FFFFFF0A] rounded-2xl p-6">
          <h2 className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>
            Recent Activity
          </h2>
          <p
            className={`mb-6 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
            style={{ color: COLORS.secoundy_gray }}
          >
            Live system updates
          </p>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 bg-[#FFFFFF0D] p-4 rounded-xl"
              >
                <div>
                  <img src={item.icon} alt="" />
                </div>
                <div className="flex-1">
                  <p
                    className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
                    style={{ color: COLORS.secoundy_gray }}
                  >
                    <span
                      className={`${FONTSIZE[14]} ${FONTWEIGHT[700]}`}
                      style={{ color: "#00D3F3" }}
                    >
                      {item.name}
                    </span>{" "}
                    • {item.unit}
                  </p>
                  <p
                    className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
                    style={{ color: COLORS.secoundy_gray }}
                  >
                    {item.action} <br />
                    <span
                      className={`${FONTSIZE[14]} ${FONTWEIGHT[700]}`}
                      style={{ color: COLORS.green }}
                    >
                      {item.amount}
                    </span>
                  </p>
                  <p
                    className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                    style={{ color: COLORS.secoundy_gray }}
                  >
                    {item.time}
                  </p>
                </div>

                {item.tag && (
                  <span
                    className={`${FONTSIZE[12]} ${FONTWEIGHT[700]} px-3 py-1 rounded-full`}
                    style={{ color: "#FF6467", background: "#FB2C3633" }}
                  >
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
