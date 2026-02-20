import React from "react";
import { COLORS, FONTWEIGHT, FONTSIZE } from "../../constent/uiconstent";
import Building from "../../assets/Dashboard/building.png"
import Admin from "../../assets/Dashboard/admin.png"
import Graph from "../../assets/Dashboard/graph.png"
import Stock from "../../assets/Dashboard/stock.png"
import User from "../../assets/Dashboard/user.png"
import Build from "../../assets/Dashboard/build.png"

type AdminCard = {
  id: number;
  title: string;
  desc: string;
  action: string;
  icon: string;
  gradient: string;
  border: string;
  smallIcon?: string;
  actionClr: string;
};

const ADMIN_CARDS: AdminCard[] = [
  {
    id: 1,
    title: "Manage Buildings",
    desc: "Add or edit building details and units",
    action: "Configure →",
    icon: Building,
    smallIcon: Build,
    gradient: "from-[#2B7FFF33] to-[#00B8DB33]",
    border: "border-[#51A2FF4D]",
    actionClr: "#51A2FF",
  },
  {
    id: 2,
    title: "Manage Users",
    desc: "Control user access and roles",
    action: "Manage →",
    icon: Admin,
    smallIcon: User,
    gradient: "from-[#AD46FF33] to-[#F6339A33]",
    border: "border-[#C27AFF4D]",
    actionClr: "#C27AFF",
  },
  {
    id: 3,
    title: "View Reports",
    desc: "Access analytics and insights",
    action: "Analyze →",
    icon: Graph,
    smallIcon: Stock,
    gradient: "from-[#FF690033] to-[#FB2C3633]",
    border: "border-[#FF89044D]",
    actionClr: "#FF8904",
  },
];

const AdminCards: React.FC = () => {
  return (
    <div className="mb-8">

      <div className="grid md:grid-cols-3 gap-6">

        {ADMIN_CARDS.map((card) => (
          <div key={card.id}
            className={`relative p-6 rounded-2xl border ${card.border}
            bg-linear-to-br ${card.gradient}
            hover:scale-105 transition cursor-pointer`}>
            <div className="flex justify-between items-start mb-6">
                <img src={card.icon} alt="" className="w-10 h-10"/>
                <img src={card.smallIcon} alt="" />
            </div>

            <h2 className={`mb-1 ${FONTSIZE[20]} ${FONTWEIGHT[700]}`}>{card.title}</h2>

            <p className={`mb-6 ${FONTSIZE[14]} ${FONTWEIGHT[400]}`} style={{color: COLORS.secoundy_gray}}>{card.desc}</p>

            <button className={`${FONTSIZE[14]} ${FONTWEIGHT[700]}`} style={{color: card.actionClr}}>
              {card.action}
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminCards;
