import type { Entry } from "../../pages/EntryReports/ResidentEntryReports";
import { FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import graph from "../../assets/resident/graph.png";
import mark from "../../assets/resident/mark.png";

interface Props {
  data: Entry[];
}

const AnalyticsSection: React.FC<Props> = ({ data }) => {

  /* ---------------- PEAK ENTRY TIME CALCULATION ---------------- */

  const timeRanges = [
    { label: "06:00 AM - 10:00 AM", start: 6, end: 10 },
    { label: "10:00 AM - 02:00 PM", start: 10, end: 14 },
    { label: "02:00 PM - 06:00 PM", start: 14, end: 18 },
    { label: "06:00 PM - 10:00 PM", start: 18, end: 22 },
  ];

  const peakCounts = timeRanges.map((range) => {
    const count = data.filter((entry) => {
      const time = entry.entryTime;
      if (!time) return false;

      const [hourStr, minutePart] = time.split(":");
      let hour = parseInt(hourStr);
      const isPM = minutePart.includes("PM");

      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;

      return hour >= range.start && hour < range.end;
    }).length;

    return { label: range.label, count };
  });

  const maxPeak = Math.max(...peakCounts.map((p) => p.count), 1);

  /* ---------------- GATE USAGE ---------------- */

  const gateCount: Record<string, number> = {};
  data.forEach((entry) => {
    gateCount[entry.gate] = (gateCount[entry.gate] || 0) + 1;
  });

  const totalGateEntries = data.length || 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ---------------- PEAK ENTRY TIMES ---------------- */}
      <div className="bg-[#FFFFFF0D] border border-[#2f3246] rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <img src={graph} alt="Graph" className="w-5 h-5" />
          <h3
            style={{ ...FONTWEIGHT[600] }}
            className={`${FONTSIZE[16]} text-white`}
          >
            Peak Entry Times
          </h3>
        </div>

        {peakCounts.map((slot, index) => (
          <div key={index} className="mb-4">

            <div className="flex justify-between mb-1">

              <span
                style={{ ...FONTWEIGHT[400] }}
                className={`${FONTSIZE[12]} text-[#99A1AF]`}
              >
                {slot.label}
              </span>

              <span
                style={{ ...FONTWEIGHT[500] }}
                className={`${FONTSIZE[12]} text-white`}
              >
                {slot.count} entries
              </span>

            </div>

            <div className="w-full bg-[#2a2e44] h-2 rounded-full">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#00B8DB] to-[#155DFC] transition-all"
                style={{
                  width: `${(slot.count / maxPeak) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- GATE USAGE ---------------- */}
      <div className="bg-[#FFFFFF0D] border border-[#2f3246] rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <img src={mark} alt="Gate" className="w-5 h-5" />
          <h3
            style={{ ...FONTWEIGHT[600] }}
            className={`${FONTSIZE[16]} text-white`}
          >
            Gate Usage
          </h3>
        </div>

        {Object.entries(gateCount).map(([gate, count]) => {
          const percent = Math.round(
            (count / totalGateEntries) * 100
          );

          return (
            <div key={gate} className="mb-4">

              <div className="flex justify-between mb-1">

                <span
                  style={{ ...FONTWEIGHT[400] }}
                  className={`${FONTSIZE[12]} text-[#99A1AF]`}
                >
                  {gate}
                </span>

                <span
                  style={{ ...FONTWEIGHT[500] }}
                  className={`${FONTSIZE[12]} text-white`}
                >
                  {count} uses ({percent}%)
                </span>

              </div>

              <div className="w-full bg-[#2a2e44] h-2 rounded-full">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#00C950] to-[#009966] transition-all"
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AnalyticsSection;
