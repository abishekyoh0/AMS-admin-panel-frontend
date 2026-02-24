import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  ComposedChart,
} from "recharts";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import Green from "../../assets/Dashboard/green.png";
import Purple from "../../assets/Dashboard/purple.png";
import Blue from "../../assets/Dashboard/blue.png";
import Arrow from "../../assets/Dashboard/Text.png";
import Spark from "../../assets/Dashboard/spark.png";

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
  gradient?: string;
  border?: string;
  icon?: string;
  subColor?: string;
};

const TREND_DATA: Trend[] = [
  { month: "Aug", occupancy: 64, target: 99, revenue: 110 },
  { month: "Sep", occupancy: 75, target: 90, revenue: 112 },
  { month: "Oct", occupancy: 84, target: 99, revenue: 111 },
  { month: "Nov", occupancy: 67, target: 103, revenue: 115 },
  { month: "Dec", occupancy: 56, target: 102, revenue: 114 },
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
    color: "#05DF72",
    gradient: "linear-gradient(135deg,#00C95026,#00996626)",
    border: "#00C9504D",
    icon: Arrow,
    subColor: "#22c55e",
  },
  {
    title: "Current Rate",
    value: "95%",
    sub: "114 occupied units",
    color: "#FFFFFF",
    gradient: "linear-gradient(135deg,#00B8DB26,#155DFC26)",
    border: "#00B8DB4D",
    subColor: "#00D3F3",
  },
  {
    title: "Avg Revenue",
    value: "$137K",
    sub: "Per month",
    color: "#3b82f6",
    gradient: "flinear-gradient(135deg,#2B7FFF26,#4F39F626)",
    border: "#2B7FFF4D",
    subColor: "#51A2FF",
  },
  {
    title: "Target Achievement",
    value: "103%",
    sub: "Above goal",
    color: "#05DF72",
    gradient: "linear-gradient(135deg,#AD46FF26,#E6007626)",
    border: "#AD46FF4D",
    icon: Spark,
    subColor: "#C27AFF",
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
          color: "white",
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

const overall =
  Math.round(
    PERFORMANCE.reduce((a, b) => a + b.value, 0) / PERFORMANCE.length,
  ) || 0;

const getStatus = () => {
  if (overall >= 90) return { text: "Excellent Performance", color: "#22c55e" };
  if (overall >= 75) return { text: "Good Performance", color: "#3b82f6" };
  if (overall >= 60) return { text: "Average", color: "#f59e0b" };
  return { text: "Poor", color: "#ef4444" };
};

const status = getStatus();

const radius = 120;
const stroke = 10;
const normalizedRadius = radius - stroke;
const circumference = normalizedRadius * 2 * Math.PI;
// const strokeDashoffset = circumference - (overall / 100) * circumference;

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#FFFFFF0D] border border-[#FFFFFF33] rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <div>
              <h2 className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>
                Occupancy & Revenue Trends
              </h2>
              <p
                className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
                style={{ color: COLORS.secoundy_gray }}
              >
                6-month performance analysis
              </p>
            </div>
            <div
              className={`flex flex-wrap gap-2 ${FONTSIZE[12]} ${FONTWEIGHT[700]}`}
            >
              <span className="flex gap-1 items-center px-3 py-1 bg-[#00C95033] border border-[#05DF724D] rounded-xl">
                <img src={Green} alt="" className={`w-2 h-2`} /> Occupancy
              </span>
              <span className="flex gap-1 items-center px-3 py-1 bg-[#AD46FF33] border border-[#C27AFF4D] rounded-xl">
                <img src={Purple} alt="" className={`w-2 h-2`} /> Target
              </span>
              <span className="flex gap-1 items-center px-3 py-1 bg-[#2B7FFF33] border border-[#51A2FF4D] rounded-xl">
                <img src={Blue} alt="" className={`w-2 h-2`} /> Revenue
              </span>
            </div>
          </div>

          <div className="mt-5 h-[280px] sm:h-[350px] md:h-[420px] lg:h-[420px] xl:h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="purpleFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#22c55e"
                  fill="url(#greenFill)"
                  strokeWidth={2}
                  dot={{
                    r: 5,
                    stroke: "#22c55e",
                    strokeWidth: 2,
                    fill: "#0f172a",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#a855f7"
                  fill="url(#purpleFill)"
                  strokeWidth={2}
                  dot={{
                    r: 5,
                    stroke: "#a855f7",
                    strokeWidth: 2,
                    fill: "#0f172a",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fill="url(#blueFill)"
                  strokeWidth={2}
                  dot={{
                    r: 5,
                    stroke: "#3b82f6",
                    strokeWidth: 2,
                    fill: "#0f172a",
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {BOTTOM_STATS.map((item, i) => (
                            <div key={i}
                                style={{ background: item.gradient, border: `1px solid ${item.border}`, boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}
                                className=" rounded-xl p-4">
                                <p className={`mb-2 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>{item.title}</p>
                                <p className={`mb-2 ${FONTSIZE[30]} ${FONTWEIGHT[700]}`} style={{ color: item.color }}>
                                    {item.value}
                                </p>
                                <p className={`flex items-center gap-1 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                                    style={{ color: item.subColor }}>
                                    <img src={item.icon} alt="" />{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

        <div className="bg-[#FFFFFF0D] border border-[#FFFFFF33] rounded-2xl p-4 sm:p-5">
          <h2 className={`${FONTSIZE[24]} ${FONTWEIGHT[700]}`}>
            System Performance
          </h2>
          <p
            className={`mb-4 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
            style={{ color: COLORS.secoundy_gray }}
          >
            Overall health metrics
          </p>

                    <div className="flex flex-col items-center">
                        <div style={{ position: "relative", width: 240, height: 240 }}>
                            <svg height="100%" width="100%">
                                <circle stroke="#ffffff20" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx="120" cy="120" />
                                <circle stroke="url(#gradient)" fill="transparent" strokeWidth={stroke}
                                    strokeLinecap="round" strokeDasharray={`${circumference} ${circumference}`}
                                    // style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease" }}
                                    r={normalizedRadius} cx="120" cy="120" />
                                <defs>
                                    <linearGradient id="gradient">
                                        <stop offset="0%" stopColor="#06b6d4" />
                                        <stop offset="100%" stopColor="#6366f1" />
                                    </linearGradient>
                                </defs>
                            </svg>

              <div
                className="flex flex-col items-center justify-center"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <h1
                  style={{
                    fontSize: 64,
                    fontWeight: 700,
                    background: "linear-gradient(90deg,#22d3ee,#a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {overall}%
                </h1>
                <div
                  className={`px-3 py-1 mt-1 rounded-2xl ${FONTSIZE[14]} ${FONTWEIGHT[700]}`}
                  style={{ background: "#00c95122", color: status.color }}
                >
                  {status.text}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ height: 2, background: "#ffffff22", margin: "25px 0" }}
          />

          <div className="space-y-4">
            {PERFORMANCE.map((p, i) => (
              <div key={i}>
                <div
                  className={`flex justify-between mb-1 ${FONTSIZE[14]} ${FONTWEIGHT[700]}`}
                >
                  <span style={{ color: COLORS.secoundy_gray }}>{p.label}</span>
                  <span>{p.value}%</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 6,
                    background: "#ffffff1a",
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      width: `${p.value}%`,
                      height: 6,
                      background: p.color,
                      borderRadius: 10,
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
