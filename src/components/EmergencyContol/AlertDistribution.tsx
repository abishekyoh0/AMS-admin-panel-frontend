import React from "react";

interface Props {
  data: { label: string; value: number }[];
}

const AlertDistribution: React.FC<Props> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-[#FFFFFF0D] 
                    p-6 rounded-2xl border border-white/10">

      <h3 className="mb-5 font-semibold text-lg">
        📊 Alert Distribution
      </h3>

      {data.map((item) => {
        const percentage = total
          ? (item.value / total) * 100
          : 0;

        return (
          <div key={item.label} className="mb-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">
                {item.label}
              </span>
              <span className="text-gray-400">
                {item.value}
              </span>
            </div>

            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlertDistribution;