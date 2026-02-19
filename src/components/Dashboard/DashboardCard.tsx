import React from "react";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import Buildings from "../../assets/Dashboard/build.png"
import Note from "../../assets/Dashboard/notes.png"
import Occupied from "../../assets/Dashboard/green-tick.png"
import Vacant from "../../assets/Dashboard/orange-warning.png"
import Residents from "../../assets/Dashboard/user.png"
import Staff from "../../assets/Dashboard/add-user.png"
import Alert from "../../assets/Dashboard/red-warning.png"
import Notepad from "../../assets/Dashboard/notepad.png"
import Stock from "../../assets/Dashboard/currency.png"
import Hand from "../../assets/Dashboard/hand.png"
import Notepencil from "../../assets/Dashboard/notepencil.png"

type Card = {
    id: number;
    icon?: string;
    title: string;
    value: number;
    subtitle: string;
    badge: string;
    badgeColor: string;
    valueColor: string;
    bottomText: string;
    bottomColor: string;
};

type Alert = {
    title: string;
    desc: string;
    time: string;
    priority: "high" | "critical";
};

type BottomGradientCard = {
    id: number;
    icon: string;
    value: string;
    title: string;
    badge: string;
    badgeColor: string;
    badgeText: string;
    gradient: string;
    border: string;
    subLeft: string;
    subRight: string;
    subRightColor: string;
};

