import React from "react";

type AdminCard = {
  id: number;
  title: string;
  desc: string;
  action: string;
  icon: string;
  gradient: string;
  border: string;
};

const ADMIN_CARDS: AdminCard[] = [
  {
    id: 1,
    title: "Manage Buildings",
    desc: "Add or edit building details and units",
    action: "Configure →",
    icon: "🏢",
    gradient: "from-blue-900/40 to-cyan-700/30",
    border: "border-cyan-500/30",
  },
  {
    id: 2,
    title: "Manage Users",
    desc: "Control user access and roles",
    action: "Manage →",
    icon: "👥",
    gradient: "from-purple-900/40 to-fuchsia-700/30",
    border: "border-purple-500/30",
  },
  {
    id: 3,
    title: "View Reports",
    desc: "Access analytics and insights",
    action: "Analyze →",
    icon: "📊",
    gradient: "from-orange-900/40 to-red-700/30",
    border: "border-orange-500/30",
  },
];

const AdminCards: React.FC = () => {
  return (
    <div className="text-white mb-8">

      <div className="grid md:grid-cols-3 gap-6">

        {ADMIN_CARDS.map((card) => (
          <div
            key={card.id}
            className={`relative p-6 rounded-2xl border ${card.border}
            bg-linear-to-br ${card.gradient}
            hover:scale-105 transition cursor-pointer`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="text-3xl">{card.icon}</div>
              <div className="text-gray-400 text-xl">↗</div>
            </div>

            <h2 className="text-lg font-bold mb-2">{card.title}</h2>

            <p className="text-gray-400 text-sm mb-6">{card.desc}</p>

            <button className="text-sm text-cyan-400 font-semibold">
              {card.action}
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminCards;
