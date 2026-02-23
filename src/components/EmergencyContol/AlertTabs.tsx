import React from "react";
import download from "../../assets/emergency/download.png" 
import { toast } from "react-toastify";
interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  total: number;
  active: number;
  resolved: number;
}

const AlertTabs: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  total,
  active,
  resolved,
}) => {
  const tabs = [
    { label: `All Alerts (${total})`, value: "All" },
    { label: `Active (${active})`, value: "Active" },
    { label: `Resolved (${resolved})`, value: "Resolved" },
  ];

  const getActiveStyle = (value: string) => {
    if (value === "All")
      return "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30";
    if (value === "Active")
      return "bg-red-500 text-white shadow-lg shadow-red-500/30";
    if (value === "Resolved")
      return "bg-green-500 text-white shadow-lg shadow-green-500/30";
  };

  return (
  <div
    className="
      mt-6 
      bg-[#FFFFFF0D]
      p-4 sm:p-5
      rounded-2xl 
      border border-white/10
      flex flex-col lg:flex-row
      gap-4
      lg:justify-between 
      lg:items-center
    "
  >
    {/* Tabs */}
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`
            px-3 sm:px-5 
            py-1.5 sm:py-2
            rounded-full
            text-xs sm:text-sm md:text-base
            transition-all duration-300
            ${
              activeTab === tab.value
                ? getActiveStyle(tab.value)
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }
          `}
          style={{ fontWeight: 600 }}
        >
          {tab.label}
        </button>
      ))}
    </div>

    {/* Download Button */}
    <button
  onClick={() =>
    toast.success("Report downloaded successfully ", {
      position: "top-right",
      autoClose: 2500,
      theme: "light",
    })
  }
  className="
    w-full sm:w-auto
    px-4 sm:px-5
    py-2
    rounded-xl
    text-xs sm:text-sm md:text-base
    bg-gradient-to-r from-blue-500 to-cyan-500
    hover:opacity-90
    transition
    flex items-center justify-center gap-2
  "
  style={{ fontWeight: 600 }}
>
  <img
    src={download}
    alt="Download"
    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
  />
  Download Report
</button>
  </div>
);
};

export default AlertTabs;