const CARDS: Card[] = [
    {
        id: 1,
        icon: Buildings,
        title: "Buildings",
        value: 3,
        subtitle: "Buildings",
        badge: "Active",
        badgeColor: "#3b82f6",
        valueColor: "#38bdf8",
        bottomText: "100% operational",
        bottomColor: "#22c55e",
    },
    {
        id: 2,
        icon: Note,
        title: "Total Units",
        value: 120,
        subtitle: "Total Units",
        badge: "Total",
        badgeColor: "#a855f7",
        valueColor: "#e879f9",
        bottomText: "40 per building",
        bottomColor: "#9ca3af",
    },
    {
        id: 3,
        icon: Occupied,
        title: "Occupied",
        value: 114,
        subtitle: "Occupied",
        badge: "95%",
        badgeColor: "#16a34a",
        valueColor: "#22c55e",
        bottomText: "+2 this month",
        bottomColor: "#22c55e",
    },
    {
        id: 4,
        icon: Vacant,
        title: "Vacant Units",
        value: 6,
        subtitle: "Vacant Units",
        badge: "Available",
        badgeColor: "#f97316",
        valueColor: "#f97316",
        bottomText: "-1 this week",
        bottomColor: "#f97316",
    },
    {
        id: 5,
        icon: Residents,
        title: "Residents",
        value: 145,
        subtitle: "Residents",
        badge: "Active",
        badgeColor: "#eab308",
        valueColor: "#facc15",
        bottomText: "114 households",
        bottomColor: "#eab308",
    },
    {
        id: 6,
        icon: Staff,
        title: "Staff Members",
        value: 28,
        subtitle: "Staff Members",
        badge: "On Duty",
        badgeColor: "#06b6d4",
        valueColor: "#22d3ee",
        bottomText: "24 on duty",
        bottomColor: "#06b6d4",
    },
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

const BOTTOM_CARDS: BottomGradientCard[] = [
    {
        id: 1,
        icon: Notepad,
        value: "3 Open",
        title: "Complaints Today",
        badge: "Urgent",
        badgeColor: "#f59e0b",
        badgeText: "#FDC700",
        gradient: "linear-gradient(135deg,#F0B10033,#FF690033)",
        border: "#FDC7004D",
        subLeft: "Resolved: 15",
        subRight: "83% rate",
        subRightColor: "#22c55e",
    },
    {
        id: 2,
        icon: Stock,
        value: "$152K",
        title: "Revenue (Month)",
        badge: "+8.7%",
        badgeColor: "#22c55e",
        badgeText: "#05DF72",
        gradient: "linear-gradient(135deg,#00C95033,#00BC7D33)",
        border: "#05DF724D",
        subLeft: "Target: $140K",
        subRight: "109%",
        subRightColor: "#22c55e",
    },
    {
        id: 3,
        icon: Hand,
        value: "24",
        title: "Visitors Today",
        badge: "Today",
        badgeColor: "#3b82f6",
        badgeText: "#51A2FF",
        gradient: "linear-gradient(135deg,#2B7FFF33,#00B8DB33)",
        border: "#51A2FF4D",
        subLeft: "Pending: 2",
        subRight: "22 approved",
        subRightColor: "#60a5fa",
    },
    {
        id: 4,
        icon: Notepencil,
        value: "5",
        title: "Booking Requests",
        badge: "Pending",
        badgeColor: "#a855f7",
        badgeText: "#C27AFF",
        gradient: "linear-gradient(135deg,#AD46FF33,#F6339A33)",
        border: "#C27AFF4D",
        subLeft: "Approved: 18",
        subRight: "This week",
        subRightColor: "#c084fc",
    },
];

const AdminDashboard: React.FC = () => {
    return (
        <>
            <div className="flex gap-4 mb-8">
                {CARDS.map((card) => (
                    <div className="w-full p-4 rounded-2xl"
                        key={card.id}
                        style={{ background: "#12162b", border: "1px solid #ffffff1a", boxShadow: "0px 4px 6px -4px #ffffff1a, 0px 10px 15px -3px #ffffff1a" }}>
                        <div className="flex justify-between items-center">
                            <p><img src={card.icon} alt="" /></p>
                            <p className={`px-2 rounded-2xl ${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                                style={{ background: card.badgeColor + "22", color: card.badgeColor }}>
                                {card.badge}</p>
                        </div>
                        <h1 className={`py-2 rounded-2xl ${FONTSIZE[30]} ${FONTWEIGHT[700]}`}
                            style={{ color: card.valueColor, }}>
                            {card.value}
                        </h1>
                        <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`}
                            style={{ color: COLORS.secoundy_gray }}>{card.subtitle}</p>
                        <div style={{ height: 2, background: "#ffffff30", margin: "10px 0", }} />
                        <p className={`${FONTSIZE[12]} ${FONTWEIGHT[400]}`}
                            style={{ color: card.bottomColor, }}>
                            {card.bottomText}
                        </p>
                    </div>
                ))}
            </div>
            <div className="border border-[#FF64674D] rounded-xl p-5 mb-8 bg-linear-to-r from-[#FB2C361A] to-[#FF69001A]">
                <h2 className="flex gap-2 mb-4">
                    <img src={Alert} alt="" className="w-10 h-10" />
                    <div>
                        <p className={`${FONTSIZE[20]} ${FONTWEIGHT[700]}`}>Critical Alerts</p>
                        <p className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>Requires immediate attention</p>
                    </div>
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {ALERTS.map((a, i) => (
                        <div key={i} className="bg-[#FFFFFF0D] rounded-lg p-4 border border-[#FFFFFF33]">
                            <div className="flex justify-between items-center">
                                <h3 className={`${FONTSIZE[16]} ${FONTWEIGHT[700]}`}>{a.title}</h3>
                                <span className={`${FONTSIZE[12]} ${FONTWEIGHT[400]} px-2 py-1 rounded-full ${a.priority === "critical"
                                    ? "bg-red-600/30 text-red-400" : "bg-orange-500/30 text-orange-400"}`}>
                                    {a.priority}
                                </span>
                            </div>
                            <p className={`mt-2 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>{a.desc}</p>
                            <p className={`mt-2 ${FONTSIZE[12]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>{a.time}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                {BOTTOM_CARDS.map((card) => (
                    <div className="px-3 py-4 rounded-2xl"
                        key={card.id}
                        style={{ background: card.gradient, border: `1px solid ${card.border}`, boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}>
                        <div className="flex justify-between items-center mb-4">
                            <img src={card.icon} style={{ fontSize: 26 }}></img>
                            <div className={`px-2 py-1 rounded-full ${FONTSIZE[12]} ${FONTWEIGHT[700]}`}
                                style={{ background: card.badgeColor + "33", color: card.badgeText }}>
                                {card.badge}
                            </div>
                        </div>
                        <h2 className={`${FONTSIZE[30]} ${FONTWEIGHT[700]}`}>{card.value}</h2>
                        <p className={`${FONTSIZE[16]} ${FONTWEIGHT[400]}`} style={{ color: "#D1D5DC" }}>{card.title}</p>
                        <div className="my-3" style={{ height: 1, background: "rgba(255,255,255,0.2)" }} />
                        <div className="flex justify-between items-center">
                            <span className={`${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{ color: COLORS.secoundy_gray }}>{card.subLeft}</span>
                            <span className={`${FONTSIZE[14]} ${FONTWEIGHT[700]}`} style={{ color: card.subRightColor }}>
                                {card.subRight}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminDashboard;
