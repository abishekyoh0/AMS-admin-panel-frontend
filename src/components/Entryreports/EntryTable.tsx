import type { Entry } from "../../pages/EntryReports/entryreports";
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

        const convertToMinutes = (time: string) => {
            const [timePart, period] = time.split(" ");
            let [hours, minutes] = timePart.split(":").map(Number);

            if (period === "PM" && hours !== 12) hours += 12;
            if (period === "AM" && hours === 12) hours = 0;

            return hours * 60 + minutes;
        };

        let entryMinutes = convertToMinutes(entryTime);
        let exitMinutes = convertToMinutes(exitTime);

        if (exitMinutes < entryMinutes) {
            exitMinutes += 24 * 60;
        }

        const diff = exitMinutes - entryMinutes;

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        if (hours === 0) return `${minutes}m`;
        if (minutes === 0) return `${hours}h`;

        return `${hours}h ${minutes}m`;
    };


    return (
        <div className="bg-[#FFFFFF0D] border border-gray-700 rounded-2xl mb-6">

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

            <div className="w-full overflow-x-auto">
                <div className="min-w-275">

                    <table className="w-full text-left">

                        <thead className="bg-[#FFFFFF0D] text-[#99A1AF]">
                            <tr>
                                {[
                                    "RESIDENT",
                                    "FLAT",
                                    "DATE",
                                    "ENTRY TIME",
                                    "EXIT TIME",
                                    "DURATION",
                                    "GATE",
                                    "GUARD",
                                    "STATUS",
                                ]
                                    .map((head) => (
                                        <th
                                            key={head}
                                            style={{ ...FONTWEIGHT[500] }}
                                            className={`${FONTSIZE[12]} px-6 py-3 whitespace-nowrap`}
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
                                    <td className="px-6 py-4 whitespace-nowrap">
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

                                    <td
                                        style={{ ...FONTWEIGHT[500] }}
                                        className={`${FONTSIZE[14]} px-4 py-4 text-[#00D3F3] whitespace-nowrap`}
                                    >
                                        {entry.flat}
                                    </td>

                                    <td
                                        style={{ ...FONTWEIGHT[400] }}
                                        className={`${FONTSIZE[14]} px-4 py-4 text-white whitespace-nowrap`}
                                    >
                                        {entry.date}
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div
                                            style={{ ...FONTWEIGHT[400] }}
                                            className={`${FONTSIZE[14]} flex items-center gap-2 text-white`}
                                        >
                                            <img src={green} alt="Entry" className="w-4 h-4" />
                                            {entry.entryTime}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
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

                                    <td
                                        style={{ ...FONTWEIGHT[500] }}
                                        className={`${FONTSIZE[14]} px-4 py-4 text-[#00D3F3] whitespace-nowrap`}
                                    >
                                        {calculateDuration(entry.entryTime, entry.exitTime)}
                                    </td>

                                    <td
                                        style={{ ...FONTWEIGHT[400] }}
                                        className={`${FONTSIZE[14]} px-4 py-4 text-[#D1D5DC] whitespace-nowrap`}
                                    >
                                        {entry.gate}
                                    </td>

                                    <td
                                        style={{ ...FONTWEIGHT[400] }}
                                        className={`${FONTSIZE[14]} px-4 py-4 text-[#99A1AF] whitespace-nowrap`}
                                    >
                                        {entry.guard}
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div
                                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${entry.status === "Inside"
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
                                                className={`${FONTSIZE[12]} ${entry.status === "Inside"
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
        </div>
    );
};

export default EntryTable;
