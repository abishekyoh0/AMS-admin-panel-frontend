import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { COLORS, FONTWEIGHT, FONTSIZE } from "../../constent/uiconstent";
import Purple from "../../assets/Dashboard/purple.png";
import Red from "../../assets/Dashboard/red.png";
import Arrow from "../../assets/Dashboard/Text.png";

type BuildingRevenue = {
  name: string;
  revenue: number;
  expenses: number;
};

type Complaint = {
  category: string;
  resolved: number;
  pending: number;
  total: number;
  color: string;
};

const BUILDING_DATA: BuildingRevenue[] = [
  { name: "Tower-A", revenue: 62000, expenses: 26000 },
  { name: "Tower-B", revenue: 66000, expenses: 35000 },
  { name: "Tower-C", revenue: 64000, expenses: 10000 },
];

const COMPLAINTS: Complaint[] = [
  {
    category: "Plumbing",
    resolved: 28,
    pending: 7,
    total: 35,
    color: "#3b82f6",
  },
  {
    category: "Electrical",
    resolved: 25,
    pending: 3,
    total: 28,
    color: "#22c55e",
  },
  {
    category: "Maintenance",
    resolved: 18,
    pending: 4,
    total: 22,
    color: "#f59e0b",
  },
  {
    category: "Security",
    resolved: 12,
    pending: 3,
    total: 15,
    color: "#ef4444",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="p-3 rounded-2xl"
        style={{
          background: "#0f172a",
          border: "1px solid #ffffff22",
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: 8 }}>{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} style={{ color: item.color }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const totalRevenue = BUILDING_DATA.reduce((a, b) => a + b.revenue, 0);
const totalExpenses = BUILDING_DATA.reduce((a, b) => a + b.expenses, 0);
const netProfit = totalRevenue - totalExpenses;

const SUMMARY_CARDS = [
  {
    title: "Total Revenue",
    value: `$${Math.round(totalRevenue / 1000)}K`,
    color: "#C27AFF",
    bottom: "+8.7%",
    icon: Arrow,
    bottomColor: "#c27aff",
  },
  {
    title: "Total Expenses",
    value: `$${Math.round(totalExpenses / 1000)}K`,
    color: "#FF6467",
    bottom: "34% of revenue",
    bottomColor: "#ff8904",
  },
  {
    title: "Net Profit",
    value: `$${Math.round(netProfit / 1000)}K`,
    color: "#05DF72",
    bottom: "66% of margin",
    bottomColor: "#05df72",
  },
];

const totalComplaints = COMPLAINTS.reduce((a, b) => a + b.total, 0);

const RevenueComplaintsDashboard: React.FC = () => {
  return (
    <div className="mb-8 ">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF0D] border-[#FFFFFF33] rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
            <div>
              <h2 className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>
                Revenue by Building
              </h2>
              <p
                className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
                style={{ color: COLORS.secoundy_gray }}
              >
                Monthly income comparison
              </p>
            </div>
            <div className={`flex gap-2 ${FONTSIZE[12]} ${FONTWEIGHT[700]}`}>
              <span className="flex gap-1 items-center px-3 py-1 bg-[#AD46FF33] border border-[#C27AFF4D] rounded-xl">
                <img src={Purple} alt="" className={`w-2 h-2`} /> Revenue
              </span>
              <span className="flex gap-1 items-center px-3 py-1 bg-[#2B7FFF33] border border-[#51A2FF4D] rounded-xl">
                <img src={Red} alt="" className={`w-2 h-2`} /> Expenses
              </span>
            </div>
          </div>

          <div className="h-56 sm:h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BUILDING_DATA}>
                <CartesianGrid stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="#fbbf24" radius={[15, 15, 0, 0]} />
                <Bar
                  dataKey="expenses"
                  fill="#10b981"
                  radius={[15, 15, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {SUMMARY_CARDS.map((card, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF0D] p-4 rounded-xl text-center  transition duration-300"
              >
                <p
                  className={`mb-1 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                  style={{ color: COLORS.secoundy_gray }}
                >
                  {card.title}
                </p>
                <p
                  className={`mb-1 ${FONTSIZE[24]} ${FONTWEIGHT[700]}`}
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>
                <div
                  className={`flex justify-center items-center gap-2 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                  style={{ color: card.bottomColor }}
                >
                  <img src={card.icon} alt="" />
                  {card.bottom}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFFFFF0D] border border-[#FFFFFF33] rounded-2xl p-4 sm:p-5">
          <h2 className={`mb-1 ${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>
            Complaints Overview
          </h2>
          <p
            className={`mb-6 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
            style={{ color: COLORS.secoundy_gray }}
          >
            By category and status
          </p>

          <div className="space-y-5">
            {COMPLAINTS.map((item, i) => {
              const percent = (item.resolved / item.total) * 100;
              return (
                <div key={i}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2 ">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: item.color }}
                      ></span>
                      {item.category}
                    </span>
                    <span className={`flex gap-3`}>
                      <p
                        className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                        style={{ color: "#05df72" }}
                      >
                        {item.resolved} resolved
                      </p>
                      <p
                        className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                        style={{ color: "#ff8904" }}
                      >
                        {item.pending} pending{" "}
                      </p>
                      {item.total}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded">
                    <div
                      className="h-2 rounded"
                      style={{ width: `${percent}%`, background: item.color }}
                    />
                  </div>
                  <p
                    className={`mt-1 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                    style={{ color: COLORS.secoundy_gray }}
                  >
                    Resolution Rate: {percent.toFixed(0)}%
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 border-t-2 border-white/10 pt-4">
            <div className="flex flex-col justify-center items-center">
              <p
                className={`mt-1 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                style={{ color: COLORS.secoundy_gray }}
              >
                Total Complaints
              </p>
              <p className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>
                {totalComplaints}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p
                className={`mt-1 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                style={{ color: COLORS.secoundy_gray }}
              >
                Avg Resolution Time
              </p>
              <p
                className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}
                style={{ color: "#00D3F3" }}
              >
                2.3 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueComplaintsDashboard;
