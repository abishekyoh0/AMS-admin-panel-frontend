import React from "react";
import { Search } from "lucide-react";
import residents from "../../assets/access/residents.png";
import graph from "../../assets/access/graph.png";

import {
  FONTSIZE,
  FONTWEIGHT,
  COLORS,
} from "../../constent/uiconstent";

interface Props {
  activeType: "moveIn" | "moveOut" | "access";
  setActiveType: (type: "moveIn" | "moveOut" | "access") => void;
}

const ActionBar: React.FC<Props> = ({
  activeType,
  setActiveType,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">

      {/* 🔍 Search Input */}
      <div className="relative w-full lg:w-120 xl:w-140">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: COLORS.secoundy_gray }}
        />

        <input
          type="text"
          placeholder="Search requests..."
          className={`
            w-full
            h-10 sm:h-11
            pl-10 sm:pl-11 pr-4
            rounded-full
            border
            focus:outline-none
            focus:ring-2
            transition cursor-pointer
            ${FONTSIZE[14]}
          `}
          style={{
            ...FONTWEIGHT[400],
            backgroundColor: "#FFFFFF0D",
            borderColor: "#FFFFFF33",
            color: COLORS.primary_white,
          }}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto justify-start lg:justify-end">

        {/* Move In */}
        <button
          onClick={() => setActiveType("moveIn")}
          className={`
            h-9 sm:h-10 lg:h-11
            px-4 sm:px-6 lg:px-8
            rounded-full
            flex items-center gap-2
            transition-all duration-300 cursor-pointer
            ${FONTSIZE[14]}
          `}
          style={{
            ...FONTWEIGHT[500],
            background:
              activeType === "moveIn"
                ? "linear-gradient(to right, #AD46FF, #E60076)"
                : "#FFFFFF1A",
            border:
              activeType === "moveIn"
                ? "none"
                : "1px solid #FFFFFF33",
            color: COLORS.primary_white,
          }}
        >
          <img src={residents} alt="movein" className="w-4 h-4 mb-1" />
          Move In
        </button>

        {/* Move Out */}
        <button
          onClick={() => setActiveType("moveOut")}
          className={`
            h-9 sm:h-10 lg:h-11
            px-4 sm:px-6 lg:px-8
            rounded-full
            flex items-center gap-2
            transition-all duration-300 cursor-pointer
            ${FONTSIZE[14]}
          `}
          style={{
            ...FONTWEIGHT[500],
            background:
              activeType === "moveOut"
                ? "linear-gradient(to right, #AD46FF, #E60076)"
                : "#FFFFFF1A",
            border:
              activeType === "moveOut"
                ? "none"
                : "1px solid #FFFFFF33",
            color: COLORS.primary_white,
          }}
        >
          <img src={graph} alt="moveout" className="w-4 h-4 mb-1" />
          Move Out
        </button>

        {/* Access Request */}
        <button
          onClick={() => setActiveType("access")}
          className={`
            h-9 sm:h-10 lg:h-11
            px-4 sm:px-6 lg:px-8
            rounded-full
            flex items-center gap-2
            transition-all duration-300
            ${FONTSIZE[14]}
          `}
          style={{
            ...FONTWEIGHT[500],
            background:
              activeType === "access"
                ? "linear-gradient(to right, #AD46FF, #E60076)"
                : "#FFFFFF1A",
            border:
              activeType === "access"
                ? "none"
                : "1px solid #FFFFFF33",
            color: COLORS.primary_white,
          }}
        >
          <img src={graph} alt="access" className="w-4 h-4 mb-1" />
          Access Request
        </button>
      </div>
    </div>
  );
};

export default ActionBar;