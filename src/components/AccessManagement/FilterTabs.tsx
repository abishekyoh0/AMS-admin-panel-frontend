import React from "react";
import {
  FONTSIZE,
  FONTWEIGHT,
  COLORS,
} from "../../constent/uiconstent";

interface Props<T extends string> {
  activeTab: T;
  setActiveTab: React.Dispatch<React.SetStateAction<T>>;
  tabs: T[];
}

function FilterTabs<T extends string>({
  activeTab,
  setActiveTab,
  tabs,
}: Props<T>) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 sm:gap-3 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-3 sm:px-4 lg:px-5
                h-8 sm:h-9 lg:h-10
                rounded-full
                whitespace-nowrap
                transition-all duration-300 cursor-pointer
                ${FONTSIZE[14]}
              `}
              style={{
                ...FONTWEIGHT[500],
                backgroundColor: isActive
                  ? "#00B8DB"
                  : "#FFFFFF0D",
                border: isActive
                  ? "none"
                  : "1px solid #4B5563",
                color: isActive
                  ? COLORS.primary_white
                  : COLORS.secoundy_gray,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FilterTabs;