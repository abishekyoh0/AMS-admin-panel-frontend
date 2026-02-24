import React from "react";

interface Props {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
}

const StatCard: React.FC<Props> = ({ title, value, gradient, icon }) => {
  return (
    <div
      className={`p-4 sm:p-5 md:p-6 rounded-xl ${gradient} border border-white/10`}
    >
      {/* Icon */}
      <div className="text-lg sm:text-xl md:text-2xl">
        {icon}
      </div>

      {/* Value */}
      <h3
        className="mt-2 text-lg sm:text-2xl md:text-3xl"
        style={{ fontWeight: 700 }}   
      >
        {value}
      </h3>

      {/* Title */}
      <p
        className="text-xs sm:text-sm md:text-base text-gray-300"
        style={{ fontWeight: 500 }}   
      >
        {title}
      </p>
    </div>
  );
};

export default StatCard;