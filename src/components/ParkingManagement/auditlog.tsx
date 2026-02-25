import clock from "../../assets/parking/auditt.png";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";
import assignedIcon from "../../assets/parking/audittick.png";
import reassignedIcon from "../../assets/parking/auditround.png";
import { X } from "lucide-react";

type AuditLogModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type LogItem = {
  id: number;
  type: "assigned" | "reassigned";
  slot: string;
  description: string;
  admin: string;
  date: string;
};

const logs: LogItem[] = [
  {
    id: 1,
    type: "assigned",
    slot: "B1-M-025",
    description: "Assigned to Emily Rodriguez (C-108) for Yamaha R15 V4",
    admin: "Admin - John Anderson",
    date: "02/21/2026 14:07:48",
  },
  {
    id: 2,
    type: "assigned",
    slot: "B2-A-104",
    description: "Assigned to Sarah Johnson (A-304) for Honda Civic 2023",
    admin: "Admin - John Anderson",
    date: "2026-02-15 14:30:22",
  },
  {
    id: 3,
    type: "reassigned",
    slot: "B1-M-030",
    description: "Reassigned from Jane Smith to John Doe (A-101)",
    admin: "Admin - Sarah Miller",
    date: "2026-02-10 11:15:45",
  },
];

export default function AuditLogModal({ isOpen, onClose }: AuditLogModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000CC] px-3 sm:px-4">
      <div className=" bg-linear-to-br from-[#0F172B] to-[#101828] border border-white/20 shadow-2xl rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <div className="flex flex-col items-center mb-5 sm:mb-6 text-center">
          <div
            className=" w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#00B8DB33] to-[#2B7FFF33] border border-[#00D3F34D] flex items-center justify-center mb-3
            "
          >
            <img src={clock} alt="icon" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X size={18} className="text-gray-300" />
          </button>

          <h2
            className={`text-xl sm:text-2xl font-bold ${FONTSIZE[30]}`}
            style={{ fontWeight: WEIGHT.seven, color: COLORS.primary_white }}
          >
            Audit Log
          </h2>

          <p
            className={`text-xs sm:text-sm ${FONTSIZE[16]}`}
            style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
          >
            History of all parking slot changes
          </p>
        </div>

        <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto pr-1 sm:pr-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className=" rounded-xl p-3 sm:p-4 bg-[#FFFFFF0D] border border-[#FFFFFF1A] flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4
              "
            >
              <div className="flex gap-3">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center
                  ${
                    log.type === "assigned"
                      ? "bg-[#00C95033]"
                      : "bg-[#FF690033]"
                  }`}
                >
                  <img
                    src={
                      log.type === "assigned" ? assignedIcon : reassignedIcon
                    }
                    alt="status icon"
                    className="w-5 h-5 object-contain"
                  />
                </div>

                <div>
                  <h4
                    className={`text-white font-semibold ${FONTSIZE[16]}`}
                    style={{
                      fontWeight: WEIGHT.seven,
                      color: COLORS.primary_white,
                    }}
                  >
                    {log.type === "assigned"
                      ? "Slot Assigned"
                      : "Slot Reassigned"}
                  </h4>

                  <p
                    className={`text-sm ${FONTSIZE[14]}`}
                    style={{
                      fontWeight: WEIGHT.four,
                      color: COLORS.grey,
                    }}
                  >
                    {log.slot}
                  </p>

                  <p
                    className={`text-sm mt-1 ${FONTSIZE[14]}`}
                    style={{
                      fontWeight: WEIGHT.four,
                      color: COLORS.smalltext,
                    }}
                  >
                    {log.description}
                  </p>

                  <p
                    className={`text-xs mt-1 text-[#00D3F3] ${FONTSIZE[12]}`}
                    style={{ fontWeight: WEIGHT.four }}
                  >
                    By: {log.admin}
                  </p>
                </div>
              </div>

              <div
                className="text-xs text-[#6A7282] sm:text-right"
                style={{ fontWeight: WEIGHT.four }}
              >
                {log.date}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 sm:mt-6">
          <button
            onClick={onClose}
            className={`w-full h-11 sm:h-12 rounded-xl bg-[#FFFFFF0D] border border-[#FFFFFF33] hover:bg-white/10 transition cursor-pointer ${FONTSIZE[16]}`}
            style={{
              fontWeight: WEIGHT.seven,
              color: COLORS.primary_white,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
