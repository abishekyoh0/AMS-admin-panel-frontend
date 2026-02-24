import React from "react";
import type { Emergency } from "../../pages/EmergencyControl/EmergencyControl";

interface Props {
  emergency: Emergency;
  onClose: () => void;
  setEmergencies: React.Dispatch<React.SetStateAction<Emergency[]>>;
}

const EmergencyModal: React.FC<Props> = ({
  emergency,
  onClose,
  setEmergencies,
}) => {

  const percentage = Math.round(
    (emergency.acknowledged / emergency.total) * 100
  );

  const handleResolve = () => {
    setEmergencies((prev) =>
      prev.map((item) =>
        item.id === emergency.id
          ? { ...item, status: "Resolved" }
          : item
      )
    );

    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md 
                flex justify-center items-center z-50 p-4">

  <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] 
                  w-full max-w-lg 
                  max-h-[90vh]  overflow-y-auto
                  rounded-2xl p-6
                  border border-white/10 
                  shadow-2xl relative">

    {/* Close Button */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-400 
                 hover:text-white text-xl"
    >
      ✕
    </button>

    {/* Your existing modal content here */}

 

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center 
                          rounded-lg bg-red-500/20 border border-red-500/30">
            🔥
          </div>

          <div>
            <h2 className="text-xl font-bold">{emergency.type}</h2>
            <p className="text-xs text-gray-400">
              Alert ID: #{emergency.alertId}
            </p>
          </div>
        </div>

        {/* Top Info Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">

          {/* Priority */}
          <div className="bg-white/5 p-3 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Priority</p>
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium
                ${
                  emergency.priority === "High"
                    ? "bg-red-500/20 text-red-400"
                    : emergency.priority === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
            >
              {emergency.priority}
            </span>
          </div>

          {/* Status */}
          <div className="bg-white/5 p-3 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Status</p>
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium
                ${
                  emergency.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
            >
              {emergency.status}
            </span>
          </div>

          {/* Raised By */}
          <div className="bg-white/5 p-3 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Raised By</p>
            <p className="text-sm font-medium">
              {emergency.raisedBy}
            </p>
          </div>

        </div>

        {/* Location */}
        <div className="bg-white/5 p-4 rounded-lg mb-4">
          <p className="text-xs text-gray-400 mb-1">Location</p>
          <p className="font-medium text-cyan-400">
            {emergency.location}
          </p>
        </div>

        {/* Time & Date */}
        <div className="bg-white/5 p-4 rounded-lg mb-4">
          <p className="text-xs text-gray-400 mb-1">Time & Date</p>
          <p className="font-medium">
            {emergency.time} • 2026-01-28
          </p>
        </div>

        {/* Sent To */}
        <div className="bg-white/5 p-4 rounded-lg mb-4">
          <p className="text-xs text-gray-400 mb-1">Sent To</p>
          <p className="font-medium">All Residents</p>
        </div>

        {/* Alert Message */}
        <div className="bg-white/10 p-4 rounded-lg mb-5">
          <p className="text-xs text-gray-400 mb-2">
            Alert Message:
          </p>
          <p className="text-sm text-gray-200">
            {emergency.message}
          </p>
        </div>

        {/* Response Rate */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Response Rate</span>
            <span className="text-gray-300">
              {emergency.acknowledged}/{emergency.total}
            </span>
          </div>

          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 
                         h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            {percentage}% of residents acknowledged this alert
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
        <button
  onClick={handleResolve}
  className="flex-1 py-2 rounded-xl font-medium
             bg-gradient-to-r from-green-500 to-emerald-600
             hover:opacity-90 transition cursor-pointer"
>
  ✅ Mark as Resolved
</button>

          <button
            className="flex-1 py-2 rounded-xl font-medium
                       bg-gradient-to-r from-blue-500 to-cyan-500
                       hover:opacity-90 transition cursor-pointer"
          >
            📄 Download Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmergencyModal;