import React from "react";
import {
  FONTSIZE,
  FONTWEIGHT,
  COLORS,
} from "../../constent/uiconstent";

interface Props {
  totalCount: number;
  moveInCount: number;
  moveOutCount: number;
  accessCount: number;
}

const StatsSection: React.FC<Props> = ({
  totalCount,
  moveInCount,
  moveOutCount,
  accessCount,
}) => {
  const cards = [
    {
      title: "Total Forms",
      count: totalCount,
      bg: "bg-[#2B7FFF33]",
      border: "border-[#51A2FF4D]",
    },
    {
      title: "Move In",
      count: moveInCount,
      bg: "bg-[#AD46FF33]",
      border: "border-[#C27AFF4D]",
    },
    {
      title: "Move Out",
      count: moveOutCount,
      bg: "bg-[#00C95033]",
      border: "border-[#05DF724D]",
    },
    {
      title: "Access Request",
      count: accessCount,
      bg: "bg-[#FF690033]",
      border: "border-[#FF89044D]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`p-6 rounded-xl border shadow-lg flex flex-col items-start ${card.bg} ${card.border}`}
        >
          {/* COUNT */}
          <h2
            className={FONTSIZE[36]}
            style={{
              ...FONTWEIGHT[700],
              color: COLORS.primary_white,
            }}
          >
            {card.count}
          </h2>

          {/* TITLE */}
          <p
            className={`${FONTSIZE[14]} mt-2`}
            style={{
              ...FONTWEIGHT[400],
              color: COLORS.cardsubhead,
            }}
          >
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;