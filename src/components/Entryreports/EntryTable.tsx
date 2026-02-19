import type { Entry } from "../../pages/EntryReports/ResidentEntryReports";
import { FONTSIZE, FONTWEIGHT } from "../../constent/uiconstent";
import notes from "../../assets/resident/notes.png";
import green from "../../assets/resident/green.png";
import orange from "../../assets/resident/orange.png";
import white from "../../assets/resident/White.png";

interface Props {
  data: Entry[];
}

const EntryTable: React.FC<Props> = ({ data }) => {

  const calculateDuration = (entryTime: string, exitTime: string) => {
    if (!entryTime || !exitTime || exitTime === "—") return "—";

    const convertTo24Hour = (time: string) => {
      const [hourStr, minutePart] = time.split(":");
      let hour = parseInt(hourStr);
      const minutes = parseInt(minutePart.split(" ")[0]);
      const isPM = minutePart.includes("PM");

      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;

      return hour * 60 + minutes;
    };

    const diffMinutes =
      convertTo24Hour(exitTime) - convertTo24Hour(entryTime);

    if (diffMinutes <= 0) return "—";

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-[#FFFFFF0D] border border-gray-700 rounded-2xl mb-6 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h2
          style={{ ...FONTWEIGHT[600] }}
          className={`${FONTSIZE[18]} flex items-center gap-2 text-white`}
        >
          <img src={notes} alt="Notes" className="w-5 h-5" />
          Entry & Exit Activity Log
        </h2>

        <p
          style={{ ...FONTWEIGHT[400] }}
          className={`${FONTSIZE[12]} text-[#99A1AF] mt-1`}
        >
          Real-time tracking of resident movements
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-[#FFFFFF0D] text-[#99A1AF]">
            <tr>
              {[
                "Resident",
                "Flat",
                "Date",
                "Entry Time",
                "Exit Time",
                "Duration",
                "Gate",
                "Guard",
                "Status",
              ].map((head) => (
                <th
                  key={head}
                  style={{ ...FONTWEIGHT[500] }}
                  className={`${FONTSIZE[12]} px-6 py-3 text-left`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-gray-800 hover:bg-[#1a2433] transition"
              >
                {/* Resident */}
                <td className="px-6 py-4">
                  <div
                    style={{ ...FONTWEIGHT[500] }}
                    className={`${FONTSIZE[14]} text-white`}
                  >
                    {entry.name}
                  </div>

                  <div
                    style={{ ...FONTWEIGHT[400] }}
                    className={`${FONTSIZE[12]} text-[#99A1AF]`}
                  >
                    ID: {entry.residentId}
                  </div>
                </td>

                {/* Flat */}
                <td
                  style={{ ...FONTWEIGHT[500] }}
                  className={`${FONTSIZE[14]} px-4 py-4 text-[#00D3F3]`}
                >
                  {entry.flat}
                </td>

                {/* Date */}
                <td
                  style={{ ...FONTWEIGHT[400] }}
                  className={`${FONTSIZE[14]} px-4 py-4 text-white`}
                >
                  {entry.date}
                </td>

                {/* Entry */}
                <td className="px-4 py-4">
                  <div
                    style={{ ...FONTWEIGHT[400] }}
                    className={`${FONTSIZE[14]} flex items-center gap-2 text-white`}
                  >
                    <img src={green} alt="Entry" className="w-4 h-4" />
                    {entry.entryTime}
                  </div>
                </td>

                {/* Exit */}
                <td className="px-4 py-4">
                  {entry.exitTime !== "—" ? (
                    <div
                      style={{ ...FONTWEIGHT[400] }}
                      className={`${FONTSIZE[14]} flex items-center gap-2 text-white`}
                    >
                      <img src={orange} alt="Exit" className="w-4 h-4" />
                      {entry.exitTime}
                    </div>
                  ) : (
                    <span
                      style={{ ...FONTWEIGHT[400] }}
                      className={`${FONTSIZE[14]} text-gray-500`}
                    >
                      —
                    </span>
                  )}
                </td>

                {/* Duration */}
                <td
                  style={{ ...FONTWEIGHT[500] }}
                  className={`${FONTSIZE[14]} px-4 py-4 text-[#00D3F3]`}
                >
                  {calculateDuration(entry.entryTime, entry.exitTime)}
                </td>

                {/* Gate */}
                <td
                  style={{ ...FONTWEIGHT[400] }}
                  className={`${FONTSIZE[14]} px-4 py-4 text-[#D1D5DC]`}
                >
                  {entry.gate}
                </td>

                {/* Guard */}
                <td
                  style={{ ...FONTWEIGHT[400] }}
                  className={`${FONTSIZE[14]} px-4 py-4 text-[#99A1AF]`}
                >
                  {entry.guard}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2 py-0.75 rounded-full border ${
                      entry.status === "Inside"
                        ? "bg-[#00C95033] border-[#05DF724D]"
                        : "bg-[#6A728233] border-[#99A1AF4D]" 
                    }`}
                  >  
                  
                    <img
                      src={entry.status === "Inside" ? green : white}
                      alt={entry.status}
                      className="w-3.5 h-3.5"
                    />

                    <span
                      style={{ ...FONTWEIGHT[500] }}
                      className={`${FONTSIZE[12]} ${
                        entry.status === "Inside"
                          ? "text-[#05DF72]"
                          : "text-[#99A1AF]"
                      }`}
                    >
                      {entry.status}
                    </span>
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

export default EntryTable;
