import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Trend = {
  month: string;
  occupancy: number;
  target: number;
  revenue: number;
};

type Performance = {
  label: string;
  value: number;
  color: string;
};

type BottomStat = {
  title: string;
  value: string;
  sub: string;
  color: string;
};

const TREND_DATA: Trend[] = [
  { month: "Aug", occupancy: 94, target: 99, revenue: 110 },
  { month: "Sep", occupancy: 95, target: 100, revenue: 112 },
  { month: "Oct", occupancy: 94, target: 99, revenue: 111 },
  { month: "Nov", occupancy: 97, target: 103, revenue: 115 },
  { month: "Dec", occupancy: 96, target: 102, revenue: 114 },
  { month: "Jan", occupancy: 99, target: 106, revenue: 118 },
];

const PERFORMANCE: Performance[] = [
  { label: "Revenue", value: 85, color: "#3b82f6" },
  { label: "Occupancy", value: 95, color: "#22c55e" },
  { label: "Satisfaction", value: 88, color: "#8b5cf6" },
  { label: "Maintenance", value: 92, color: "#06b6d4" },
  { label: "Collections", value: 90, color: "#10b981" },
  { label: "Security", value: 96, color: "#14b8a6" },
];

const BOTTOM_STATS: BottomStat[] = [
  {
    title: "Avg Occupancy",
    value: "93.8%",
    sub: "+1.2% vs last 6mo",
    color: "#22c55e",
  },
  {
    title: "Current Rate",
    value: "95%",
    sub: "114 occupied units",
    color: "#3b82f6",
  },
  {
    title: "Avg Revenue",
    value: "$137K",
    sub: "Per month",
    color: "#60a5fa",
  },
  {
    title: "Target Achievement",
    value: "103%",
    sub: "Above goal",
    color: "#a855f7",
  },
];

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className=" text-white mb-8">

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">

          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Occupancy & Revenue Trends</h2>
              <p className="text-xs text-gray-400">6-month performance analysis</p>
            </div>

            <div className="flex gap-2 text-xs">
              <span className="px-3 py-1 bg-green-600/20 rounded">Occupancy</span>
              <span className="px-3 py-1 bg-purple-600/20 rounded">Target</span>
              <span className="px-3 py-1 bg-blue-600/20 rounded">Revenue</span>
            </div>
          </div>

          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA}>
                <CartesianGrid stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line type="monotone" dataKey="occupancy" stroke="#22c55e" />
                <Line type="monotone" dataKey="target" stroke="#a855f7" />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {BOTTOM_STATS.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400">{item.title}</p>
                <p className="text-xl font-bold" style={{ color: item.color }}>
                  {item.value}
                </p>
                <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

          <h2 className="text-lg font-bold">System Performance</h2>
          <p className="text-xs text-gray-400 mb-6">Overall health metrics</p>

          <div className="flex flex-col items-center mb-6">
            <div className="w-40 h-40 rounded-full border-10 border-cyan-400 flex items-center justify-center text-4xl font-bold">
              91%
            </div>
            <p className="text-green-400 mt-2 text-sm">Excellent Performance</p>
          </div>

          <div className="space-y-4">
            {PERFORMANCE.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{p.label}</span>
                  <span>{p.value}%</span>
                </div>

                <div className="w-full bg-white/10 h-2 rounded">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: `${p.value}%`,
                      background: p.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsDashboard;
