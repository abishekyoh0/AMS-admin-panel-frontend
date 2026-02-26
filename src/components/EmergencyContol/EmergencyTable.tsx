import React from "react";
import type { Emergency } from "../../pages/EmergencyControl/EmergencyControl";
import { toast } from "react-toastify";

import alarm from "../../assets/emergency/alarm.png";
import fire from "../../assets/emergency/fire.png";
import van from "../../assets/emergency/van.png";
import plug from "../../assets/emergency/plug.png";
import water from "../../assets/emergency/water.png";

import { FONTWEIGHT } from "../../constent/uiconstent";
// import { $styles } from "../../styles/fontSizes";
import { FONTSIZE } from "../../constent/uiconstent";
interface Props {
  data: Emergency[];
  onView: (item: Emergency) => void;
  setEmergencies: React.Dispatch<React.SetStateAction<Emergency[]>>;
}

const EmergencyTable: React.FC<Props> = ({ data, onView, setEmergencies }) => {
  const handleClose = (id: number) => {
    setEmergencies((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Resolved",
              acknowledged: item.total,
            }
          : item,
      ),
    );

    toast.success("Emergency marked as Resolved ✅");
  };

  const getEmergencyIcon = (type: string) => {
    if (type.toLowerCase().includes("fire")) return fire;
    if (type.toLowerCase().includes("medical")) return van;
    if (type.toLowerCase().includes("power")) return plug;
    if (type.toLowerCase().includes("water")) return water;
    return fire;
  };

  return (
    <div className="mt-6 bg-[#FFFFFF0D] rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src={alarm} alt="Alarm" className="w-6 h-6 object-contain" />

          <h3
            style={{ ...FONTWEIGHT[700] }}
            className={`text-white ${FONTSIZE[20]}`}
          >
            Emergency Alert Management
          </h3>
        </div>

        <p
          style={{ ...FONTWEIGHT[400] }}
          className={`text-gray-400 mt-1 ${FONTSIZE[14]}`}
        >
          Complete overview of all emergency situations
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          {/* Table Head */}
          <thead className="bg-white/5">
            <tr
              style={{ ...FONTWEIGHT[600] }}
              className={`text-gray-400 uppercase tracking-wider ${FONTSIZE[14]}`}
            >
              <th className="text-left px-6 py-3">Alert Type</th>
              <th className="text-left px-4 py-3">Priority</th>
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-left px-4 py-3">Raised By</th>
              <th className="text-left px-4 py-3">Time</th>
              <th className="text-left px-4 py-3">Acknowledged</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3 min-w-[150px]">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-200">
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                {/* Alert Type */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={getEmergencyIcon(item.type)}
                      alt="Emergency"
                      className="w-6 h-6 object-contain"
                    />

                    <div>
                      <p
                        style={{ ...FONTWEIGHT[600] }}
                        className={`truncate text-white ${FONTSIZE[16]}`}
                      >
                        {item.type}
                      </p>

                      <p
                        style={{ ...FONTWEIGHT[400] }}
                        className={`text-gray-400 ${FONTSIZE[12]}`}
                      >
                        #{item.alertId}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Priority */}
                <td className="px-4 py-4">
                  <span
                    style={{ ...FONTWEIGHT[600] }}
                    className={`px-3 py-1 rounded-full ${FONTSIZE[14]} ${
                      item.priority === "High"
                        ? "bg-red-500/20 text-red-400"
                        : item.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>

                {/* Location */}
                <td
                  style={{ ...FONTWEIGHT[500] }}
                  className={`px-4 py-4 text-cyan-400 ${FONTSIZE[16]}`}
                >
                  {item.location}
                </td>

                {/* Raised By */}
                <td
                  style={{ ...FONTWEIGHT[500] }}
                  className={`px-4 py-4 text-white ${FONTSIZE[14]}`}
                >
                  {item.raisedBy}
                </td>

                {/* Time */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <p
                      style={{ ...FONTWEIGHT[500] }}
                      className={`${FONTSIZE[16]} text-white`}
                    >
                      {item.time}
                    </p>

                    <p
                      style={{ ...FONTWEIGHT[400] }}
                      className={`${FONTSIZE[12]} text-gray-400 mt-1`}
                    >
                      2026-01-28
                    </p>
                  </div>
                </td>

                {/* Acknowledged */}
                <td className="px-4 py-4">
                  <p
                    style={{ ...FONTWEIGHT[600] }}
                    className={`${FONTSIZE[16]} text-white`}
                  >
                    {item.acknowledged}/{item.total}
                  </p>
                  <p
                    style={{ ...FONTWEIGHT[400] }}
                    className={`${FONTSIZE[12]} text-gray-400`}
                  >
                    {item.total} responses
                  </p>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    style={{ ...FONTWEIGHT[600] }}
                    className={`px-3 py-1 rounded-full ${FONTSIZE[14]} ${
                      item.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400 cursor-pointer"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {/* View Button */}
                    <button
                      onClick={() => onView(item)}
                      style={{ ...FONTWEIGHT[600] }}
                      className={`${FONTSIZE[14]} px-3 py-1 rounded-lg 
                  bg-blue-500/20 text-blue-400 
                  hover:bg-blue-500/30 transition cursor-pointer`}
                    >
                      View
                    </button>

                    {/* Close Button */}
                    {item.status === "Active" && (
                      <button
                        onClick={() => handleClose(item.id)}
                        style={{ ...FONTWEIGHT[600] }}
                        className={`${FONTSIZE[14]} px-3 py-1 rounded-lg 
                    bg-green-500/20 text-green-400 
                    hover:bg-green-500/30 transition cursor-pointer`}
                      >
                        Close
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmergencyTable;
