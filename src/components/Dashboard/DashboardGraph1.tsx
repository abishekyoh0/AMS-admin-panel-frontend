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

const totalRevenue = BUILDING_DATA.reduce((a, b) => a + b.revenue, 0);
const totalExpenses = BUILDING_DATA.reduce((a, b) => a + b.expenses, 0);
const netProfit = totalRevenue - totalExpenses;

const totalComplaints = COMPLAINTS.reduce((a, b) => a + b.total, 0);

const RevenueComplaintsDashboard: React.FC = () => {
  return (
    <div className="text-white mb-8">

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-lg font-bold">Revenue by Building</h2>
          <p className="text-xs text-gray-400 mb-4">
            Monthly income comparison
          </p>

          <div className="h-65">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BUILDING_DATA}>
                <CartesianGrid stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#fbbf24" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-400">Total Revenue</p>
              <p className="text-xl font-bold text-purple-400">
                ${Math.round(totalRevenue / 1000)}K
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-400">Total Expenses</p>
              <p className="text-xl font-bold text-red-400">
                ${Math.round(totalExpenses / 1000)}K
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-400">Net Profit</p>
              <p className="text-xl font-bold text-green-400">
                ${Math.round(netProfit / 1000)}K
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-lg font-bold">Complaints Overview</h2>
          <p className="text-xs text-gray-400 mb-6">
            By category and status
          </p>

          <div className="space-y-5">
            {COMPLAINTS.map((item, i) => {
              const percent = (item.resolved / item.total) * 100;

              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: item.color }}
                      ></span>
                      {item.category}
                    </span>

                    <span className="text-xs text-gray-400">
                      {item.resolved} resolved • {item.pending} pending •{" "}
                      {item.total}
                    </span>
                  </div>

                  <div className="w-full bg-white/10 h-2 rounded">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${percent}%`,
                        background: item.color,
                      }}
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Resolution Rate: {percent.toFixed(0)}%
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-8 border-t border-white/10 pt-4">
            <div>
              <p className="text-xs text-gray-400">Total Complaints</p>
              <p className="text-xl font-bold">{totalComplaints}</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">Avg Resolution Time</p>
              <p className="text-xl font-bold text-cyan-400">2.3 days</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RevenueComplaintsDashboard;
